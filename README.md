# Campfire Chat 營火英語對話

100 關生活情境的選擇式英語對話練習，給台灣學習者。主角凱從抵達新城市一路走到職場，難度由 A1 漸進到 B2。

- 每句對話都用選項框選擇，沒有自由輸入。
- 選錯會立刻看到壞結局（附原因說明），再從同一題重試，正解會換位置。
- 全部答對看好結局，依失誤次數給 1 到 3 顆星。
- 每關結束有「營火筆記」：句型、文法、單字、陷阱或文化，中英對照。
- 進度存在瀏覽器 localStorage，不需要帳號或伺服器。

386 張角色與背景都已用 ComfyUI（Z-Image Turbo）產生，已知小瑕疵見 [GAPS.md](GAPS.md)。重畫或新增圖片照下方「美術製作流程」。

---

## 1. 本機預覽

需要 Python 3（只用標準函式庫）。

```bash
python tools/serve.py
```

打開 <http://localhost:8080>。要換埠號就加在後面，例如 `python tools/serve.py 9000`。

- 不能直接雙擊 `index.html`：ES 模組與 `fetch` 在 `file://` 下會被瀏覽器擋掉。
- `serve.py` 關閉快取，改了關卡或剛產生的圖，一般重新整理就看得到。
- 測試時在網址加 `?unlock=all` 可解鎖全部關卡，例如 `http://localhost:8080/?unlock=all#/map`。只對帶這個參數的網址有效，拿掉參數就恢復正常解鎖規則。

## 2. 專案結構

| 路徑 | 內容 |
|---|---|
| `index.html`、`css/`、`js/` | 遊戲本體（原生 JavaScript ES 模組，無建置步驟） |
| `js/engine.js` | 對話流程狀態機（純函式，有單元測試） |
| `js/store.js` | 存檔、解鎖、統計 |
| `data/game.json` | 章節與關卡清單 |
| `data/art.json` | 生圖的共用畫風設定 |
| `data/cast/` | 角色資料：`core.json` 跨章節角色，`ch01.json` 到 `ch10.json` 各章配角 |
| `data/levels/L001.json` 到 `L100.json` | 100 關的對話、選項、結局、筆記 |
| `assets/` | 圖片（`bg` 背景、`char` 立繪、`chapter` 章節封面、`ui` 介面），加上 `manifest.json` |
| `prompts/` | 匯出的生圖提示詞：`manifest.json` 給腳本用，`PROMPTS.md` 給人看或手動複製 |
| `tools/` | `serve.py` 預覽、`validate.mjs` 內容檢查、`export_prompts.mjs` 匯出提示詞、`comfyui_generate.py` 批次生圖 |
| `tests/` | Node 內建測試 |
| `docs/CONTENT_GUIDE.md` | 關卡撰寫規則、世界觀、100 關課綱 |
| `docs/COMFYUI_HANDOFF.md` | 另一台電腦接手生圖用的 AI 提示詞 |

## 3. 美術製作流程（ComfyUI + Z-Image Turbo）

共 386 張：

| 類別 | 張數 | 尺寸 | 檔名 |
|---|---|---|---|
| 介面畫面 | 2 | 1280x720 | `assets/ui/{名稱}.webp` |
| 章節封面 | 10 | 1280x720 | `assets/chapter/{章節 id}.webp` |
| 關卡背景 | 100 | 1280x720 | `assets/bg/{關卡 id}.webp`，例如 `L001.webp` |
| 角色立繪 | 274 | 640x960 | `assets/char/{角色 id}_{表情}.webp`，例如 `mia_happy.webp` |

畫風統一為日系動漫、亞洲面孔為主。共用的畫風前綴、後綴、負面提示詞與尺寸在 `data/art.json`，角色外觀在 `data/cast/`，關卡背景描述在各關的 `background` 欄位。每張圖的 seed 由類別與 id 雜湊算出（同一角色的所有表情共用一個 seed，臉才會一致），重新匯出也不會變，同一張圖可以重現。

### 3.1 準備

1. 安裝並啟動 ComfyUI。
2. 放好 Z-Image Turbo 模型（檔名需與 `tools/comfyui_generate.py` 開頭設定一致，不同就改那幾行）：

   | 設定 | 預設檔名 | ComfyUI 資料夾 |
   |---|---|---|
   | `UNET` | `zImageTurboQuantized_fp8E4m3fn.safetensors` | `models/diffusion_models/` |
   | `CLIP` | `qwen_3_4b.safetensors`（type `lumina2`） | `models/text_encoders/` |
   | `VAE` | `ae.safetensors` | `models/vae/` |

   取樣設定：10 步、CFG 1.0、`dpmpp_2m_sde`、`sgm_uniform`、shift 3.0。

3. 安裝 Python 套件（已安裝就會略過）：

   ```bash
   python -m pip install pillow "rembg[cpu]"
   ```

   有 NVIDIA 顯卡可改裝 `"rembg[gpu]"`。角色立繪以淺藍底生成（外觀有 blue、denim、teal 這類藍色系衣著的角色改用淺綠底，避免衣服被當成背景去掉），再用 rembg 的 `u2net` 模型去背，第一次執行會自動下載模型（約 176 MB）。不想去背就加 `--no-rembg`。

### 3.2 產生圖片

在專案資料夾執行：

```bash
node tools/export_prompts.mjs
```

```bash
python tools/comfyui_generate.py --dry-run
```

```bash
python tools/comfyui_generate.py --match ui/title bg/L001 char/mia_neutral
```

```bash
python tools/comfyui_generate.py
```

