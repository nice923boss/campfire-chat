# 關卡內容撰寫指南

本文件定義 Campfire Chat 關卡資料的格式、寫作規則與 100 關課綱。新增或修改關卡時照這份文件寫，寫完執行驗證器：

```bash
node tools/validate.mjs
```

範例關卡：`data/levels/L001.json`（格式與品質的標準答案）。

---

## 1. 世界觀與主線

- **主角 Kai（凱）**：來自台灣，22 歲，到英語城市「楓灣 Maple Bay」參加一年期語言學校與打工度假計畫。玩家以第一人稱扮演 Kai，畫面上不出現 Kai 的立繪。
- **Kai 性別中立**：NPC 不可以用 sir、ma'am、Mr.、Ms.、he、she、his、her、guy、girl 等詞稱呼或指稱 Kai，需要稱呼時直接叫 Kai。
- **Ember（安柏）**：每週在湖畔「燈籠公園 Lantern Park」主持營火英語社 Campfire Chat。每關結尾的「營火筆記」由她講解（引擎自動處理），劇情中只在適合時登場（L100 必定登場）。
- **Brightway**：Kai 第七章求職、第八章起任職的公司，做智慧照明產品（smart lighting），客戶包含飯店、咖啡店、辦公室。

### 核心角色（`data/cast/core.json`，所有章節共用）

| id | 角色 | 主要登場 |
|----|------|---------|
| `ember` | 營火英語社主持人 | 營火筆記、L096、L100 |
| `mia` | Kai 的室友，活潑熱情 | 第一章 L009 起，第二、四、五、十章 |
| `leo` | 語言學校同學兼好友，隨和 | 第三章 L023 起，第四、五、十章 |
| `mr_lin` | 第六章起 Kai 的房東，嚴格但心軟 | 第六章、L098 |
| `ms_wong` | Brightway 經理，面試官兼主管 | 第七章 L064 起，第八、九、十章 |
| `sam` | Brightway 同事，熱心 | 第八、九章 |

### 各章主線

| 章 | 主題 | CEFR | 每關題數 | 主線 |
|----|------|------|---------|------|
| ch01 | 抵達楓灣 | A1 | 3 | 入境、進城、入住、第一天探索，L009 搬進合租公寓認識 Mia |
| ch02 | 生活起步 | A1-A2 | 3 | 採買與跑腿，有時和 Mia 一起 |
| ch03 | 語言學校 | A2 | 4 | 進入 Maple Bay Language Institute，L023 認識 Leo |
| ch04 | 交朋友 | A2 | 4 | 和 Mia、Leo 與新朋友的社交生活 |
| ch05 | 小旅行 | A2-B1 | 4 | 和 Mia、Leo 搭火車去海港城市 Port Aurora 旅行，L050 回程班機延誤 |
| ch06 | 獨立生活 | B1 | 4 | Kai 搬進自己的小套房（房東 Mr. Lin），處理租屋、看病、遺失物 |
| ch07 | 求職之路 | B1 | 5 | 從就業博覽會到 Brightway 面試（Ms. Wong），L070 錄取 |
| ch08 | 職場新人 | B1-B2 | 5 | 在 Brightway 上班，主管 Ms. Wong、同事 Sam |
| ch09 | 商務實戰 | B2 | 5 | 拜訪客戶、簡報、談判、客訴 |
| ch10 | 告別與成長 | B2 | 5 | 一年將盡，調解、道歉、致詞、道別，L100 最後的營火 |

---

## 2. 檔案結構

```
data/game.json          章節與關卡標題（課綱，由此決定關卡順序）
data/art.json           生圖提示詞的全域風格設定
data/cast/core.json     核心角色
data/cast/chXX.json     各章新角色（id 前綴 cXX_，例如 c03_teacher）
data/levels/LXXX.json   單一關卡內容
```

關卡標題只寫在 `game.json`，關卡檔案不重複寫標題。

---

## 3. 角色檔格式（`data/cast/chXX.json`）

```json
{
  "c03_teacher": {
    "name": "Ms. Reed",
    "nameZh": "瑞德老師",
    "role": { "en": "English teacher", "zh": "英文老師" },
    "gender": "female",
    "appearance": "woman in her late 30s, ..."
  }
}
```

