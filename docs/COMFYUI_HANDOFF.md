# ComfyUI 生圖接手提示詞

用法：在另一台電腦解壓縮後，用 Claude Code 開啟專案資料夾（`Campfire Chat`），把下方「提示詞」整段貼上；或只貼一句「請讀 docs/COMFYUI_HANDOFF.md 的提示詞並照做」。

---

## 提示詞

你要接手「Campfire Chat」的美術生圖工作。這是 100 關的情境英文對話遊戲，純靜態網站（原生 JavaScript，無建置步驟），最後上架 GitHub Pages。遊戲內容、程式、生圖提示詞都已完成並通過檢查；目前 386 張圖全部是佔位圖。你的工作是用本機 ComfyUI（Z-Image Turbo）產生真正的圖、驗收品質、如實回報。所有指令都在專案根目錄執行。

### 先讀這些檔案

1. `README.md` 第 1、3、6 節：本機預覽、生圖流程、上架方式。
2. `GAPS.md`：第 1、2、3、11、12 條和這份工作直接相關。
3. `tools/comfyui_generate.py`：批次生圖腳本（約 300 行）。
4. `data/art.json`：共用畫風、尺寸、表情設定。

### 現況與已知事實

- 共 386 張 WebP：介面 2（`assets/ui/`）、章節封面 10（`assets/chapter/`）、關卡背景 100（`assets/bg/`）、角色立繪 274（`assets/char/`，70 個角色，每人 3 到 4 種表情）。
- 提示詞在 `prompts/manifest.json`，由 `node tools/export_prompts.mjs` 從 `data/art.json`、`data/cast/`、各關 `background` 欄位產生。不要手改 `prompts/manifest.json`。
- seed 由類別與 id 雜湊算出，重新匯出不會變，同一張圖可重現；想換構圖用 `--seed-offset N`。
- 同一角色的所有表情共用一個 seed，臉才會一致。所以重畫角色時要用 `--match char/<角色id>_` 連同全部表情一起重畫，不要只重畫單一表情。
- Windows 上從 Bash 執行 Python 時，中文輸出可能變亂碼，改用 `python -X utf8 tools/comfyui_generate.py ...` 即可。
- 遊戲只請求 `assets/manifest.json` 列出的圖，腳本每完成一張就自動更新它。
- 腳本只產生還不存在的檔案，中斷後重跑同一指令會接著做。
- 腳本只對模擬伺服器測過，沒在真實 ComfyUI 跑過。工作流程節點：`UNETLoader`、`CLIPLoader`（type `lumina2`）、`VAELoader`、`ModelSamplingAuraFlow`（shift 3.0）、`EmptySD3LatentImage`、`KSampler`（10 步、CFG 1.0、`dpmpp_2m_sde`、`sgm_uniform`）、`VAEDecode`、`SaveImage`。
- 模型檔名預設：UNET `zImageTurboQuantized_fp8E4m3fn.safetensors`、CLIP `qwen_3_4b.safetensors`、VAE `ae.safetensors`。腳本會向 ComfyUI 查詢實際可用的模型，找不到就列出可用名稱並停止。
- CFG 1.0 時 ComfyUI 不計算負面提示詞，所以 `data/art.json` 的 negative（含「不要文字」）實際上沒有作用。背景若出現招牌字、亂碼字，要靠正面提示詞或調高 CFG 處理（見步驟 4）。
- rembg 去背（模型 `isnet-anime`）只用替身測過，品質未知。
- `SaveImage` 會在 ComfyUI 的 `output/campfire/` 另存每張原始 PNG，全部跑完可能有數百 MB，確認成品無誤後可以刪。

### 工作規則

- 以下動作先問我，得到同意才做：安裝套件或下載模型、修改 `data/art.json` 或角色外觀、修改關卡 `background` 欄位、`git push` 或任何上傳。
- 不要從你的終端機啟動 ComfyUI，由我自己開，你只確認連得上。
- 不改關卡對話內容（`data/levels/` 的台詞、選項、筆記）。
- 驗收一律看實際產出：用 Read 工具打開圖片（讀不了 WebP 就先用 Pillow 轉成 PNG 暫存檔再看，看完刪除）。腳本印出「完成」不代表圖是對的。
- 回報時每項標記：[實作]（真圖已產生且抽看過）、[Shell]（仍是佔位圖）、[Spike]（試跑性質）。不用「完美」「全自動」這類詞。

### 步驟

1. 環境檢查（不安裝任何東西）
   - `python --version`（3.10 以上）、`node --version`（22 以上）。
   - `python -c "import PIL; import rembg"`：缺的套件列給我，等我同意再裝（指令在 README 3.1）。
   - ComfyUI 網址：桌面版預設 `http://127.0.0.1:8000`，手動安裝版通常是 `http://127.0.0.1:8188`。用 `curl -s <網址>/system_stats` 確認連得上，記下 ComfyUI 版本、顯卡、VRAM。
   - 驗證：整理成表格給我。