順序是：匯出提示詞，列出待產生清單，先試 3 張（介面、背景、立繪各一，比 `--limit 3` 好，清單前 3 張都是風景）確認畫風，再跑全部。只會產生還不存在的檔案，中斷後重跑會接著做。每完成一張就更新 `assets/manifest.json`，重新整理遊戲畫面就看得到。

腳本預設連 `http://127.0.0.1:8000`（ComfyUI 桌面版）。手動安裝或免安裝版通常是 8188 埠：

```bash
python tools/comfyui_generate.py --server http://127.0.0.1:8188
```

| 參數 | 作用 |
|---|---|
| `--server URL` | ComfyUI 網址 |
| `--only bg char chapter ui` | 只產生指定類別 |
| `--match L001 mia_` | 只產生路徑含這些文字的檔案 |
| `--force` | 已存在的也重畫（搭配 `--match` 使用） |
| `--seed-offset N` | seed 加 N，不滿意構圖時換一組 |
| `--limit N` | 最多產生 N 張 |
| `--no-rembg` | 立繪不去背 |
| `--dry-run` | 只列清單，不送 ComfyUI |
| `--manifest` | 只重建 `assets/manifest.json` |

重畫某個角色的全部表情：

```bash
python tools/comfyui_generate.py --match mia_ --force --seed-offset 7
```

### 3.3 assets/manifest.json

遊戲只會請求 `manifest.json` 列出的圖片，沒列出的一律顯示佔位圖，所以缺圖時不會出現 404。

- 用腳本產生：自動更新，不用管。
- 自己手動放圖（例如用 `PROMPTS.md` 的提示詞在其他工具生圖）：放到正確檔名後執行 `python tools/comfyui_generate.py --manifest` 重建清單。
- 改了角色外觀、關卡背景描述或新增角色後，要重新執行 `node tools/export_prompts.mjs`。

## 4. 修改關卡內容

規則與課綱都在 `docs/CONTENT_GUIDE.md`。改完一定要跑檢查：

```bash
node tools/validate.mjs
```

```bash
node tools/validate.mjs --chapter 3
```

會檢查 JSON 結構、每題恰好 1 個正解、說話者在角色清單內、筆記數量、簡體字、破折號、中文欄位誤用英文人名、角色名重複等。結果需要是「0 個錯誤」。

## 5. 測試

需要 Node.js 22 以上（`node --test` 的檔名萬用字元需要新版）。

```bash
node --test "tests/*.test.mjs"
```

涵蓋對話引擎、存檔、路由與斷詞、內容檢查器，最後一項會用檢查器掃過全部 100 關。

## 6. 上架 GitHub Pages

這是純靜態網站，不需要建置。

1. 在 GitHub 建立新的 repository（公開）。
2. 把整個專案資料夾推上去（`.nojekyll` 要一起上傳，讓 GitHub 不經過 Jekyll 處理）：

   ```bash
   git init
   ```

   ```bash
   git add .
   ```

   ```bash
   git commit -m "feat: Campfire Chat"
   ```

   ```bash
   git branch -M main
   ```

   ```bash
   git remote add origin https://github.com/你的帳號/campfire-chat.git
   ```

   ```bash
   git push -u origin main
   ```

3. 到 repository 的 Settings → Pages，Source 選「Deploy from a branch」，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 約一兩分鐘後網址會是 `https://你的帳號.github.io/campfire-chat/`。

注意：

- 網站用 `#/map` 這類 hash 路由，放在子路徑下也能正常運作，不需要 404 轉址。
- 每次新增圖片後，記得連同 `assets/manifest.json` 一起 commit。
- `prompts/`、`tools/`、`tests/`、`docs/` 留在 repository 裡不影響遊玩，想精簡也可以不上傳。
- 單一檔案上限 100 MB，整個 Pages 網站建議 1 GB 以內；386 張 WebP 共約 24 MB，沒有問題。

## 7. 使用的 JavaScript 函式庫

從《JS工具功能清單》挑選與遊戲體驗相關的函式庫，全部由 jsDelivr CDN 按需載入（`js/vendor.js`）。任何一個載入失敗（離線、被擋），遊戲都照常可玩，只是少了對應效果。

| 函式庫 | 用在哪裡 | 載入失敗時 |
|---|---|---|
| GSAP + SplitText | 畫面進場、角色登場與說話時的彈跳、標題逐字浮起、結局卡片進場 | 改用瀏覽器內建的 Web Animations API |
| simplex-noise | 背景火星的飄動軌跡 | 改用正弦擺動 |
| canvas-confetti | 好結局的火花彩帶、最終關的上升火星 | 不顯示 |
| ZzFX | 點擊、答對、答錯、星星、解鎖等短音效（程式合成，無音檔） | 靜音 |
| Tone.js | 營火劈啪聲與五聲音階背景旋律（玩家開啟環境音才載入） | 靜音 |
| Rough Notation | 劃掉錯誤選項、標示重點句的手繪記號 | 改用 CSS 樣式 |
| driver.js | 第一次進入各畫面的導覽提示（設定頁可重看） | 不顯示導覽 |
| Chart.js | 學習紀錄頁的各章星數長條圖、錯誤類型雷達圖 | 改用 CSS 長條 |
| Fuse.js | 營火筆記本的模糊搜尋 | 改用一般字串比對 |
| html-to-image + qr-code-styling | 成績卡與結業證書 PNG，附遊戲網址 QR code | 顯示提示訊息，無法下載圖片 |

英文朗讀使用瀏覽器內建的 Web Speech API，語音支援時會逐字標示目前念到的單字；瀏覽器不支援語音合成時，朗讀按鈕自動隱藏。

## 8. 已知限制

見 [GAPS.md](GAPS.md)。