- id 一律小寫加底線，新角色必須用該章前綴 `cXX_`。
- `gender`：`female` 或 `male`（用於語音音高）。
- `appearance`：英文生圖描述，寫年齡、髮型髮色、服裝（呼應職業）、一個辨識配件、氣質。**不要寫表情、背景、Asian**（全域設定會自動加上亞洲面孔、淺藍或淺綠底、表情）。
- 同一章內盡量重複使用角色，一章新角色建議 4 到 10 位。

---

## 4. 關卡檔格式（`data/levels/LXXX.json`）

```json
{
  "id": "L001",
  "location": { "en": "...", "zh": "..." },
  "goal": { "en": "...", "zh": "..." },
  "background": "英文背景生圖提示詞",
  "cast": ["c01_officer"],
  "intro": [Line],
  "steps": [Step],
  "good": { "lines": [Line], "title": {"en","zh"}, "story": {"en","zh"} },
  "notes": [Note]
}
```

### Line（一句台詞）

```json
{ "who": "c01_officer", "expr": "neutral", "en": "...", "zh": "..." }
```

- `who`：角色 id、`narrator`（旁白）或 `player`（Kai）。
- `expr`：只有角色需要，可用 `neutral`、`happy`、`upset`、`confused`，省略時為 `neutral`。
- `cast` 必須列出本關所有說話的角色（不含 narrator、player），最多 3 位，順序即畫面由左到右位置。

### Step（一道選擇題）

```json
{
  "lines": [Line],
  "choices": [
    { "en": "...", "zh": "...", "ok": true, "tip": "答對時的小提示（繁中）" },
    { "en": "...", "zh": "...", "ok": false, "fail": Fail },
    { "en": "...", "zh": "...", "ok": false, "fail": Fail }
  ]
}
```

- `lines` 1 到 3 句，最後一句必須是 NPC 說的話，玩家要回應它。
- `choices` 固定 3 個，恰好 1 個 `ok: true`。引擎會隨機打亂順序，資料裡正解放第一個即可。
- 正解的 `tip`：一句繁中，點出為什麼這樣說好。

### Fail（答錯的壞結局）

```json
{
  "kind": "literal",
  "lines": [{ "who": "...", "expr": "upset", "en": "...", "zh": "..." }],
  "title": { "en": "Lost in Translation", "zh": "翻譯迷航" },
  "story": { "en": "...", "zh": "..." },
  "why": "繁中解說：錯在哪裡，正確或更自然的說法是什麼。"
}
```

- `kind`：錯誤類型，對應第 5 節的五類，遊戲的「學習紀錄」會用它畫出玩家的弱點雷達圖：
  - `literal`：中式直譯
  - `grammar`：文法錯誤
  - `tone`：語氣不當
  - `offtopic`：答非所問
  - `culture`：文化地雷
- `lines` 1 到 2 句，NPC 的反應，表情用 `upset` 或 `confused`。
- `title`：壞結局名稱，短、俏皮。
- `story`：1 到 2 句，這個回答造成的後果。可以好笑，但不殘忍、不羞辱。
- `why`：1 到 3 句繁中，說明錯誤並示範正確說法。

### Good（好結局）

- `lines` 1 到 3 句，順利收尾的對話。
- `title`、`story`：好結局名稱與 1 到 2 句結局敘述。

### Note（營火筆記，每關 4 到 5 則）

```json
{
  "type": "phrase",
  "en": "Here you are.",
  "zh": "給你／請看。",
  "explain": "繁中解說",
  "example": { "en": "...", "zh": "..." }
}
```

- `type`：`phrase`（實用句）、`grammar`（文法）、`vocab`（單字）、`culture`（文化）、`trap`（常見錯誤）。
- 每關至少 1 則 `trap` 或 `culture`。
- 筆記要涵蓋本關正解裡的重點句型。

---

## 5. 寫作品質規則

### 錯誤選項

錯誤選項必須是**台灣學習者真的會犯的錯**，不能是一看就知道的荒謬選項。每關混用以下類型（括號內是 `fail.kind` 的值）：

1. **中式直譯**（`literal`）：Give you.、I very like it.、Open the light.、How to say?
2. **文法錯誤**（`grammar`）：I'm visit.、He don't know.、since one year
3. **語氣不當**（`tone`）：太直接、太命令、太隨便或在輕鬆場合太正式
4. **答非所問**（`offtopic`）：誤解問題，例如用 Yes / No 回答 What 問句
5. **文化地雷**（`culture`）：問薪水年齡、亂開玩笑、不排隊、不給小費等

每關的錯誤選項至少要用到 3 種不同的 `kind`，整章五類都要出現。

