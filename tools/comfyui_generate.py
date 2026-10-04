"""Batch-generate Campfire Chat art with a local ComfyUI (Z-Image Turbo).

Usage (from the project folder, with ComfyUI running):
  python tools/comfyui_generate.py                      # every image still missing
  python tools/comfyui_generate.py --only bg chapter    # some kinds: bg char chapter ui
  python tools/comfyui_generate.py --match L001 mia --force   # redraw matching files
  python tools/comfyui_generate.py --manifest           # only rebuild assets/manifest.json

Prompts come from prompts/manifest.json (made by node tools/export_prompts.mjs).
Needs Pillow; character sprites also need rembg to cut out the light blue / green background.
After every image, assets/manifest.json is rewritten so the game shows the new art.
"""

from __future__ import annotations

import argparse
import io
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from pathlib import Path
from typing import Callable

try:
    from PIL import Image, ImageFilter
except ImportError:
    sys.exit("需要 Pillow：pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
PROMPTS = ROOT / "prompts" / "manifest.json"
ASSETS = ROOT / "assets"
KINDS = ("bg", "char", "chapter", "ui")

# Z-Image Turbo setup. Edit these to match the model files in your ComfyUI.
UNET = "zImageTurboQuantized_fp8E4m3fn.safetensors"
CLIP = "qwen_3_4b.safetensors"
CLIP_TYPE = "lumina2"
VAE = "ae.safetensors"
SAMPLER = {"steps": 10, "cfg": 1.0, "sampler_name": "dpmpp_2m_sde", "scheduler": "sgm_uniform"}
SHIFT = 3.0
REMBG_MODEL = "u2net"
WEBP_QUALITY = 88
TIMEOUT_S = 600
POLL_S = 0.5
SAVE_NODE = "10"

Remover = Callable[[Image.Image], Image.Image]


class GenerationError(Exception):
    """One image failed; the batch moves on to the next."""


class ServerUnreachable(GenerationError):
    """ComfyUI is gone; the batch stops."""


def rebuild_manifest() -> int:
    """List every generated file so the game only requests art that exists."""
    files = sorted(p.relative_to(ROOT).as_posix() for kind in KINDS for p in (ASSETS / kind).glob("*.webp"))
    write_atomic(ASSETS / "manifest.json", (json.dumps({"files": files}, indent=2) + "\n").encode("utf-8"))
    return len(files)


def write_atomic(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_bytes(data)
    os.replace(tmp, path)


def load_items() -> list[dict]:
    if not PROMPTS.exists():
        sys.exit("找不到 prompts/manifest.json，請先執行：node tools/export_prompts.mjs")
    items = json.loads(PROMPTS.read_text(encoding="utf-8")).get("items", [])
    bad = [item.get("file", "?") for item in items if not valid_item(item)]
    if bad:
        sys.exit(f"prompts/manifest.json 有 {len(bad)} 筆格式錯誤，請重新匯出：{', '.join(bad[:5])}")
    return items


def valid_item(item: dict) -> bool:
    file = item.get("file", "")
    target = (ROOT / file).resolve()
    return (
        item.get("kind") in KINDS
        and file.startswith(f"assets/{item['kind']}/") and file.endswith(".webp")
        and target.parent == (ASSETS / item["kind"]).resolve()
        and all(isinstance(item.get(k), int) and item[k] > 0 and item[k] % 16 == 0 for k in ("width", "height"))
        and isinstance(item.get("seed"), int)
        and isinstance(item.get("prompt"), str) and item["prompt"].strip() != ""
        and isinstance(item.get("negative", ""), str)
    )


def select(items: list[dict], args: argparse.Namespace) -> list[dict]:
    chosen = [
        item for item in items
        if (not args.only or item["kind"] in args.only)
        and (not args.match or any(m.lower() in item["file"].lower() for m in args.match))
        and (args.force or not (ROOT / item["file"]).exists())
    ]
    return chosen[: args.limit] if args.limit else chosen


class ComfyClient:
    def __init__(self, base: str) -> None:
        self.base = base.rstrip("/")
        self.client_id = uuid.uuid4().hex

    def get(self, path: str, timeout: float = 30) -> bytes:
        return self._send(urllib.request.Request(self.base + path), timeout)

    def get_json(self, path: str) -> dict:
        return json.loads(self.get(path))

    def post_json(self, path: str, body: dict) -> dict:
        data = json.dumps(body).encode("utf-8")
        req = urllib.request.Request(self.base + path, data=data, headers={"Content-Type": "application/json"})
        return json.loads(self._send(req, 30))

    def _send(self, req: urllib.request.Request, timeout: float) -> bytes:
        try:
            with urllib.request.urlopen(req, timeout=timeout) as res:
                return res.read()
        except urllib.error.HTTPError as err:
            detail = err.read().decode("utf-8", "replace")[:800]
            raise GenerationError(f"ComfyUI 回應 HTTP {err.code}：{detail}") from err
        except (urllib.error.URLError, OSError) as err:
            raise ServerUnreachable(f"連不到 ComfyUI（{self.base}）：{err}") from err


def combo_options(spec: list) -> list[str]:
    # Old servers send [[options], {...}]; newer ones send ["COMBO", {"options": [...]}].
    if spec and isinstance(spec[0], list):
        return spec[0]
    if len(spec) > 1 and isinstance(spec[1], dict):
        return list(spec[1].get("options", []))
    return []


def find_models(client: ComfyClient) -> dict[str, str]:
    """Return the exact model names ComfyUI lists (they may sit in a subfolder)."""
    wanted = {"unet": ("UNETLoader", "unet_name", UNET), "clip": ("CLIPLoader", "clip_name", CLIP), "vae": ("VAELoader", "vae_name", VAE)}
    found = {}
    for key, (node, field, name) in wanted.items():
        try:
            spec = client.get_json(f"/object_info/{node}")[node]["input"]["required"][field]
        except (KeyError, TypeError, json.JSONDecodeError) as err:
            raise GenerationError(f"ComfyUI 沒有 {node} 節點，版本可能太舊") from err
        options = combo_options(spec)
        match = next((o for o in options if o.replace("\\", "/").split("/")[-1] == name), None)
        if not match:
            listed = "、".join(options[:6]) or "無"
            raise GenerationError(f"ComfyUI 找不到模型 {name}（{node}）。目前可用：{listed}。請放好模型，或修改本檔開頭的設定。")
        found[key] = match
    return found


def build_workflow(item: dict, models: dict[str, str], seed: int) -> dict:
    prefix = f"campfire/{item['kind']}/{Path(item['file']).stem}"
    return {
        "1": {"class_type": "UNETLoader", "inputs": {"unet_name": models["unet"], "weight_dtype": "default"}},
        "2": {"class_type": "CLIPLoader", "inputs": {"clip_name": models["clip"], "type": CLIP_TYPE}},
        "3": {"class_type": "VAELoader", "inputs": {"vae_name": models["vae"]}},
        "4": {"class_type": "ModelSamplingAuraFlow", "inputs": {"model": ["1", 0], "shift": SHIFT}},
        "5": {"class_type": "CLIPTextEncode", "inputs": {"text": item["prompt"], "clip": ["2", 0]}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": item.get("negative", ""), "clip": ["2", 0]}},
        "7": {"class_type": "EmptySD3LatentImage", "inputs": {"width": item["width"], "height": item["height"], "batch_size": 1}},
        "8": {"class_type": "KSampler", "inputs": {
            **SAMPLER, "seed": seed, "denoise": 1.0,
            "model": ["4", 0], "positive": ["5", 0], "negative": ["6", 0], "latent_image": ["7", 0],
        }},
        "9": {"class_type": "VAEDecode", "inputs": {"samples": ["8", 0], "vae": ["3", 0]}},
        SAVE_NODE: {"class_type": "SaveImage", "inputs": {"images": ["9", 0], "filename_prefix": prefix}},
    }


def error_message(status: dict) -> str:
    for kind, data in status.get("messages", []):
        if kind == "execution_error":
            return f"{data.get('node_type', '?')}：{data.get('exception_message', '').strip()}"
    return "未知錯誤"


def run_workflow(client: ComfyClient, workflow: dict) -> bytes:
    queued = client.post_json("/prompt", {"prompt": workflow, "client_id": client.client_id})
    prompt_id = queued.get("prompt_id")
    if not prompt_id:
        raise GenerationError(f"ComfyUI 沒有接受工作：{json.dumps(queued, ensure_ascii=False)[:800]}")
    deadline = time.monotonic() + TIMEOUT_S
    while time.monotonic() < deadline:
        entry = client.get_json(f"/history/{prompt_id}").get(prompt_id)
        if entry:
            status = entry.get("status", {})
            if status.get("status_str") == "error":
                raise GenerationError(f"ComfyUI 執行失敗，{error_message(status)}")
            images = entry.get("outputs", {}).get(SAVE_NODE, {}).get("images", [])
            if not images:
                raise GenerationError("ComfyUI 完成了工作，但沒有輸出圖片")
            image = images[0]
            query = urllib.parse.urlencode({
                "filename": image["filename"], "subfolder": image.get("subfolder", ""), "type": image.get("type", "output"),
            })
            return client.get(f"/view?{query}", timeout=60)
        time.sleep(POLL_S)
    raise GenerationError(f"等了 {TIMEOUT_S} 秒仍未完成")


def iso_residue(rgb: Image.Image, a, hue_tol: float = 18, min_sat: float = 0.12, min_val: float = 0.4,
                max_share: float = 0.15):
    """Background colour that rembg kept (gaps between hair strands, between arm and body).

    Pixels close to the border hue that touch the transparent area, plus blobs of the exact border colour anywhere.
    Removes nothing when that would take over max_share of the sprite (clothes in the background colour).
    Based on CharacterGame server/cutout.py (p5-comfyui-animation SKILL).
    """
    import numpy as np
    from scipy import ndimage

    hsv = np.asarray(rgb.convert("HSV")).astype(np.float32) / 255
    border = np.concatenate([hsv[0], hsv[-1], hsv[:, 0], hsv[:, -1]])
    bg_h, bg_s = np.median(border[:, 0]), np.median(border[:, 1])
    if bg_s < min_sat:
        return np.zeros(a.shape, bool)
    dh = np.abs(hsv[..., 0] - bg_h)
    near = (np.minimum(dh, 1 - dh) * 360 < hue_tol) & (hsv[..., 2] > min_val) & (a > 0)
    like = near & (hsv[..., 1] > min_sat)
    arr = np.asarray(rgb).astype(np.float32)
    bg_rgb = np.median(np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]]), axis=0)
    # Enclosed gaps (arm and body) show a paler backdrop than the border, so the exact colour needs only a saturation
    # relative to it.
    exact = near & (hsv[..., 1] > min(min_sat, 0.6 * bg_s)) & (np.linalg.norm(arr - bg_rgb, axis=2) < 30)
    like &= exact | ndimage.binary_dilation(ndimage.binary_opening(like, iterations=2), iterations=2)
    labels, _ = ndimage.label(like)
    touching = np.unique(labels[ndimage.binary_dilation(a < 0.05, iterations=2) & like])
    residue = np.isin(labels, touching[touching > 0])
    exact_labels, n_exact = ndimage.label(exact)
    if n_exact:
        sizes = ndimage.sum(exact, exact_labels, range(1, n_exact + 1))
        residue |= np.isin(exact_labels, np.flatnonzero(sizes >= 20) + 1)
    if residue.sum() > max_share * (a > 0.5).sum():
        return np.zeros(a.shape, bool)
    return residue