2. 專案完整性
   - `node tools/validate.mjs`：應為 0 個錯誤。
   - `node --test "tests/*.test.mjs"`：應 34 項全部通過。
   - `python tools/comfyui_generate.py --dry-run`：應列出 386 張。

3. 試跑 3 張（三種類別各一；不要用 `--limit 3`，清單前 3 張都是沒有人物的風景）
   - `python tools/comfyui_generate.py --server <網址> --match ui/title bg/L001 char/mia_neutral`
   - 第一張就報錯時：模型名稱不符，改 `tools/comfyui_generate.py` 開頭的 `UNET`、`CLIP`、`VAE` 三行。節點或參數錯誤，打開 ComfyUI 內建的 Z-Image Turbo 範本工作流程對照，以最小幅度修改 `build_workflow()`，並說明改了什麼、為什麼。
   - 成功後逐張檢查：尺寸（背景 1280x720、立繪 640x960）、日系動漫畫風、立繪為亞洲面孔且背景透明、去背邊緣有無白邊或缺塊、背景沒有人物、有無文字或亂碼字。
   - 記下每張耗時，估算 386 張總時間。
   - 驗證：給我看檢查結果與時間估算，等我確認畫風再繼續。

4. 試跑發現問題時（我同意後才處理）
   - 背景出現文字：先在 `data/art.json` 的 `background.suffix` 加正面描述（例如 `clean blank signs, blank surfaces`），重新匯出後用 `--match bg/L001 --force` 重畫比較。仍不行再把腳本 `SAMPLER` 的 `cfg` 調到 1.5 到 2（負面提示詞才會生效，每張時間約變兩倍）。
   - 畫風不對：調整 `data/art.json` 的 prefix、suffix。
   - 去背品質差：改 `REMBG_MODEL`（例如 `isnet-general-use`）或加 `--no-rembg` 保留白底，並說明取捨。
   - 改過 `data/` 任何檔案後依序執行：`node tools/export_prompts.mjs`、`node tools/validate.mjs`、`node --test "tests/*.test.mjs"`。
   - 改 `data/art.json` 會影響全部提示詞，畫風必須在大量生圖前定案，避免前後不一致。

5. 角色一致性試跑
   - `--match char/mia_ char/ember_`（2 個角色共 8 張），檢查同一角色不同表情的長相、髮型、服裝是否一致。
   - 不一致的用 `--match char/<角色id>_ --force --seed-offset N` 整組重畫。
   - 驗證：回報結果，等我確認。

6. 全量生成（分三批，每批結束回報一次）
   - `--only ui chapter`（12 張）、`--only bg`（100 張）、`--only char`（274 張）。
   - 長時間執行請在背景跑；中斷、當機、重開機後重跑同一指令即可接續。
   - 每批看腳本最後一行「完成 N 張，失敗 N 張」，失敗的依錯誤訊息修正後重跑。

7. 品質抽查（每批結束後）
   - 介面與章節封面：12 張全看。
   - 背景：每章至少 3 張（共 30 張以上），優先看有招牌、櫃台、店面的場景。
   - 立繪：核心角色（`ember`、`mia`、`leo`、`mr_lin`、`ms_wong`、`sam`）全部表情都看，其他每章抽 3 個角色。
   - 問題列成表（檔名、問題、處理方式）。背景用 `--match bg/L0xx`、封面用 `--match chapter/ch0x`，加 `--force --seed-offset N` 重畫單張；立繪用 `--match char/<角色id>_ --force --seed-offset N` 整組重畫。重畫後再看一次。

8. 遊戲內確認
   - `python tools/serve.py`，開 `http://localhost:8080/?unlock=all#/map`。
   - 至少玩 L001、L050、L100 三關：背景與立繪正確顯示、表情切換正常、瀏覽器主控台沒有 404。看完關閉伺服器。

9. 收尾
   - `python tools/comfyui_generate.py --manifest`：應回報 386 個檔案。
   - 再跑一次 `node tools/validate.mjs` 與 `node --test "tests/*.test.mjs"`。
   - 更新 `GAPS.md` 第 1、2、3、11、12 條為實際結果（在哪個 ComfyUI 版本跑通、改了哪些設定、去背品質、仍不滿意的圖）。沒驗證過的條目保留。
   - 總結回報：完成張數、重畫張數、總耗時、改過的檔案清單、仍不滿意的圖。
   - 上架依 README 第 6 節，`git push` 前先問我。

### 每階段回報格式

- 做了什麼：指令與結果
- 看了哪些圖、發現什麼問題
- 下一步、需要我決定的事