三個選項長度要相近，不要讓正解永遠最長或最短。

### 難度控制

| CEFR | 選項長度 | 句型 |
|------|---------|------|
| A1 | 8 字以內 | 現在式、基本問句、please / thank you |
| A2 | 12 字以內 | 過去式、can / could、would like、頻率副詞 |
| B1 | 18 字以內 | 現在完成式、條件句、委婉請求、說明理由 |
| B2 | 25 字以內 | 慣用語、緩衝語（I see your point, but...）、外交辭令、假設語氣 |

跨級距的章節取中間值，`tools/validate.mjs` 依此檢查各章選項字數上限：

| 章 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|----|---|---|---|---|---|---|---|---|---|----|
| 上限（英文字） | 8 | 10 | 12 | 12 | 15 | 18 | 18 | 22 | 25 | 25 |

### 中文規則

- 一律繁體中文、台灣用語：計程車、網路、資訊、影片、品質、軟體、手機、預約、垃圾桶。
- 中文使用全形標點：，。、：；？！（）「」。
- **禁止破折號（em dash，U+2014，單個或連續兩個都不行）**，改用逗號、冒號、括號。驗證器會自動檢查。
- 中文刪節號用 `……`，英文用 `...`。
- 中文裡夾英文時，英文本身保持半形，例如：遞東西時說 Here you are.。
- 台詞、選項、地點、目標、結局的中文一律用角色的中文名（`nameZh`，主角是「凱」），例如「米亞」不寫 Mia。英文名只出現在 `tip`、`why`、筆記裡引用的英文句子。驗證器會檢查。

### 背景提示詞 `background`

- 英文，15 到 35 個字，只描述場景：地點、物件、時間、光線。
- **不要出現人物**（立繪會另外疊上去）。
- **不要誘發文字**：不寫 sign、poster、menu、label、book title；需要時寫 blank sign、menu board without text。
- 不寫 anime style、no people 等風格字（全域設定會自動加上）。

### 內容安全

全年齡、無暴力、無歧視、無戀愛露骨內容。壞結局以尷尬、誤會、小損失為主。

---

## 6. 100 關課綱

每關的「學習重點」是撰寫時必須涵蓋的核心功能語。

### ch01 抵達楓灣（A1，每關 3 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L001 | Passport, Please 入境審查 | 機場入境櫃檯 | Here you are.、I'm here to...、for + 時間 |
| L002 | Where's My Bag? 行李轉盤 | 行李提領區，找不到行李轉盤、認錯別人的行李 | Excuse me, where is...?、This is mine. / I think that's mine. |
| L003 | Taxi to Town 搭計程車進城 | 機場計程車 | Could you take me to...?、How much is it?、Keep the change. |
| L004 | Checking In 飯店入住 | 飯店櫃檯 | I have a reservation under...、拼字 It's K-A-I.、What time is breakfast? |
| L005 | First Coffee 第一杯咖啡 | 咖啡店點餐 | Can I get a...?、for here / to go、small / medium / large |
| L006 | Which Way? 問路 | 街角問路人去車站 | How do I get to...?、turn left、go straight、Is it far? |
| L007 | Corner Store 便利商店 | 便利商店結帳 | Do you have...?、Do you need a bag?、card or cash |
| L008 | Getting Connected 辦手機門號 | 電信行辦預付卡 | I'd like a SIM card.、How much data?、prepaid |
| L009 | Meeting Mia 室友初見面 | 合租公寓門口，室友 Mia（`mia`） | Nice to meet you.、I'm from Taiwan.、自我介紹 |
| L010 | Excuse Me, Sorry, Thanks 三個魔法詞 | 擁擠的公車與街頭小意外 | Excuse me（借過、引起注意）、Sorry（道歉）、Thank you 的使用時機 |