def recover_solid(rgb: Image.Image, a, min_dist: float = 40, min_share: float = 0.002, hue_tol: float = 20,
                  min_sat: float = 0.1, edge_tol: float = 10, hue_gap: float = 40, tint_sat: float = 0.05):
    """Subject areas rembg dropped or left half transparent (a grey suit on the light-blue backdrop, bare arms).

    The backdrops are gradients, so "backdrop" is: pixels near the border colour (but not a grey darker than it, a white
    shirt in shadow, nor a pale colour of a clearly different hue, a light-blue shirt on the light-green backdrop) or a
    lighter shade of its hue, plus every smooth area (no line art) reached from where rembg saw
    clear backdrop (the near-white glow in a corner). Of the rest, parts rembg kept become fully opaque; parts it
    dropped come back only as big blobs touching the subject; holes enclosed by the subject or the bottom edge, where
    the bust is cut off, are filled (white shirt on a light backdrop).
    """
    import numpy as np
    from scipy import ndimage

    arr = np.asarray(rgb).astype(np.float32)
    hsv = np.asarray(rgb.convert("HSV")).astype(np.float32) / 255
    border = np.concatenate([hsv[0], hsv[-1], hsv[:, 0], hsv[:, -1]])
    bg_rgb = np.median(np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]]), axis=0)
    bg_s, bg_v = np.median(border[:, 1]), np.median(border[:, 2])
    dh = np.abs(hsv[..., 0] - np.median(border[:, 0]))
    hue_d = np.minimum(dh, 1 - dh) * 360
    shade = (hue_d < hue_tol) & (hsv[..., 1] > min_sat) & (hsv[..., 2] > bg_v - 0.15)
    grey = (hsv[..., 1] < 0.5 * bg_s) & (hsv[..., 2] < bg_v + 0.03)
    tinted = (hue_d > hue_gap) & (hsv[..., 1] > tint_sat)
    like = ((np.linalg.norm(arr - bg_rgb, axis=2) <= min_dist) & ~grey & ~tinted) | shade
    edge = np.max([ndimage.grey_dilation(arr[..., c], size=3) - ndimage.grey_erosion(arr[..., c], size=3)
                   for c in range(3)], axis=0)
    labels, _ = ndimage.label(edge < edge_tol)
    seeds = ndimage.binary_opening(like & (a < 0.05), iterations=2) & (labels > 0)
    subject = ndimage.binary_opening(~(like | np.isin(labels, np.unique(labels[seeds]))), iterations=2)
    missed = ndimage.binary_opening(subject & (a < 0.5), iterations=2)
    labels, n = ndimage.label(missed)
    sizes = ndimage.sum(missed, labels, range(1, n + 1))
    touching = np.unique(labels[ndimage.binary_dilation(a >= 0.5, iterations=3) & missed])
    big = np.intersect1d(touching, np.flatnonzero(sizes >= min_share * a.size) + 1)
    solid = (subject & (a >= 0.5)) | ndimage.binary_closing(np.isin(labels, big), iterations=2)
    filled = ndimage.binary_fill_holes(np.vstack([solid, np.ones((1, solid.shape[1]), bool)]))[:-1]
    return solid | (filled & subject)