### ch02 生活起步（A1-A2，每關 3 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L011 | Supermarket Run 超市採買 | 超市找商品 | Where can I find...?、aisle、Is this on sale? |
| L012 | Fresh Bread 麵包店 | 麵包店 | a loaf of、two of those、I'll take... |
| L013 | Bus Pass 公車儲值卡 | 公車站售票處 | top up、monthly pass、Does this bus go to...? |
| L014 | At the Pharmacy 藥局買藥 | 藥局 | I have a headache.、How often should I take it?、side effects |
| L015 | Laundry Day 自助洗衣 | 自助洗衣店，和 Mia 一起 | How does this machine work?、change for a ten、detergent |
| L016 | Sending a Parcel 寄包裹回家 | 郵局寄包裹回台灣 | I'd like to send this to...、express / standard、fragile |
| L017 | Trying It On 試穿衣服 | 服飾店 | Can I try this on?、Do you have it in a medium?、It's a bit tight. |
| L018 | Fast Food Order 速食點餐 | 速食店 | I'll have the number 2 combo.、no onions、for here |
| L019 | A New Haircut 剪頭髮 | 理髮店 | Just a trim, please.、a little shorter、Not too short. |
| L020 | Opening a Bank Account 開銀行帳戶 | 銀行 | I'd like to open an account.、proof of address、debit card |

### ch03 語言學校（A2，每關 4 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L021 | Enrollment Office 註冊報到 | 學校行政處 | I'm here to register.、fill out a form、student ID |
| L022 | First Class 第一堂課 | 教室自我介紹 | My name is...、I'm into...、In my free time, I... |
| L023 | Meeting Leo 認識 Leo | 下課後和 Leo（`leo`）聊天 | Where are you from?、What brings you here?、找共同話題 |
| L024 | Asking the Teacher 請教老師 | 課後問老師 | Could you say that again?、What does ... mean?、How do you spell it? |
| L025 | Library Card 圖書館借書 | 圖書館 | I'd like to borrow...、When is it due?、renew |
| L026 | Cafeteria Lunch 學生餐廳 | 學生餐廳 | What's in this?、I'm allergic to...、vegetarian option |
| L027 | Group Project 分組作業 | 小組討論 | How about...?、Why don't we...?、分工 I can take care of... |
| L028 | Running Late 遲到了 | 遲到進教室、事後向老師解釋 | Sorry I'm late.、The bus was late.、It won't happen again. |
| L029 | Club Fair 社團博覽會 | 社團攤位 | What do you do in this club?、How often do you meet?、sign up |
| L030 | Exam Week 考前讀書會 | 圖書館讀書會，Leo 與同學 | Could I borrow your notes?、Let's quiz each other.、I'm stuck on... |

### ch04 交朋友（A2，每關 4 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L031 | Weekend Plans 週末邀約 | 邀請 Leo 週末去爬山 | Are you free on...?、Do you want to...?、Sounds great! |
| L032 | Saying No Nicely 婉拒邀約 | 婉拒同學的派對邀請 | I'd love to, but...、Maybe next time.、Thanks for asking. |
| L033 | House Party 家庭派對 | 朋友家派對，和陌生人搭話 | Should I bring anything?、How do you know the host?、自我介紹 |
| L034 | Weather Talk 聊天氣 | 公車站和鄰居閒聊 | Lovely day, isn't it?、附加問句、small talk 的節奏 |
| L035 | Giving Compliments 稱讚別人 | 稱讚 Mia 的新髮型與廚藝 | I love your...、That looks great on you.、回應稱讚 Thank you! |
| L036 | Movie Night 看電影 | 和 Mia、Leo 挑電影買票 | What are you in the mood for?、two tickets for...、I'm not a big fan of... |
| L037 | Mia's Birthday Mia 的生日 | Mia 的生日聚會 | Happy birthday!、I got you something.、Make a wish! |
| L038 | On the Phone 講電話 | 打電話給朋友家，接電話的是家人 | Is Leo there?、Can I leave a message?、This is Kai speaking. |
| L039 | Plans Change 臨時改期 | 臨時要改約 | Something came up.、Can we reschedule?、Would Friday work? |
| L040 | My Bad 道歉和好 | 誤會 Leo 後向他道歉 | I owe you an apology.、I didn't mean to...、No hard feelings? |

### ch05 小旅行（A2-B1，每關 4 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L041 | Train Tickets 買火車票 | 火車站售票口，去 Port Aurora | round trip / one way、window seat、Which platform? |
| L042 | Hostel Check-in 青年旅館 | 青年旅館櫃檯 | I booked a bed in...、Is there a locker?、What's the Wi-Fi password? |
| L043 | City Tour 城市導覽 | 跟導遊導覽 | Could you tell us more about...?、How old is...?、禮貌打斷導遊 |
| L044 | Lost Luggage 行李遺失 | 行李寄放處找不到行李 | My bag is missing.、描述行李 It's a black suitcase with...、contact number |
| L045 | Table for Three 餐廳訂位 | 熱門餐廳候位 | Do you have a table for three?、How long is the wait?、put us on the list |
| L046 | Museum Visit 參觀博物館 | 博物館售票與館內 | student discount、audio guide、Am I allowed to take photos? |
| L047 | Could You Take a Photo? 請人拍照 | 景點請路人幫忙拍照 | Would you mind taking a photo?、Just press this button.、One more, please. |
| L048 | Souvenir Market 市集買紀念品 | 市集攤販 | How much is this?、Could you do a better price?、I'll take two. |
| L049 | Missed the Last Bus 錯過末班車 | 深夜錯過公車，問替代方案 | Is there another way to get to...?、call a taxi、What time is the first bus? |
| L050 | Flight Delayed 班機延誤 | 機場櫃檯改票 | My flight was delayed.、Can I get on the next flight?、meal voucher |

### ch06 獨立生活（B1，每關 4 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L051 | Apartment Viewing 看房子 | 和房東 Mr. Lin（`mr_lin`）看套房 | Are utilities included?、Is it furnished?、When is it available? |
| L052 | Signing the Lease 簽租約 | 簽約前確認條款 | security deposit、Could you explain this part?、notice period |
| L053 | Something's Broken 報修 | 打電話給 Mr. Lin 報修暖氣 | The heater isn't working.、It's been broken since...、When could someone come? |
| L054 | Noisy Neighbor 吵鬧的鄰居 | 敲門請鄰居小聲 | I hate to bother you, but...、Would you mind keeping it down?、提出折衷 |
| L055 | Internet Setup 網路安裝 | 和網路公司客服通話 | I'd like to set up...、The connection keeps dropping.、schedule a technician |
| L056 | Making an Appointment 預約看診 | 打電話到診所 | I'd like to make an appointment.、Do you have anything earlier?、walk-in |
| L057 | Describing Symptoms 描述症狀 | 診間和醫生對話 | I've had a sore throat for three days.、It hurts when...、Are there any side effects? |
| L058 | Lost Wallet 掉了錢包 | 警察局報案 | I'd like to report a lost wallet.、I last saw it...、What should I do next? |
| L059 | Returning an Item 退換貨 | 拿壞掉的果汁機去退貨 | I'd like to return this.、It stopped working after...、refund or exchange |
| L060 | Wrong Bill 帳單有誤 | 打電話給電力公司 | I think there's a mistake on my bill.、I was charged twice.、Could you look into it? |

### ch07 求職之路（B1，每關 5 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L061 | Career Fair 就業博覽會 | 博覽會攤位和招募人員交談 | 30 秒自我推銷、I'm interested in...、Could I leave my resume? |
| L062 | Resume Advice 請教履歷 | 學校職涯顧問 | Could you take a look at...?、How can I improve...?、action verbs |
| L063 | Phone Screening 電話初篩 | Brightway HR 打來 | I'm available...、work permit、When would be a good time? |
| L064 | Tell Me About Yourself 面試自我介紹 | Brightway 面試，面試官 Ms. Wong（`ms_wong`） | 過去經驗＋現在能力＋未來目標的結構 |
| L065 | Strengths and Weaknesses 談優缺點 | 面試續 | One of my strengths is...、I'm working on...、舉實例 |
| L066 | Tell Me About a Time 情境題 | 行為面試題 | STAR 法：Situation、Task、Action、Result |
| L067 | Any Questions for Us? 反問面試官 | 面試尾聲 | What does a typical day look like?、What are the next steps? |
| L068 | Talking Money 談薪水 | 二面談薪資 | Based on my research...、I'm flexible.、Is there room for...? |
| L069 | Following Up 面試後追蹤 | 打電話追蹤面試結果 | I'm calling to follow up on...、I wanted to thank you for... |
| L070 | The Offer 錄取通知 | Ms. Wong 打來發 offer | I'm thrilled to accept.、Could I confirm the start date?、詢問細節 |