def cutout(rgb: Image.Image, rgba: Image.Image) -> Image.Image:
    """Clean the rembg mask: harden the alpha, recover solid areas it missed, drop stray specks, remove background
    residue, soften the edge.

    Colours come from the original image (rembg darkens them by its alpha); semi-transparent edge pixels take the
    colour of the nearest opaque pixel, so the backdrop tint does not show as a fringe.
    Keeps the full canvas (no crop), so every sprite stays 640x960 and lines up in the game.
    """
    import numpy as np
    from scipy import ndimage

    a = np.asarray(rgba.getchannel("A")).astype(np.float32) / 255
    a = np.clip((a - 0.15) / 0.7, 0, 1)
    a = np.maximum(a, recover_solid(rgb, a))
    labels, n = ndimage.label(ndimage.binary_dilation(a > 0.3, iterations=2))
    if n > 1:
        sizes = ndimage.sum(np.ones_like(a), labels, range(1, n + 1))
        a = a * np.isin(labels, [i + 1 for i, s in enumerate(sizes) if s >= 0.03 * sizes.max()])
    a = a * ~iso_residue(rgb, a)
    alpha = Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    _, (iy, ix) = ndimage.distance_transform_edt(np.asarray(alpha) < 250, return_indices=True)
    out = Image.fromarray(np.asarray(rgb)[iy, ix]).convert("RGBA")
    out.putalpha(alpha)
    return out