### ch08 職場新人（B1-B2，每關 5 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L071 | First Day 上班第一天 | 報到，認識同事 Sam（`sam`） | It's nice to finally meet you.、Where can I find...?、Who should I ask about...? |
| L072 | Team Meeting 團隊會議 | 第一次團隊會議 | Let me briefly introduce myself.、I'm looking forward to working with you all. |
| L073 | Could You Clarify? 確認需求 | Ms. Wong 交代任務 | Just to make sure I understand...、By when do you need it?、Could you clarify...? |
| L074 | Asking for Help 請同事幫忙 | 請 Sam 教你用系統 | Do you have a minute?、I'd really appreciate it if...、I owe you one. |
| L075 | Disagreeing Politely 委婉表達異議 | 會議中對提案有不同看法 | I see your point, but...、Have we considered...?、緩衝語 |
| L076 | Deadline Trouble 申請延期 | 向 Ms. Wong 申請延期 | I'm afraid I need more time.、提出替代方案、take responsibility |
| L077 | Taking Feedback 接受回饋 | 主管給負面回饋 | Thanks for the feedback.、Could you give me an example?、I'll work on it. |
| L078 | Taking a Message 代接電話 | 幫同事接客戶電話 | He's not available right now. May I take a message?、Could you spell that? |
| L079 | Lunch with the Boss 和主管午餐 | 和 Ms. Wong 吃午餐閒聊 | 得體閒聊、避開敏感話題、展現興趣 |
| L080 | Project Update 進度報告 | 會議中報告進度 | We're on track.、We've run into an issue.、Next steps are... |

### ch09 商務實戰（B2，每關 5 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L081 | Meeting a Client 拜訪客戶 | 拜訪飯店客戶 | Thank you for taking the time to meet.、破冰閒聊、交換名片 |
| L082 | The Pitch 產品簡報 | 向咖啡連鎖店簡報智慧照明 | The key benefit is...、This means you can...、用數據說服 |
| L083 | Handling Objections 處理異議 | 客戶嫌貴 | I understand your concern.、Let's look at the long-term savings. |
| L084 | Negotiating Terms 議價談判 | 談折扣與合約 | If you could..., we could...、meet halfway、That's a deal-breaker. |
| L085 | Angry Customer 客訴處理 | 客戶打來抱怨產品故障 | I completely understand your frustration.、Let me fix this.、follow up |
| L086 | Delivering Bad News 傳達壞消息 | 告知客戶出貨延遲 | I'm afraid I have some bad news.、Here's what we can do. |
| L087 | Networking Event 商務交流會 | 業界交流會 | What line of work are you in?、Let's keep in touch.、優雅結束對話 |
| L088 | Q&A Session 簡報問答 | 簡報後的尖銳提問 | That's a great question.、I'll get back to you on that.、承認不知道 |
| L089 | Lost in Culture 文化誤會 | 和外國客戶的文化誤會 | I didn't mean any offense.、In my culture...、澄清與修補 |
| L090 | Business Dinner 商務晚宴 | 和客戶吃飯 | I'd like to propose a toast.、點餐禮儀、結帳與道別 |

### ch10 告別與成長（B2，每關 5 題）

| 關卡 | 標題 | 情境 | 學習重點 |
|------|------|------|---------|
| L091 | Advice for a Newcomer 給新人建議 | 在營火社遇到剛來楓灣的新人 | If I were you, I'd...、It helps to...、分享經驗 |
| L092 | Friends in Conflict 調解朋友爭執 | Mia 與 Leo 吵架 | I can see both sides.、Let's hear each other out.、中立調解 |
| L093 | Comforting a Friend 安慰朋友 | Leo 考試失利 | That must be tough.、I'm here for you.、不說教的安慰 |
| L094 | A Serious Apology 鄭重道歉 | 工作重大失誤向 Ms. Wong 道歉 | I take full responsibility.、Here's how I'll fix it.、It won't happen again. |
| L095 | A Letter of Recommendation 請求推薦信 | 請 Ms. Wong 寫推薦信 | I was wondering if you'd be willing to...、give enough notice、表達感謝 |
| L096 | Campfire Debate 營火辯論 | 營火社辯論「遠距工作 vs 進辦公室」，Ember 主持 | In my opinion...、On the other hand...、That's a fair point. |
| L097 | Farewell Speech 告別致詞 | 在 Brightway 的告別會致詞 | I'd like to thank...、I'll never forget...、得體的致詞結構 |
| L098 | Moving Out 退租交屋 | 和 Mr. Lin 退租點交 | move-out inspection、wear and tear、deposit back |
| L099 | Last Night Out 最後的夜晚 | 和 Mia、Leo 最後一晚 | I'm going to miss you.、Let's keep in touch.、Promise you'll visit. |
| L100 | The Final Campfire 最後的營火 | 營火社最後一次聚會，Ember 請 Kai 分享這一年 | 回顧一年、描述成長、表達感謝，全遊戲總結 |