def make_remover(enabled: bool) -> Remover | None:
    if not enabled:
        return None
    try:
        from rembg import new_session, remove
    except ImportError:
        sys.exit('角色立繪需要 rembg 去背：pip install "rembg[cpu]"（NVIDIA 顯卡可改裝 "rembg[gpu]"），或加 --no-rembg 保留底色。')
    session = new_session(REMBG_MODEL)
    return lambda img: cutout(img, remove(img, session=session))


def to_webp(png: bytes, item: dict, remover: Remover | None) -> bytes:
    try:
        img = Image.open(io.BytesIO(png))
        img.load()
    except (OSError, ValueError) as err:
        raise GenerationError(f"ComfyUI 傳回的圖片無法解碼：{err}") from err
    img = img.convert("RGB")
    if item["kind"] == "char" and remover:
        img = remover(img).convert("RGBA")
    size = (item["width"], item["height"])
    if img.size != size:
        img = img.resize(size, Image.LANCZOS)
    out = io.BytesIO()
    img.save(out, "WEBP", quality=WEBP_QUALITY, method=6)
    return out.getvalue()


def parse_args(argv: list[str] | None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="用本機 ComfyUI（Z-Image Turbo）批次產生 Campfire Chat 的圖片。")
    parser.add_argument("--server", default="http://127.0.0.1:8000", help="ComfyUI 網址（預設 http://127.0.0.1:8000）")
    parser.add_argument("--only", nargs="+", choices=KINDS, help="只產生這些類別")
    parser.add_argument("--match", nargs="+", metavar="TEXT", help="只產生路徑含這些文字的檔案，例如 L001 mia_")
    parser.add_argument("--force", action="store_true", help="已存在的檔案也重畫")
    parser.add_argument("--limit", type=int, default=0, help="最多產生幾張（試跑用）")
    parser.add_argument("--seed-offset", type=int, default=0, help="seed 加上這個數字，不滿意時換一組構圖")
    parser.add_argument("--no-rembg", action="store_true", help="角色立繪不去背（保留淺藍或淺綠底）")
    parser.add_argument("--dry-run", action="store_true", help="只列出會產生哪些檔案")
    parser.add_argument("--manifest", action="store_true", help="只重建 assets/manifest.json")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    if args.manifest:
        print(f"assets/manifest.json 已更新：{rebuild_manifest()} 個檔案")
        return 0

    todo = select(load_items(), args)
    if not todo:
        print(f"沒有要產生的圖片（已存在的會跳過，要重畫請加 --force）。assets/manifest.json：{rebuild_manifest()} 個檔案")
        return 0
    if args.dry_run:
        for item in todo:
            print(f"{item['file']}  seed {item['seed'] + args.seed_offset}")
        print(f"共 {len(todo)} 張")
        return 0

    client = ComfyClient(args.server)
    try:
        models = find_models(client)
    except GenerationError as err:
        print(err)
        return 1
    remover = make_remover(not args.no_rembg) if any(i["kind"] == "char" for i in todo) else None

    failed: list[str] = []
    done = 0
    started = time.monotonic()
    try:
        for n, item in enumerate(todo, 1):
            label = f"[{n}/{len(todo)}] {item['file']}"
            t0 = time.monotonic()
            try:
                png = run_workflow(client, build_workflow(item, models, item["seed"] + args.seed_offset))
                write_atomic(ROOT / item["file"], to_webp(png, item, remover))
                rebuild_manifest()
                done += 1
                print(f"{label}  完成（{time.monotonic() - t0:.1f} 秒）")
            except ServerUnreachable as err:
                failed.append(item["file"])
                print(f"{label}  中止：{err}")
                break
            except GenerationError as err:
                failed.append(item["file"])
                print(f"{label}  失敗：{err}")
    except KeyboardInterrupt:
        print("\n已中斷，完成的圖片都已保存。")
    finally:
        total = rebuild_manifest()

    minutes = (time.monotonic() - started) / 60
    print(f"\n完成 {done} 張，失敗 {len(failed)} 張，耗時 {minutes:.1f} 分鐘。assets/manifest.json：{total} 個檔案")
    if failed:
        print("失敗的檔案（修正後重跑同一指令即可，已完成的會跳過）：")
        for file in failed:
            print(f"  {file}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
