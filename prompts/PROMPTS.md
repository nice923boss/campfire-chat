# Campfire Chat 生圖提示詞

由 `node tools/export_prompts.mjs` 產生，請勿手動修改；要改提示詞請改 `data/` 底下的 JSON 再重新匯出。

共 386 張：介面畫面 2、章節封面 10、關卡背景 100、角色立繪 274。

- 角色立繪同一角色的所有表情共用同一個 seed，臉才會一致。
- 立繪以淺藍底生成（外觀有藍色系衣著的角色用淺綠底，避免衣服被當成背景），`tools/comfyui_generate.py` 會用 rembg 去背。
- 負面提示詞（negative）同一類共用一組，列在每一類的開頭。

## 介面畫面（2 張，1280x720）

負面提示詞：

```text
blurry, ugly, bad quality, lowres, realistic, 3D, photo, deformed, extra limbs, extra fingers, bad anatomy, bad hands, (text:1.5), (letters:1.5), (writing:1.5), (words:1.5), watermark, signature, caption, typography, font, label, subtitle, title, number, digit, kanji, chinese characters, japanese text, korean text, CJK, hieroglyphs, inscription, printed text, handwritten text, logo text, characters on surface, people, person, crowd, character, face
```

### title

`assets/ui/title.webp`，seed 4228207651

```text
anime style key visual background art, cozy campfire at night in a lakeside park, glowing embers and floating sparks, wooden log benches around the fire, starry sky, distant city lights across the lake, warm orange and deep blue palette, 2D illustration, detailed background, no people, no characters
```

### campfire

`assets/ui/campfire.webp`，seed 4187189746

```text
anime style visual novel background art, close view of a crackling campfire at night, warm orange glow on wooden log benches, an open notebook and a mug of cocoa on a log, fireflies, pine trees, soft bokeh, 2D illustration, detailed background, no people, no characters
```

## 章節封面（10 張，1280x720）

負面提示詞：

```text
blurry, ugly, bad quality, lowres, realistic, 3D, photo, deformed, extra limbs, extra fingers, bad anatomy, bad hands, (text:1.5), (letters:1.5), (writing:1.5), (words:1.5), watermark, signature, caption, typography, font, label, subtitle, title, number, digit, kanji, chinese characters, japanese text, korean text, CJK, hieroglyphs, inscription, printed text, handwritten text, logo text, characters on surface, people, person, crowd, character, face
```

### ch01 抵達楓灣

`assets/chapter/ch01.webp`，seed 230459504

```text
anime style key visual background art, quiet international airport arrival hall at morning, empty rows of seats, large glass windows with runway view, soft sunrise light, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch02 生活起步

`assets/chapter/ch02.webp`，seed 280792361

```text
anime style key visual background art, cozy neighborhood street with small shops, bakery and grocery store fronts with blank awnings, morning light, potted plants, bicycles, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch03 語言學校

`assets/chapter/ch03.webp`，seed 264014742

```text
anime style key visual background art, bright modern language school campus courtyard with brick buildings, green lawn, benches, autumn trees, clear afternoon sky, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch04 交朋友

`assets/chapter/ch04.webp`，seed 314347599

```text
anime style key visual background art, warm living room at evening with string lights, sofa with cushions, snacks on coffee table, board games, cozy party atmosphere, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch05 小旅行

`assets/chapter/ch05.webp`，seed 297569980

```text
anime style key visual background art, scenic train station platform beside mountains and a lake, vintage train, morning mist, travel backpacks on a bench, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch06 獨立生活

`assets/chapter/ch06.webp`，seed 347902837

```text
anime style key visual background art, small sunny studio apartment with moving boxes, wooden floor, large window with city view, potted plant, keys on a table, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch07 求職之路

`assets/chapter/ch07.webp`，seed 331125218

```text
anime style key visual background art, modern office building lobby with glass walls, reception desk without lettering, waiting chairs, potted plants, bright daylight, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch08 職場新人

`assets/chapter/ch08.webp`，seed 381458075

```text
anime style key visual background art, open plan office with wooden desks, monitors, whiteboard without writing, plants, large windows, warm morning light, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch09 商務實戰

`assets/chapter/ch09.webp`，seed 364680456

```text
anime style key visual background art, elegant conference room with long table, leather chairs, city skyline through floor to ceiling windows at golden hour, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

### ch10 告別與成長

`assets/chapter/ch10.webp`，seed 683308122

```text
anime style key visual background art, campfire on a beach at dusk, glowing embers and sparks, ocean waves, purple and orange sky, logs arranged around the fire, 2D illustration, detailed background, beautiful lighting, high quality, no people, no characters, blank signs, plain unmarked surfaces
```

## 關卡背景（100 張，1280x720）

負面提示詞：

```text
blurry, ugly, bad quality, lowres, realistic, 3D, photo, deformed, extra limbs, extra fingers, bad anatomy, bad hands, (text:1.5), (letters:1.5), (writing:1.5), (words:1.5), watermark, signature, caption, typography, font, label, subtitle, title, number, digit, kanji, chinese characters, japanese text, korean text, CJK, hieroglyphs, inscription, printed text, handwritten text, logo text, characters on surface, people, person, crowd, character, face
```

### L001 入境審查（ch01）

`assets/bg/L001.webp`，seed 3023890683

```text
anime style visual novel background art, airport immigration hall with a row of passport control booths, glass partitions, queue barrier belts, bright ceiling lights, polished floor, morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L002 行李轉盤（ch01）

`assets/bg/L002.webp`，seed 3040668302

```text
anime style visual novel background art, wide airport baggage claim hall with several empty luggage carousels, metal conveyor belts, rows of empty luggage carts, blank overhead screens, tall windows, gray carpet, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L003 搭計程車進城（ch01）

`assets/bg/L003.webp`，seed 3057445921

```text
anime style visual novel background art, interior of a taxi seen from the back seat, beige leather seats, empty driver seat, a small pine air freshener hanging from the mirror, city skyline and harbor through the windshield, late morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L004 飯店入住（ch01）

`assets/bg/L004.webp`，seed 3074223540

```text
anime style visual novel background art, small cozy hotel lobby with a wooden front desk, a brass service bell, a key rack with old brass keys, a potted fern, warm table lamps, soft red carpet, afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L005 第一杯咖啡（ch01）

`assets/bg/L005.webp`，seed 3091001159

```text
anime style visual novel background art, cozy small café interior with a wooden counter, a shiny espresso machine, a glass pastry case with croissants, hanging pendant lights, a blank chalkboard wall, morning sunlight through the window, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L006 問路（ch01）

`assets/bg/L006.webp`，seed 3107778778

```text
anime style visual novel background art, quiet street corner in a small harbor town, red brick shops with plain awnings, a zebra crosswalk, an old iron lamppost, a wooden bench under a maple tree, blue sky, late morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L007 便利商店（ch01）

`assets/bg/L007.webp`，seed 3124556397

```text
anime style visual novel background art, small convenience store interior at night, narrow aisles with snacks and drinks in plain packaging, glass-door fridges, a checkout counter with a card reader, bright fluorescent lights, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L008 辦手機門號（ch01）

`assets/bg/L008.webp`，seed 2872892112

```text
anime style visual novel background art, bright small phone shop interior, white counter with demo phones showing blank screens, wall shelves of colorful phone cases, two tall stools, a potted plant, clean modern lighting, afternoon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L009 室友初見面（ch01）

`assets/bg/L009.webp`，seed 2889669731

```text
anime style visual novel background art, front steps of a small shared apartment on a quiet residential street, green wooden door with a brass knocker, a plain doormat, potted herbs by the steps, a bicycle against the wall, afternoon sun, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L010 三個魔法詞（ch01）

`assets/bg/L010.webp`，seed 3107925873

```text
anime style visual novel background art, inside an empty city bus, rows of blue fabric seats, yellow handrails and hanging straps, large windows showing a sunny harbor street, rubber floor, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L011 超市採買（ch02）

`assets/bg/L011.webp`，seed 3091148254

```text
anime style visual novel background art, large bright supermarket aisle with long shelves of plain colorful cans and boxes, an empty shopping cart, polished floor, fluorescent ceiling lights, weekend morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L012 麵包店（ch02）

`assets/bg/L012.webp`，seed 3074370635

```text
anime style visual novel background art, cozy neighborhood bakery with wooden shelves of fresh bread loaves, a glass display case of croissants and pies, warm hanging lamps, plain flour sacks in the corner, early morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L013 公車儲值卡（ch02）

`assets/bg/L013.webp`，seed 3057593016

```text
anime style visual novel background art, bus station ticket office with a glass service window, a card reader on the counter, rows of metal benches, tiled floor, large windows showing parked blue city buses, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L014 藥局買藥（ch02）

`assets/bg/L014.webp`，seed 3175036349

```text
anime style visual novel background art, small neighborhood pharmacy with white shelves of plain unmarked boxes, a clean consultation counter, a small potted plant, glass front door, bright clean lighting, afternoon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L015 自助洗衣（ch02）

`assets/bg/L015.webp`，seed 3158258730

```text
anime style visual novel background art, bright laundromat with a long row of front-loading washing machines, stacked dryers, a wooden folding table, empty plastic laundry baskets, checkered floor, sunny Sunday afternoon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L016 寄包裹回家（ch02）

`assets/bg/L016.webp`，seed 3141481111

```text
anime style visual novel background art, small town post office with a long wooden service counter, a parcel scale, stacks of plain brown cardboard boxes, rolls of packing tape, a wall of brass mailboxes, soft morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L017 試穿衣服（ch02）

`assets/bg/L017.webp`，seed 3124703492

```text
anime style visual novel background art, bright clothing store with racks of winter jackets and sweaters, wooden display tables of folded scarves, a tall standing mirror, fitting room curtains at the back, afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L018 速食點餐（ch02）

`assets/bg/L018.webp`，seed 2973704921

```text
anime style visual novel background art, busy fast food restaurant with a long stainless steel order counter, a pickup area with plastic trays, red booth seats, a drink fountain machine, harbor view through big windows, noon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L019 剪頭髮（ch02）

`assets/bg/L019.webp`，seed 2956927302

```text
anime style visual novel background art, classic small barbershop with a single leather barber chair, a large wall mirror, a shelf of plain unlabeled bottles, a striped barber pole by the window, black and white tiled floor, late morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L020 開銀行帳戶（ch02）

`assets/bg/L020.webp`，seed 3208738682

```text
anime style visual novel background art, quiet modern bank branch with a private desk for customer meetings, two chairs, a computer monitor, a small potted plant, glass partitions, light wood floor, calm afternoon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L021 註冊報到（ch03）

`assets/bg/L021.webp`，seed 3225516301

```text
anime style visual novel background art, small school enrollment office with a long wooden counter, a computer monitor, neat stacks of blank forms, a potted plant, a row of waiting chairs, sunny morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L022 第一堂課（ch03）

`assets/bg/L022.webp`，seed 3175183444

```text
anime style visual novel background art, bright language school classroom with desks arranged in a circle, a clean whiteboard, large windows, potted plants on the windowsill, a bookshelf in the corner, morning sunlight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L023 認識 Leo（ch03）

`assets/bg/L023.webp`，seed 3191961063

```text
anime style visual novel background art, quiet school courtyard with wooden benches under a large maple tree, a small stone fountain, brick walls covered with ivy, a bike rack, warm afternoon sunlight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L024 請教老師（ch03）

`assets/bg/L024.webp`，seed 3141628206

```text
anime style visual novel background art, empty classroom after class with chairs pushed in, a wiped clean whiteboard, a teacher's desk with a coffee mug and a stack of papers, late afternoon light through the windows, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L025 圖書館借書（ch03）

`assets/bg/L025.webp`，seed 3158405825

```text
anime style visual novel background art, quiet school library with tall wooden bookshelves, a front desk with a computer and a returned books cart, reading tables with green lamps, soft afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L026 學生餐廳（ch03）

`assets/bg/L026.webp`，seed 3108072968

```text
anime style visual novel background art, busy school cafeteria with a long serving counter, steaming metal food trays behind glass, stacks of plastic lunch trays, round tables with chairs, bright noon light from tall windows, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L027 分組作業（ch03）

`assets/bg/L027.webp`，seed 3124850587

```text
anime style visual novel background art, small study room with a round table, three chairs, a laptop, colorful blank sticky notes scattered on the table, a whiteboard wiped clean, warm afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L028 遲到了（ch03）

`assets/bg/L028.webp`，seed 3074517730

```text
anime style visual novel background art, classroom on a rainy morning with rows of desks, a whiteboard wiped clean, wet umbrellas leaning by the door, rain streaking down the tall windows, gray soft light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L029 社團博覽會（ch03）

`assets/bg/L029.webp`，seed 3091295349

```text
anime style visual novel background art, school gym set up for a club fair, rows of folding tables, a table with a small tent, coiled ropes and a pair of hiking boots, colorful balloons, bright daylight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L030 考前讀書會（ch03）

`assets/bg/L030.webp`，seed 625235619

```text
anime style visual novel background art, library study room at night with a long table, open textbooks, highlighters and coffee cups, a desk lamp glowing warmly, dark windows, quiet cozy atmosphere, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L031 週末邀約（ch04）

`assets/bg/L031.webp`，seed 608458000

```text
anime style visual novel background art, bright student lounge at a language school with colorful beanbags, a long wooden table, potted plants, tall windows showing green trees, late afternoon sunlight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L032 婉拒邀約（ch04）

`assets/bg/L032.webp`，seed 658790857

```text
anime style visual novel background art, empty language school classroom after class with rows of wooden desks, a blank whiteboard, chairs pushed in, a potted plant on the windowsill, warm evening light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L033 家庭派對（ch04）

`assets/bg/L033.webp`，seed 642013238

```text
anime style visual novel background art, cozy apartment living room at night with warm string lights, a sofa with colorful cushions, a low table with bowls of chips and paper cups, a record player, potted plants, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L034 聊天氣（ch04）

`assets/bg/L034.webp`，seed 692346095

```text
anime style visual novel background art, quiet neighborhood bus stop on a sunny morning, glass shelter with a wooden bench, maple trees with red leaves, wet sidewalk after rain, clear blue sky, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L035 稱讚別人（ch04）

`assets/bg/L035.webp`，seed 675568476

```text
anime style visual novel background art, small shared apartment kitchen in the evening, wooden table set with two plates of creamy pasta, a pot on the stove, warm pendant lights, herbs growing on the windowsill, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L036 看電影（ch04）

`assets/bg/L036.webp`，seed 725901333

```text
anime style visual novel background art, movie theater lobby at night with a red carpet, a popcorn stand, a ticket counter with blank screens, warm golden lights, velvet rope barriers, empty and quiet, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L037 Mia 的生日（ch04）

`assets/bg/L037.webp`，seed 709123714

```text
anime style visual novel background art, apartment living room at night decorated with balloons, plain paper garlands, a plain white birthday cake with candles on the table, wrapped gifts, warm string lights, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L038 講電話（ch04）

`assets/bg/L038.webp`，seed 759456571

```text
anime style visual novel background art, small apartment bedroom in the evening, a desk by the window with a glowing desk lamp, a cup of tea, a brown leather wallet on the desk, city lights outside, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L039 臨時改期（ch04）

`assets/bg/L039.webp`，seed 742678952

```text
anime style visual novel background art, small corner café downtown in the afternoon, wooden tables and chairs, a long counter with an espresso machine, hanging plants, large windows, golden sunlight on the floor, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L040 道歉和好（ch04）

`assets/bg/L040.webp`，seed 726048428

```text
anime style visual novel background art, lakeside park in the late afternoon, an empty wooden bench, paper lanterns hanging in the trees, calm water, fallen maple leaves on the path, orange sunset sky, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L041 買火車票（ch05）

`assets/bg/L041.webp`，seed 742826047

```text
anime style visual novel background art, old train station ticket hall, wooden ticket counter with a glass window, brass railings, tall arched windows, wooden benches, polished stone floor, soft morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L042 青年旅館（ch05）

`assets/bg/L042.webp`，seed 759603666

```text
anime style visual novel background art, cozy hostel reception area, wooden front desk with a small bell, wall of cubby shelves, colorful beanbags, string lights, potted plants, large window facing a harbor, afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L043 城市導覽（ch05）

`assets/bg/L043.webp`，seed 776381285

```text
anime style visual novel background art, old harbor town street with a white stone lighthouse at the end, cobblestone path, colorful wooden houses, iron lamp posts, fishing boats in the water, bright morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L044 行李遺失（ch05）

`assets/bg/L044.webp`，seed 658937952

```text
anime style visual novel background art, small hostel luggage storage room, metal shelves with numbered cubbies, one empty shelf space, a few backpacks and suitcases, wooden floor, warm ceiling lamp, evening, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L045 餐廳訂位（ch05）

`assets/bg/L045.webp`，seed 675715571

```text
anime style visual novel background art, busy seafood restaurant entrance by a pier, host stand with a closed reservation book, ship lanterns, rope decorations, wooden tables inside, outdoor terrace with sea view, midday, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L046 參觀博物館（ch05）

`assets/bg/L046.webp`，seed 692493190

```text
anime style visual novel background art, maritime museum hall, large wooden ship model in a glass case, brass ship wheel on display, rope barriers, high ceiling with skylight, polished wooden floor, rainy afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L047 請人拍照（ch05）

`assets/bg/L047.webp`，seed 709270809

```text
anime style visual novel background art, hilltop viewpoint with a wooden railing, wide view of a harbor town and sea at sunset, orange and pink sky, wildflowers, a bench, gentle golden light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L048 市集買紀念品（ch05）

`assets/bg/L048.webp`，seed 860269380

```text
anime style visual novel background art, outdoor harbor market stall with a striped canvas roof, wooden table covered with sea-glass jewelry and keychains in small baskets, fishing nets, boats in the water behind, sunny morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L049 錯過末班車（ch05）

`assets/bg/L049.webp`，seed 877046999

```text
anime style visual novel background art, small 24-hour convenience store at night, bright fluorescent lights, snack shelves, drink coolers, coffee machine, counter by the window, dark empty street and bus shelter outside, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L050 班機延誤（ch05）

`assets/bg/L050.webp`，seed 826861237

```text
anime style visual novel background art, small airport check-in hall, airline counter with a baggage scale, rows of gray seats, large windows showing a runway and a parked plane, rainy gray sky, quiet afternoon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L051 看房子（ch06）

`assets/bg/L051.webp`，seed 810083618

```text
anime style visual novel background art, small empty studio apartment with wooden floor, single bed frame, compact kitchenette, old white radiator heater under a large window, bare white walls, warm afternoon sunlight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L052 簽租約（ch06）

`assets/bg/L052.webp`，seed 793305999

```text
anime style visual novel background art, cozy old-fashioned living room with a low wooden coffee table, a few blank sheets of paper and a pen, a teapot with two cups, floral sofa, warm lamp light, afternoon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L053 報修（ch06）

`assets/bg/L053.webp`，seed 776528380

```text
anime style visual novel background art, small studio apartment on a cold winter night, frosty window, old white radiator heater under the window, bed with a thick wool blanket, mug on a wooden desk, dim cool blue light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L054 吵鬧的鄰居（ch06）

`assets/bg/L054.webp`，seed 759750761

```text
anime style visual novel background art, narrow apartment building hallway at night, plain wooden doors, warm wall lamps, patterned carpet runner, a potted plant in the corner, soft yellow light, quiet atmosphere, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L055 網路安裝（ch06）

`assets/bg/L055.webp`，seed 742973142

```text
anime style visual novel background art, small tidy studio apartment, wooden desk by the window with a closed laptop and a small router with blinking lights, a single bed with a gray blanket, soft afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L056 預約看診（ch06）

`assets/bg/L056.webp`，seed 726195523

```text
anime style visual novel background art, small family clinic reception area, light wood front desk, a row of padded waiting chairs, potted plants by the window, pale green walls, bright morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L057 描述症狀（ch06）

`assets/bg/L057.webp`，seed 709417904

```text
anime style visual novel background art, small clean doctor's exam room, padded exam table with a white paper cover, a rolling stool, a small sink and wooden cabinets, window with half-open blinds, calm soft daylight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L058 掉了錢包（ch06）

`assets/bg/L058.webp`，seed 961082189

```text
anime style visual novel background art, quiet small police station lobby, long wooden front counter with a stack of blank forms and a pen holder, plastic chairs along a pale blue wall, bright overhead lights, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L059 退換貨（ch06）

`assets/bg/L059.webp`，seed 944304570

```text
anime style visual novel background art, bright home goods store customer service counter, white countertop, shelves of kitchen appliances and colorful mixing bowls behind it, polished floor, warm overhead lights, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L060 帳單有誤（ch06）

`assets/bg/L060.webp`，seed 927674046

```text
anime style visual novel background art, small studio apartment kitchen table in the evening, an open envelope, a blank sheet of paper, a calculator and a mug of tea, warm desk lamp light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L061 就業博覽會（ch07）

`assets/bg/L061.webp`，seed 944451665

```text
anime style visual novel background art, large convention hall with rows of company booths, blank display boards, tables with stacks of brochures with blank covers, carpeted aisles, bright overhead lights, daytime, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L062 請教履歷（ch07）

`assets/bg/L062.webp`，seed 894118808

```text
anime style visual novel background art, small career advice office at a language school, wooden desk with a laptop and loose blank papers, shelf of plain binders, potted plant, window with soft afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L063 電話初篩（ch07）

`assets/bg/L063.webp`，seed 910896427

```text
anime style visual novel background art, small studio apartment with a single bed, a desk with a laptop and a coffee mug, a bookshelf with plain spines, a window over a quiet street, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L064 面試自我介紹（ch07）

`assets/bg/L064.webp`，seed 994784522

```text
anime style visual novel background art, modern office meeting room with warm pendant lamps over a long wooden table, glass wall facing an open office, potted plants, water glasses on a tray, afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L065 談優缺點（ch07）

`assets/bg/L065.webp`，seed 1011562141

```text
anime style visual novel background art, bright meeting room with a long wooden table, an open notepad and a glass of water, warm pendant lamps overhead, glass wall, late afternoon sunlight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L066 情境題（ch07）

`assets/bg/L066.webp`，seed 961229284

```text
anime style visual novel background art, meeting room with a clean whiteboard, a long wooden table with a notepad and a pen, warm pendant lamps, glass wall facing an open office, golden afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L067 反問面試官（ch07）

`assets/bg/L067.webp`，seed 978006903

```text
anime style visual novel background art, meeting room with a long wooden table, two chairs facing each other, a closed notepad, warm pendant lamps glowing, glass wall, soft early evening light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L068 談薪水（ch07）

`assets/bg/L068.webp`，seed 793453094

```text
anime style visual novel background art, bright conference room with a round wooden table, a closed folder, two coffee cups and a water jug, warm pendant lights, glass wall overlooking harbor rooftops, morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L069 面試後追蹤（ch07）

`assets/bg/L069.webp`，seed 810230713

```text
anime style visual novel background art, small studio apartment with a desk by the window, an open laptop, a phone charger and a closed notebook, a potted plant on the sill, rainy afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L070 錄取通知（ch07）

`assets/bg/L070.webp`，seed 3176022087

```text
anime style visual novel background art, seaside park path with a wooden bench, a takeaway coffee cup on the bench, calm harbor water, tall trees with swaying leaves, late afternoon golden light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L071 上班第一天（ch08）

`assets/bg/L071.webp`，seed 3159244468

```text
anime style visual novel background art, bright modern office reception area with a wooden front desk, pendant lights in different shapes, potted plants, glass entrance doors, soft morning sunlight, polished concrete floor, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L072 團隊會議（ch08）

`assets/bg/L072.webp`，seed 3209577325

```text
anime style visual novel background art, small modern meeting room with a long wooden table, rolling chairs, a blank whiteboard, warm pendant lamps, coffee cups on the table, large window with a city view, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L073 確認需求（ch08）

`assets/bg/L073.webp`，seed 3192799706

```text
anime style visual novel background art, manager's private office with a tidy wooden desk, a desk lamp with a curved arm, a laptop with a blank screen, a bookshelf with plain binders, a large window, afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L074 請同事幫忙（ch08）

`assets/bg/L074.webp`，seed 3108911611

```text
anime style visual novel background art, open-plan office with rows of white desks, desktop monitors with blank screens, small desk plants, smart desk lamps, a pair of headphones on a desk, large windows, late morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L075 委婉表達異議（ch08）

`assets/bg/L075.webp`，seed 3092133992

```text
anime style visual novel background art, glass-walled meeting room with a round wooden table, several pendant lamp samples hanging low, a few loose amber bulbs, closed notebooks and pens, a potted fern, soft afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L076 申請延期（ch08）

`assets/bg/L076.webp`，seed 3142466849

```text
anime style visual novel background art, office hallway outside a manager's room, a glass door half open, a wooden desk and a desk lamp visible inside, a potted plant in the corner, framed abstract art, late afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L077 接受回饋（ch08）

`assets/bg/L077.webp`，seed 3125689230

```text
anime style visual novel background art, small quiet meeting room for one-on-one talks, two armchairs facing each other, a low coffee table with two mugs, a floor lamp with a warm glow, a window with blinds half closed, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L078 代接電話（ch08）

`assets/bg/L078.webp`，seed 3041801135

```text
anime style visual novel background art, office desk with a desk phone with a blank display, a blank notepad and a pen, a closed laptop, a coffee mug, an empty office chair pushed back, a window with soft midday light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L079 和主管午餐（ch08）

`assets/bg/L079.webp`，seed 3025023516

```text
anime style visual novel background art, cozy bistro interior with exposed brick walls, Edison bulb pendant lights, a small wooden table set for two with two plates of pasta and water glasses, a window with afternoon sunlight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L080 進度報告（ch08）

`assets/bg/L080.webp`，seed 589856000

```text
anime style visual novel background art, large meeting room with a long white table, a wall screen showing a blank slide, rows of grey chairs, smart pendant lamps overhead, a window wall with a city view, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L081 拜訪客戶（ch09）

`assets/bg/L081.webp`，seed 606633619

```text
anime style visual novel background art, elegant hotel executive office with a wide window overlooking a harbor, polished wooden desk, two leather armchairs, potted orchid, warm pendant lights, soft morning sunlight, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L082 產品簡報（ch09）

`assets/bg/L082.webp`，seed 623411238

```text
anime style visual novel background art, modern cafe company meeting room with a long reclaimed wood table, exposed brick wall, hanging edison bulbs, large industrial windows, potted plants, blank wall screen, afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L083 處理異議（ch09）

`assets/bg/L083.webp`，seed 640188857

```text
anime style visual novel background art, modern cafe company meeting room with a long reclaimed wood table, two coffee cups, exposed brick wall, hanging edison bulbs, large industrial windows, gray rainy afternoon, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L084 議價談判（ch09）

`assets/bg/L084.webp`，seed 656966476

```text
anime style visual novel background art, bright corporate conference room with a glass wall, oval white table, six gray office chairs, a water pitcher and glasses, modern pendant lights, city view through tall windows, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L085 客訴處理（ch09）

`assets/bg/L085.webp`，seed 673744095

```text
anime style visual novel background art, open-plan sales office with rows of white desks, desk phones, blank computer monitors, rolling chairs, potted plants, tall windows with overcast midday light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L086 傳達壞消息（ch09）

`assets/bg/L086.webp`，seed 690521714

```text
anime style visual novel background art, grand hotel lobby under renovation, marble floor partly covered with protective sheets, ladders, empty ceiling fixture mounts, tall arched windows, stacked plain cardboard boxes, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L087 商務交流會（ch09）

`assets/bg/L087.webp`，seed 707299333

```text
anime style visual novel background art, hotel ballroom set up for an evening networking event, round high cocktail tables with white cloths, sparkling chandeliers, long buffet table with finger food, empty stage, warm golden lighting, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L088 簡報問答（ch09）

`assets/bg/L088.webp`，seed 724076952

```text
anime style visual novel background art, conference seminar room with rows of padded chairs, small podium with a microphone, blank projection screen, water bottles on a side table, soft ceiling spotlights, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L089 文化誤會（ch09）

`assets/bg/L089.webp`，seed 740854571

```text
anime style visual novel background art, modern lighting showroom with rows of glowing pendant lamps, sample fixtures on white display shelves, a small round meeting table with two chairs, polished concrete floor, late morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L090 商務晚宴（ch09）

`assets/bg/L090.webp`，seed 2838204041

```text
anime style visual novel background art, private dining room of an upscale seafood restaurant, round table with white cloth and a glass lazy susan, warm pendant lights, large window over a night harbor, evening, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L091 給新人建議（ch10）

`assets/bg/L091.webp`，seed 2821426422

```text
anime style visual novel background art, lakeside park clearing at early evening, a crackling campfire in a stone ring, wooden log benches around it, string lights between maple trees, calm lake beyond, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L092 調解朋友爭執（ch10）

`assets/bg/L092.webp`，seed 2804648803

```text
anime style visual novel background art, cozy café interior on a quiet afternoon, wooden tables with mismatched chairs, potted plants on the windowsill, warm pendant lamps, rain-streaked front window, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L093 安慰朋友（ch10）

`assets/bg/L093.webp`，seed 2787871184

```text
anime style visual novel background art, quiet bench under a large tree outside a brick school building, fallen leaves on the path, empty bike rack nearby, soft late afternoon light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L094 鄭重道歉（ch10）

`assets/bg/L094.webp`，seed 2905314517

```text
anime style visual novel background art, manager's office with a tidy wooden desk, two chairs facing it, a desk lamp, potted plant in the corner, glass wall facing an open-plan office, morning, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L095 請求推薦信（ch10）

`assets/bg/L095.webp`，seed 2888536898

```text
anime style visual novel background art, manager's office in the afternoon, wooden desk with a closed laptop and a coffee mug, bookshelf with binders, potted plant, warm sunlight through blinds, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L096 營火辯論（ch10）

`assets/bg/L096.webp`，seed 2871759279

```text
anime style visual novel background art, lakeside campfire circle at night, a large bonfire in a stone ring, log benches arranged in a circle, string lights in maple trees, dark calm lake with distant shore lights, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L097 告別致詞（ch10）

`assets/bg/L097.webp`，seed 2854981660

```text
anime style visual novel background art, office meeting room set up for a small party, long table with snacks, paper cups and a cake on a tray, balloons tied to chairs, large windows with an evening city view, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L098 退租交屋（ch10）

`assets/bg/L098.webp`，seed 2972424993

```text
anime style visual novel background art, small empty studio apartment, bare walls with a few tiny nail holes, clean wooden floor, old radiator heater under the window, plain taped cardboard boxes by the door, morning light, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L099 最後的夜晚（ch10）

`assets/bg/L099.webp`，seed 2955647374

```text
anime style visual novel background art, long empty wooden pier at night stretching over calm water, warm lamp posts along the railing, a bench at the far end, starry sky, distant harbor lights, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

### L100 最後的營火（ch10）

`assets/bg/L100.webp`，seed 299113267

```text
anime style visual novel background art, empty lakeside campfire circle at dusk, a warm bonfire in a stone ring, log benches in a circle, paper lanterns hanging in maple branches, golden sunset over a calm lake, 2D illustration, detailed background, soft cinematic lighting, high quality, no people, no characters, empty scene, blank signs, plain unmarked surfaces
```

## 角色立繪（274 張，640x960）

負面提示詞：

```text
blurry, ugly, bad quality, lowres, realistic, 3D, photo, deformed, extra limbs, extra fingers, bad anatomy, bad hands, (text:1.5), (letters:1.5), (writing:1.5), (words:1.5), watermark, signature, caption, typography, font, label, subtitle, title, number, digit, kanji, chinese characters, japanese text, korean text, CJK, hieroglyphs, inscription, printed text, handwritten text, logo text, characters on surface, complex background, scenery, multiple people, cropped head
```

### Ember 安柏（ember，seed 1690060644）

- `assets/char/ember_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long dark brown hair in a loose side braid, warm amber eyes, orange plaid flannel shirt over a cream knit sweater, small leaf-shaped pendant necklace, gentle confident mentor vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/ember_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long dark brown hair in a loose side braid, warm amber eyes, orange plaid flannel shirt over a cream knit sweater, small leaf-shaped pendant necklace, gentle confident mentor vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/ember_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long dark brown hair in a loose side braid, warm amber eyes, orange plaid flannel shirt over a cream knit sweater, small leaf-shaped pendant necklace, gentle confident mentor vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/ember_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long dark brown hair in a loose side braid, warm amber eyes, orange plaid flannel shirt over a cream knit sweater, small leaf-shaped pendant necklace, gentle confident mentor vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mia 米亞（mia，seed 2559812134）

- `assets/char/mia_neutral.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, short wavy black bob hair with a small yellow hair clip, bright cheerful eyes, oversized pastel mint hoodie, silver hoop earrings, energetic friendly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/mia_happy.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, short wavy black bob hair with a small yellow hair clip, bright cheerful eyes, oversized pastel mint hoodie, silver hoop earrings, energetic friendly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/mia_upset.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, short wavy black bob hair with a small yellow hair clip, bright cheerful eyes, oversized pastel mint hoodie, silver hoop earrings, energetic friendly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/mia_confused.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, short wavy black bob hair with a small yellow hair clip, bright cheerful eyes, oversized pastel mint hoodie, silver hoop earrings, energetic friendly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Leo 里歐（leo，seed 250929599）

- `assets/char/leo_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, messy black hair, round black-framed glasses, light blue denim jacket over a white t-shirt, canvas backpack strap on one shoulder, laid-back easygoing vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/leo_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, messy black hair, round black-framed glasses, light blue denim jacket over a white t-shirt, canvas backpack strap on one shoulder, laid-back easygoing vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/leo_upset.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, messy black hair, round black-framed glasses, light blue denim jacket over a white t-shirt, canvas backpack strap on one shoulder, laid-back easygoing vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/leo_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, messy black hair, round black-framed glasses, light blue denim jacket over a white t-shirt, canvas backpack strap on one shoulder, laid-back easygoing vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Lin 林先生（mr_lin，seed 3929163142）

- `assets/char/mr_lin_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his late 50s, short gray hair, neat gray mustache, beige cardigan over a checked collared shirt, reading glasses hanging on a cord, strict but kind landlord vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/mr_lin_happy.webp`

  ```text
  anime style visual novel character sprite, man in his late 50s, short gray hair, neat gray mustache, beige cardigan over a checked collared shirt, reading glasses hanging on a cord, strict but kind landlord vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/mr_lin_upset.webp`

  ```text
  anime style visual novel character sprite, man in his late 50s, short gray hair, neat gray mustache, beige cardigan over a checked collared shirt, reading glasses hanging on a cord, strict but kind landlord vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/mr_lin_confused.webp`

  ```text
  anime style visual novel character sprite, man in his late 50s, short gray hair, neat gray mustache, beige cardigan over a checked collared shirt, reading glasses hanging on a cord, strict but kind landlord vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ms. Wong 王經理（ms_wong，seed 3891148287）

- `assets/char/ms_wong_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, sleek black shoulder-length hair tucked behind one ear, thin gold-rimmed glasses, tailored charcoal blazer over a white silk blouse, small pearl earrings, sharp professional manager vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/ms_wong_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, sleek black shoulder-length hair tucked behind one ear, thin gold-rimmed glasses, tailored charcoal blazer over a white silk blouse, small pearl earrings, sharp professional manager vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/ms_wong_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, sleek black shoulder-length hair tucked behind one ear, thin gold-rimmed glasses, tailored charcoal blazer over a white silk blouse, small pearl earrings, sharp professional manager vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/ms_wong_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, sleek black shoulder-length hair tucked behind one ear, thin gold-rimmed glasses, tailored charcoal blazer over a white silk blouse, small pearl earrings, sharp professional manager vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Sam 山姆（sam，seed 3030819580）

- `assets/char/sam_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his late 20s, short undercut black hair, light stubble, rolled-up sleeves on a navy button-down shirt, lanyard with employee badge, smartwatch, friendly helpful coworker vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/sam_happy.webp`

  ```text
  anime style visual novel character sprite, man in his late 20s, short undercut black hair, light stubble, rolled-up sleeves on a navy button-down shirt, lanyard with employee badge, smartwatch, friendly helpful coworker vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/sam_upset.webp`

  ```text
  anime style visual novel character sprite, man in his late 20s, short undercut black hair, light stubble, rolled-up sleeves on a navy button-down shirt, lanyard with employee badge, smartwatch, friendly helpful coworker vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/sam_confused.webp`

  ```text
  anime style visual novel character sprite, man in his late 20s, short undercut black hair, light stubble, rolled-up sleeves on a navy button-down shirt, lanyard with employee badge, smartwatch, friendly helpful coworker vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Officer Park 朴警官（c01_officer，seed 3245993828）

- `assets/char/c01_officer_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his 40s, neatly combed short black hair, navy blue immigration officer uniform with shoulder patches and a badge, serious but fair look, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_officer_happy.webp`

  ```text
  anime style visual novel character sprite, man in his 40s, neatly combed short black hair, navy blue immigration officer uniform with shoulder patches and a badge, serious but fair look, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_officer_upset.webp`

  ```text
  anime style visual novel character sprite, man in his 40s, neatly combed short black hair, navy blue immigration officer uniform with shoulder patches and a badge, serious but fair look, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_officer_confused.webp`

  ```text
  anime style visual novel character sprite, man in his 40s, neatly combed short black hair, navy blue immigration officer uniform with shoulder patches and a badge, serious but fair look, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Grace 葛蕾絲（c01_airport_staff，seed 2899760100）

- `assets/char/c01_airport_staff_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a neat low bun, bright orange high-visibility vest over a navy uniform shirt, walkie-talkie clipped to one shoulder, efficient helpful vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_airport_staff_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a neat low bun, bright orange high-visibility vest over a navy uniform shirt, walkie-talkie clipped to one shoulder, efficient helpful vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_airport_staff_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a neat low bun, bright orange high-visibility vest over a navy uniform shirt, walkie-talkie clipped to one shoulder, efficient helpful vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_airport_staff_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a neat low bun, bright orange high-visibility vest over a navy uniform shirt, walkie-talkie clipped to one shoulder, efficient helpful vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Dan 丹（c01_traveler，seed 2382043621）

- `assets/char/c01_traveler_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 30s, short tidy black hair, light gray business suit with a loosened tie, black travel neck pillow around his neck, tired but polite traveler vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_traveler_happy.webp`

  ```text
  anime style visual novel character sprite, man in his mid 30s, short tidy black hair, light gray business suit with a loosened tie, black travel neck pillow around his neck, tired but polite traveler vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_traveler_upset.webp`

  ```text
  anime style visual novel character sprite, man in his mid 30s, short tidy black hair, light gray business suit with a loosened tie, black travel neck pillow around his neck, tired but polite traveler vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_traveler_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 30s, short tidy black hair, light gray business suit with a loosened tie, black travel neck pillow around his neck, tired but polite traveler vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Frank 法蘭克（c01_taxi_driver，seed 4196695965）

- `assets/char/c01_taxi_driver_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 50s, short salt-and-pepper hair, gray flat cap, short-sleeved blue plaid shirt, wooden bead bracelet, chatty easygoing driver vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_taxi_driver_happy.webp`

  ```text
  anime style visual novel character sprite, man in his mid 50s, short salt-and-pepper hair, gray flat cap, short-sleeved blue plaid shirt, wooden bead bracelet, chatty easygoing driver vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_taxi_driver_upset.webp`

  ```text
  anime style visual novel character sprite, man in his mid 50s, short salt-and-pepper hair, gray flat cap, short-sleeved blue plaid shirt, wooden bead bracelet, chatty easygoing driver vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_taxi_driver_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 50s, short salt-and-pepper hair, gray flat cap, short-sleeved blue plaid shirt, wooden bead bracelet, chatty easygoing driver vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Hannah 漢娜（c01_receptionist，seed 1919488613）

- `assets/char/c01_receptionist_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 20s, long straight black hair in a high ponytail, dark green hotel uniform blazer over a white blouse, small gold leaf-shaped pin on the lapel, neat polite vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_receptionist_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 20s, long straight black hair in a high ponytail, dark green hotel uniform blazer over a white blouse, small gold leaf-shaped pin on the lapel, neat polite vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_receptionist_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 20s, long straight black hair in a high ponytail, dark green hotel uniform blazer over a white blouse, small gold leaf-shaped pin on the lapel, neat polite vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_receptionist_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 20s, long straight black hair in a high ponytail, dark green hotel uniform blazer over a white blouse, small gold leaf-shaped pin on the lapel, neat polite vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Jay 阿傑（c01_barista，seed 4277979860）

- `assets/char/c01_barista_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 20s, short black hair with a slight curl on top, brown canvas barista apron over a white t-shirt, small silver earring, pencil tucked behind one ear, relaxed friendly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_barista_happy.webp`

  ```text
  anime style visual novel character sprite, man in his mid 20s, short black hair with a slight curl on top, brown canvas barista apron over a white t-shirt, small silver earring, pencil tucked behind one ear, relaxed friendly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_barista_upset.webp`

  ```text
  anime style visual novel character sprite, man in his mid 20s, short black hair with a slight curl on top, brown canvas barista apron over a white t-shirt, small silver earring, pencil tucked behind one ear, relaxed friendly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_barista_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 20s, short black hair with a slight curl on top, brown canvas barista apron over a white t-shirt, small silver earring, pencil tucked behind one ear, relaxed friendly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mrs. Lee 李太太（c01_local，seed 2847629957）

- `assets/char/c01_local_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short curly gray hair, round tortoiseshell glasses, lavender cardigan over a floral blouse, holding a red dog leash, kind grandmotherly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_local_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short curly gray hair, round tortoiseshell glasses, lavender cardigan over a floral blouse, holding a red dog leash, kind grandmotherly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_local_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short curly gray hair, round tortoiseshell glasses, lavender cardigan over a floral blouse, holding a red dog leash, kind grandmotherly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_local_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short curly gray hair, round tortoiseshell glasses, lavender cardigan over a floral blouse, holding a red dog leash, kind grandmotherly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Tom 湯姆（c01_clerk，seed 1108849267）

- `assets/char/c01_clerk_neutral.webp`

  ```text
  anime style visual novel character sprite, young man around 20, short spiky black hair, black beanie, dark green store polo shirt under an open gray zip hoodie, laid-back vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_clerk_happy.webp`

  ```text
  anime style visual novel character sprite, young man around 20, short spiky black hair, black beanie, dark green store polo shirt under an open gray zip hoodie, laid-back vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_clerk_upset.webp`

  ```text
  anime style visual novel character sprite, young man around 20, short spiky black hair, black beanie, dark green store polo shirt under an open gray zip hoodie, laid-back vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_clerk_confused.webp`

  ```text
  anime style visual novel character sprite, young man around 20, short spiky black hair, black beanie, dark green store polo shirt under an open gray zip hoodie, laid-back vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Lily 莉莉（c01_phone_clerk，seed 701573448）

- `assets/char/c01_phone_clerk_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, chin-length black bob with straight bangs, crisp white shirt with a teal scarf, holding a phone in a sparkly case, upbeat tech-savvy vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_phone_clerk_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, chin-length black bob with straight bangs, crisp white shirt with a teal scarf, holding a phone in a sparkly case, upbeat tech-savvy vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_phone_clerk_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, chin-length black bob with straight bangs, crisp white shirt with a teal scarf, holding a phone in a sparkly case, upbeat tech-savvy vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_phone_clerk_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, chin-length black bob with straight bangs, crisp white shirt with a teal scarf, holding a phone in a sparkly case, upbeat tech-savvy vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Max 麥克斯（c01_passenger，seed 3535590822）

- `assets/char/c01_passenger_neutral.webp`

  ```text
  anime style visual novel character sprite, tall young man around 19, messy dark brown hair, oversized black hoodie, large white over-ear headphones around his neck, straps of a giant hiking backpack on both shoulders, sleepy easygoing vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_passenger_happy.webp`

  ```text
  anime style visual novel character sprite, tall young man around 19, messy dark brown hair, oversized black hoodie, large white over-ear headphones around his neck, straps of a giant hiking backpack on both shoulders, sleepy easygoing vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_passenger_upset.webp`

  ```text
  anime style visual novel character sprite, tall young man around 19, messy dark brown hair, oversized black hoodie, large white over-ear headphones around his neck, straps of a giant hiking backpack on both shoulders, sleepy easygoing vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c01_passenger_confused.webp`

  ```text
  anime style visual novel character sprite, tall young man around 19, messy dark brown hair, oversized black hoodie, large white over-ear headphones around his neck, straps of a giant hiking backpack on both shoulders, sleepy easygoing vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ben 班（c02_grocer，seed 917755157）

- `assets/char/c02_grocer_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly brown hair, forest green store apron over a gray t-shirt, pencil tucked behind one ear, sturdy helpful vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_grocer_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly brown hair, forest green store apron over a gray t-shirt, pencil tucked behind one ear, sturdy helpful vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_grocer_upset.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly brown hair, forest green store apron over a gray t-shirt, pencil tucked behind one ear, sturdy helpful vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_grocer_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly brown hair, forest green store apron over a gray t-shirt, pencil tucked behind one ear, sturdy helpful vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Rosa 羅莎（c02_baker，seed 3633572746）

- `assets/char/c02_baker_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, curly auburn hair tied up under a red bandana, flour-dusted white apron over a cream blouse, rolled-up sleeves, warm motherly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_baker_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, curly auburn hair tied up under a red bandana, flour-dusted white apron over a cream blouse, rolled-up sleeves, warm motherly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_baker_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, curly auburn hair tied up under a red bandana, flour-dusted white apron over a cream blouse, rolled-up sleeves, warm motherly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_baker_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, curly auburn hair tied up under a red bandana, flour-dusted white apron over a cream blouse, rolled-up sleeves, warm motherly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Dennis 丹尼斯（c02_agent，seed 4287387698）

- `assets/char/c02_agent_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short neat black hair, thick black-framed glasses, navy blue transit uniform vest over a light blue shirt, lanyard with a transit card, patient steady vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_agent_happy.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short neat black hair, thick black-framed glasses, navy blue transit uniform vest over a light blue shirt, lanyard with a transit card, patient steady vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_agent_upset.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short neat black hair, thick black-framed glasses, navy blue transit uniform vest over a light blue shirt, lanyard with a transit card, patient steady vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_agent_confused.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short neat black hair, thick black-framed glasses, navy blue transit uniform vest over a light blue shirt, lanyard with a transit card, patient steady vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ms. Cho 趙藥師（c02_pharmacist，seed 2186793551）

- `assets/char/c02_pharmacist_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, short layered black hair, white pharmacist coat over a lavender blouse, reading glasses pushed up on her head, calm reassuring vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_pharmacist_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, short layered black hair, white pharmacist coat over a lavender blouse, reading glasses pushed up on her head, calm reassuring vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_pharmacist_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, short layered black hair, white pharmacist coat over a lavender blouse, reading glasses pushed up on her head, calm reassuring vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_pharmacist_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, short layered black hair, white pharmacist coat over a lavender blouse, reading glasses pushed up on her head, calm reassuring vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Doris 桃樂絲（c02_attendant，seed 2524879062）

- `assets/char/c02_attendant_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 70s, short permed silver hair, pink knit cardigan over a floral apron, reading glasses on a beaded chain, chatty neighborly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_attendant_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 70s, short permed silver hair, pink knit cardigan over a floral apron, reading glasses on a beaded chain, chatty neighborly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_attendant_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 70s, short permed silver hair, pink knit cardigan over a floral apron, reading glasses on a beaded chain, chatty neighborly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_attendant_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 70s, short permed silver hair, pink knit cardigan over a floral apron, reading glasses on a beaded chain, chatty neighborly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Gary 蓋瑞（c02_postal，seed 1706284518）

- `assets/char/c02_postal_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, thinning white hair, round wire-rimmed glasses, red post office uniform vest over a white shirt, pen clipped to his chest pocket, patient old-fashioned vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_postal_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, thinning white hair, round wire-rimmed glasses, red post office uniform vest over a white shirt, pen clipped to his chest pocket, patient old-fashioned vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_postal_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, thinning white hair, round wire-rimmed glasses, red post office uniform vest over a white shirt, pen clipped to his chest pocket, patient old-fashioned vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_postal_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, thinning white hair, round wire-rimmed glasses, red post office uniform vest over a white shirt, pen clipped to his chest pocket, patient old-fashioned vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Chloe 克蘿伊（c02_assistant，seed 228040731）

- `assets/char/c02_assistant_neutral.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, long straight light brown hair with curtain bangs, black turtleneck and high-waisted beige trousers, measuring tape draped around her neck, trendy fashion-savvy vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_assistant_happy.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, long straight light brown hair with curtain bangs, black turtleneck and high-waisted beige trousers, measuring tape draped around her neck, trendy fashion-savvy vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_assistant_upset.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, long straight light brown hair with curtain bangs, black turtleneck and high-waisted beige trousers, measuring tape draped around her neck, trendy fashion-savvy vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_assistant_confused.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, long straight light brown hair with curtain bangs, black turtleneck and high-waisted beige trousers, measuring tape draped around her neck, trendy fashion-savvy vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Jake 傑克（c02_cashier，seed 1477834958）

- `assets/char/c02_cashier_neutral.webp`

  ```text
  anime style visual novel character sprite, teenage boy around 18, short spiky black hair, red and yellow fast food uniform with a matching cap, headset microphone, energetic part-timer vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_cashier_happy.webp`

  ```text
  anime style visual novel character sprite, teenage boy around 18, short spiky black hair, red and yellow fast food uniform with a matching cap, headset microphone, energetic part-timer vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_cashier_upset.webp`

  ```text
  anime style visual novel character sprite, teenage boy around 18, short spiky black hair, red and yellow fast food uniform with a matching cap, headset microphone, energetic part-timer vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_cashier_confused.webp`

  ```text
  anime style visual novel character sprite, teenage boy around 18, short spiky black hair, red and yellow fast food uniform with a matching cap, headset microphone, energetic part-timer vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Tony 東尼（c02_barber，seed 3786077963）

- `assets/char/c02_barber_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 30s, slicked-back black hair with a neat fade, trimmed beard, black barber apron over a white t-shirt, small comb tattoo on his forearm, cool confident vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_barber_happy.webp`

  ```text
  anime style visual novel character sprite, man in his mid 30s, slicked-back black hair with a neat fade, trimmed beard, black barber apron over a white t-shirt, small comb tattoo on his forearm, cool confident vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_barber_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 30s, slicked-back black hair with a neat fade, trimmed beard, black barber apron over a white t-shirt, small comb tattoo on his forearm, cool confident vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ms. Song 宋專員（c02_banker，seed 1622355408）

- `assets/char/c02_banker_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, sleek low ponytail, navy blue business suit with a light blue scarf tied at the neck, thin silver watch, polished professional vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_banker_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, sleek low ponytail, navy blue business suit with a light blue scarf tied at the neck, thin silver watch, polished professional vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_banker_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, sleek low ponytail, navy blue business suit with a light blue scarf tied at the neck, thin silver watch, polished professional vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c02_banker_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, sleek low ponytail, navy blue business suit with a light blue scarf tied at the neck, thin silver watch, polished professional vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Diane 黛安（c03_registrar，seed 202583911）

- `assets/char/c03_registrar_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 50s, short curly brown hair with gray streaks, purple cat-eye glasses, lavender cardigan over a white blouse, pencil tucked behind one ear, staff lanyard, warm and efficient office worker vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_registrar_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 50s, short curly brown hair with gray streaks, purple cat-eye glasses, lavender cardigan over a white blouse, pencil tucked behind one ear, staff lanyard, warm and efficient office worker vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_registrar_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 50s, short curly brown hair with gray streaks, purple cat-eye glasses, lavender cardigan over a white blouse, pencil tucked behind one ear, staff lanyard, warm and efficient office worker vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_registrar_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 50s, short curly brown hair with gray streaks, purple cat-eye glasses, lavender cardigan over a white blouse, pencil tucked behind one ear, staff lanyard, warm and efficient office worker vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ms. Reed 瑞德老師（c03_teacher，seed 1686067406）

- `assets/char/c03_teacher_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 30s, shoulder-length chestnut brown hair with a side part, tortoiseshell glasses, mustard yellow cardigan over a navy striped shirt, whiteboard marker clipped to her pocket, kind and lively teacher vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_teacher_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 30s, shoulder-length chestnut brown hair with a side part, tortoiseshell glasses, mustard yellow cardigan over a navy striped shirt, whiteboard marker clipped to her pocket, kind and lively teacher vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_teacher_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 30s, shoulder-length chestnut brown hair with a side part, tortoiseshell glasses, mustard yellow cardigan over a navy striped shirt, whiteboard marker clipped to her pocket, kind and lively teacher vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_teacher_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 30s, shoulder-length chestnut brown hair with a side part, tortoiseshell glasses, mustard yellow cardigan over a navy striped shirt, whiteboard marker clipped to her pocket, kind and lively teacher vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Yuki 由紀（c03_yuki，seed 3399499230）

- `assets/char/c03_yuki_neutral.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, small star-shaped earrings, cream cable-knit sweater with a red plaid scarf, pastel pink notebook held to her chest, sweet cheerful vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_yuki_happy.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, small star-shaped earrings, cream cable-knit sweater with a red plaid scarf, pastel pink notebook held to her chest, sweet cheerful vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_yuki_upset.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, small star-shaped earrings, cream cable-knit sweater with a red plaid scarf, pastel pink notebook held to her chest, sweet cheerful vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_yuki_confused.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, small star-shaped earrings, cream cable-knit sweater with a red plaid scarf, pastel pink notebook held to her chest, sweet cheerful vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Bell 貝爾先生（c03_librarian，seed 3500135008）

- `assets/char/c03_librarian_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neat white hair and a short white beard, half-moon glasses, forest green sweater vest over a light blue shirt, brown bow tie, calm gentle librarian vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_librarian_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neat white hair and a short white beard, half-moon glasses, forest green sweater vest over a light blue shirt, brown bow tie, calm gentle librarian vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_librarian_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neat white hair and a short white beard, half-moon glasses, forest green sweater vest over a light blue shirt, brown bow tie, calm gentle librarian vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_librarian_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neat white hair and a short white beard, half-moon glasses, forest green sweater vest over a light blue shirt, brown bow tie, calm gentle librarian vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Martha 瑪莎（c03_cafeteria，seed 2308250438）

- `assets/char/c03_cafeteria_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 40s, dark hair tied back under a white hairnet, rosy cheeks, white apron over a red polo shirt, large serving ladle in one hand, warm motherly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_cafeteria_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 40s, dark hair tied back under a white hairnet, rosy cheeks, white apron over a red polo shirt, large serving ladle in one hand, warm motherly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_cafeteria_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 40s, dark hair tied back under a white hairnet, rosy cheeks, white apron over a red polo shirt, large serving ladle in one hand, warm motherly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_cafeteria_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 40s, dark hair tied back under a white hairnet, rosy cheeks, white apron over a red polo shirt, large serving ladle in one hand, warm motherly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Noah 諾亞（c03_clubhost，seed 3336432198）

- `assets/char/c03_clubhost_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short tousled dark brown hair, tanned skin, forest green fleece jacket over a gray t-shirt, small compass pendant on a cord, sporty outgoing vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_clubhost_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short tousled dark brown hair, tanned skin, forest green fleece jacket over a gray t-shirt, small compass pendant on a cord, sporty outgoing vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_clubhost_upset.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short tousled dark brown hair, tanned skin, forest green fleece jacket over a gray t-shirt, small compass pendant on a cord, sporty outgoing vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c03_clubhost_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short tousled dark brown hair, tanned skin, forest green fleece jacket over a gray t-shirt, small compass pendant on a cord, sporty outgoing vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Zoe 柔伊（c04_zoe，seed 1365088115）

- `assets/char/c04_zoe_neutral.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, denim overalls over a red striped long-sleeve shirt, small star-shaped earrings, phone in a glittery case, outgoing sociable vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_zoe_happy.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, denim overalls over a red striped long-sleeve shirt, small star-shaped earrings, phone in a glittery case, outgoing sociable vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_zoe_upset.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, denim overalls over a red striped long-sleeve shirt, small star-shaped earrings, phone in a glittery case, outgoing sociable vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_zoe_confused.webp`

  ```text
  anime style visual novel character sprite, young woman in her early 20s, long straight black hair with blunt bangs, denim overalls over a red striped long-sleeve shirt, small star-shaped earrings, phone in a glittery case, outgoing sociable vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Finn 芬恩（c04_finn，seed 901874198）

- `assets/char/c04_finn_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly dark hair, olive green bomber jacket over a gray hoodie, small silver ring on one finger, film camera on a strap around his neck, relaxed curious vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_finn_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly dark hair, olive green bomber jacket over a gray hoodie, small silver ring on one finger, film camera on a strap around his neck, relaxed curious vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_finn_upset.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly dark hair, olive green bomber jacket over a gray hoodie, small silver ring on one finger, film camera on a strap around his neck, relaxed curious vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_finn_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, short curly dark hair, olive green bomber jacket over a gray hoodie, small silver ring on one finger, film camera on a strap around his neck, relaxed curious vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mrs. Ellis 艾利斯太太（c04_mrs_ellis，seed 3053329333）

- `assets/char/c04_mrs_ellis_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver curly hair, lavender knitted cardigan over a white blouse, pearl stud earrings, a small green umbrella hooked over one arm, chatty grandmotherly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_mrs_ellis_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver curly hair, lavender knitted cardigan over a white blouse, pearl stud earrings, a small green umbrella hooked over one arm, chatty grandmotherly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_mrs_ellis_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver curly hair, lavender knitted cardigan over a white blouse, pearl stud earrings, a small green umbrella hooked over one arm, chatty grandmotherly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_mrs_ellis_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver curly hair, lavender knitted cardigan over a white blouse, pearl stud earrings, a small green umbrella hooked over one arm, chatty grandmotherly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Danny 丹尼（c04_ticket_clerk，seed 1252879049）

- `assets/char/c04_ticket_clerk_neutral.webp`

  ```text
  anime style visual novel character sprite, young man around 19, short spiky black hair, red cinema staff polo shirt, black baseball cap, small popcorn-shaped pin on the collar, cheerful energetic vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_ticket_clerk_happy.webp`

  ```text
  anime style visual novel character sprite, young man around 19, short spiky black hair, red cinema staff polo shirt, black baseball cap, small popcorn-shaped pin on the collar, cheerful energetic vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_ticket_clerk_confused.webp`

  ```text
  anime style visual novel character sprite, young man around 19, short spiky black hair, red cinema staff polo shirt, black baseball cap, small popcorn-shaped pin on the collar, cheerful energetic vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mrs. Moore 摩爾太太（c04_mrs_moore，seed 2980345642）

- `assets/char/c04_mrs_moore_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, shoulder-length dark hair with gray streaks tied in a low ponytail, cozy oatmeal-colored knit sweater, reading glasses pushed up on her head, cordless phone in one hand, kind motherly vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_mrs_moore_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, shoulder-length dark hair with gray streaks tied in a low ponytail, cozy oatmeal-colored knit sweater, reading glasses pushed up on her head, cordless phone in one hand, kind motherly vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_mrs_moore_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, shoulder-length dark hair with gray streaks tied in a low ponytail, cozy oatmeal-colored knit sweater, reading glasses pushed up on her head, cordless phone in one hand, kind motherly vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c04_mrs_moore_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, shoulder-length dark hair with gray streaks tied in a low ponytail, cozy oatmeal-colored knit sweater, reading glasses pushed up on her head, cordless phone in one hand, kind motherly vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Dawson 道森先生（c05_clerk，seed 4099706959）

- `assets/char/c05_clerk_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neatly trimmed white beard, round wire-rimmed glasses, dark green railway uniform vest over a white shirt, small brass train-shaped pin, calm patient old-school vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_clerk_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neatly trimmed white beard, round wire-rimmed glasses, dark green railway uniform vest over a white shirt, small brass train-shaped pin, calm patient old-school vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_clerk_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neatly trimmed white beard, round wire-rimmed glasses, dark green railway uniform vest over a white shirt, small brass train-shaped pin, calm patient old-school vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_clerk_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, neatly trimmed white beard, round wire-rimmed glasses, dark green railway uniform vest over a white shirt, small brass train-shaped pin, calm patient old-school vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Nadia 娜迪亞（c05_hostel，seed 3166546789）

- `assets/char/c05_hostel_neutral.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, curly dark brown hair in a high ponytail, light freckles, loose striped sailor t-shirt with rolled sleeves, several woven friendship bracelets, relaxed welcoming traveler vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_hostel_happy.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, curly dark brown hair in a high ponytail, light freckles, loose striped sailor t-shirt with rolled sleeves, several woven friendship bracelets, relaxed welcoming traveler vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_hostel_upset.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, curly dark brown hair in a high ponytail, light freckles, loose striped sailor t-shirt with rolled sleeves, several woven friendship bracelets, relaxed welcoming traveler vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_hostel_confused.webp`

  ```text
  anime style visual novel character sprite, young woman in her mid 20s, curly dark brown hair in a high ponytail, light freckles, loose striped sailor t-shirt with rolled sleeves, several woven friendship bracelets, relaxed welcoming traveler vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Felix 菲力克斯（c05_guide，seed 1631670674）

- `assets/char/c05_guide_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, trimmed beard, bright yellow rain jacket over a gray hoodie, holding a closed yellow umbrella, lively storyteller vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_guide_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, trimmed beard, bright yellow rain jacket over a gray hoodie, holding a closed yellow umbrella, lively storyteller vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_guide_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, trimmed beard, bright yellow rain jacket over a gray hoodie, holding a closed yellow umbrella, lively storyteller vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_guide_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, trimmed beard, bright yellow rain jacket over a gray hoodie, holding a closed yellow umbrella, lively storyteller vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ivy 艾薇（c05_host，seed 1562400524）

- `assets/char/c05_host_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, sleek black hair in a low bun, small headset microphone, navy apron over a crisp white shirt, anchor-shaped silver earrings, calm efficient vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_host_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, sleek black hair in a low bun, small headset microphone, navy apron over a crisp white shirt, anchor-shaped silver earrings, calm efficient vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_host_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, sleek black hair in a low bun, small headset microphone, navy apron over a crisp white shirt, anchor-shaped silver earrings, calm efficient vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_host_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, sleek black hair in a low bun, small headset microphone, navy apron over a crisp white shirt, anchor-shaped silver earrings, calm efficient vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ruth 露絲（c05_museum，seed 227811762）

- `assets/char/c05_museum_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver bob hair, pearl-gray cardigan with a ship-shaped brooch, reading glasses on a beaded chain, warm grandmotherly but firm vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_museum_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver bob hair, pearl-gray cardigan with a ship-shaped brooch, reading glasses on a beaded chain, warm grandmotherly but firm vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_museum_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver bob hair, pearl-gray cardigan with a ship-shaped brooch, reading glasses on a beaded chain, warm grandmotherly but firm vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_museum_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 60s, short silver bob hair, pearl-gray cardigan with a ship-shaped brooch, reading glasses on a beaded chain, warm grandmotherly but firm vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Walter 華特（c05_tourist，seed 921232544）

- `assets/char/c05_tourist_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 60s, short gray hair under a khaki bucket hat, white mustache, olive hiking vest over a plaid shirt, large professional camera hanging from his neck, cheerful adventurous vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_tourist_happy.webp`

  ```text
  anime style visual novel character sprite, man in his mid 60s, short gray hair under a khaki bucket hat, white mustache, olive hiking vest over a plaid shirt, large professional camera hanging from his neck, cheerful adventurous vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_tourist_upset.webp`

  ```text
  anime style visual novel character sprite, man in his mid 60s, short gray hair under a khaki bucket hat, white mustache, olive hiking vest over a plaid shirt, large professional camera hanging from his neck, cheerful adventurous vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_tourist_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 60s, short gray hair under a khaki bucket hat, white mustache, olive hiking vest over a plaid shirt, large professional camera hanging from his neck, cheerful adventurous vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Benny 班尼（c05_vendor，seed 4175854232）

- `assets/char/c05_vendor_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, shoulder-length wavy black hair tied back, short beard, chunky cream knitted fisherman sweater, sea-glass pendant necklace, friendly craftsman vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_vendor_happy.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, shoulder-length wavy black hair tied back, short beard, chunky cream knitted fisherman sweater, sea-glass pendant necklace, friendly craftsman vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_vendor_upset.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, shoulder-length wavy black hair tied back, short beard, chunky cream knitted fisherman sweater, sea-glass pendant necklace, friendly craftsman vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_vendor_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, shoulder-length wavy black hair tied back, short beard, chunky cream knitted fisherman sweater, sea-glass pendant necklace, friendly craftsman vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ray 雷（c05_night，seed 4250664468）

- `assets/char/c05_night_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his late 20s, messy dyed brown hair, red store uniform polo shirt with a blank name tag, small silver earring, sleepy but kind vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_night_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his late 20s, messy dyed brown hair, red store uniform polo shirt with a blank name tag, small silver earring, sleepy but kind vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_night_upset.webp`

  ```text
  anime style visual novel character sprite, young man in his late 20s, messy dyed brown hair, red store uniform polo shirt with a blank name tag, small silver earring, sleepy but kind vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_night_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his late 20s, messy dyed brown hair, red store uniform polo shirt with a blank name tag, small silver earring, sleepy but kind vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ms. Carter 卡特小姐（c05_agent，seed 4243457015）

- `assets/char/c05_agent_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 30s, neat black hair in a French twist, navy airline uniform with a red and white silk neck scarf, small wing-shaped pin, polished professional vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_agent_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 30s, neat black hair in a French twist, navy airline uniform with a red and white silk neck scarf, small wing-shaped pin, polished professional vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_agent_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 30s, neat black hair in a French twist, navy airline uniform with a red and white silk neck scarf, small wing-shaped pin, polished professional vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c05_agent_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 30s, neat black hair in a French twist, navy airline uniform with a red and white silk neck scarf, small wing-shaped pin, polished professional vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Nico 尼可（c06_neighbor，seed 2917333763）

- `assets/char/c06_neighbor_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, shaggy ash-brown dyed hair, plain black t-shirt under an open red flannel shirt, large headphones around his neck, small silver ear stud, relaxed musician vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_neighbor_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, shaggy ash-brown dyed hair, plain black t-shirt under an open red flannel shirt, large headphones around his neck, small silver ear stud, relaxed musician vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_neighbor_upset.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, shaggy ash-brown dyed hair, plain black t-shirt under an open red flannel shirt, large headphones around his neck, small silver ear stud, relaxed musician vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_neighbor_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his mid 20s, shaggy ash-brown dyed hair, plain black t-shirt under an open red flannel shirt, large headphones around his neck, small silver ear stud, relaxed musician vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Jenna 珍娜（c06_isp_agent，seed 4137097209）

- `assets/char/c06_isp_agent_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, high ponytail of dark brown hair, slim wireless headset with a microphone, teal polo shirt, small star-shaped stud earrings, upbeat patient vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_isp_agent_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, high ponytail of dark brown hair, slim wireless headset with a microphone, teal polo shirt, small star-shaped stud earrings, upbeat patient vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_isp_agent_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, high ponytail of dark brown hair, slim wireless headset with a microphone, teal polo shirt, small star-shaped stud earrings, upbeat patient vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_isp_agent_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, high ponytail of dark brown hair, slim wireless headset with a microphone, teal polo shirt, small star-shaped stud earrings, upbeat patient vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Linda 琳達（c06_receptionist，seed 214904074）

- `assets/char/c06_receptionist_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 40s, chin-length black hair with soft bangs, lavender scrub top under a light gray cardigan, pen tucked behind one ear, warm efficient vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_receptionist_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 40s, chin-length black hair with soft bangs, lavender scrub top under a light gray cardigan, pen tucked behind one ear, warm efficient vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_receptionist_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 40s, chin-length black hair with soft bangs, lavender scrub top under a light gray cardigan, pen tucked behind one ear, warm efficient vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_receptionist_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 40s, chin-length black hair with soft bangs, lavender scrub top under a light gray cardigan, pen tucked behind one ear, warm efficient vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Dr. Patel 帕特爾醫師（c06_doctor，seed 3035567786）

- `assets/char/c06_doctor_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, short neat black hair graying at the temples, white doctor's coat over a light blue shirt, stethoscope around his neck, thin rectangular glasses, calm reassuring vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_doctor_happy.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, short neat black hair graying at the temples, white doctor's coat over a light blue shirt, stethoscope around his neck, thin rectangular glasses, calm reassuring vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_doctor_upset.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, short neat black hair graying at the temples, white doctor's coat over a light blue shirt, stethoscope around his neck, thin rectangular glasses, calm reassuring vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_doctor_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 40s, short neat black hair graying at the temples, white doctor's coat over a light blue shirt, stethoscope around his neck, thin rectangular glasses, calm reassuring vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Officer Santos 桑托斯警員（c06_police，seed 4077146755）

- `assets/char/c06_police_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a low tight bun, dark navy police uniform with plain sleeves without patches, a silver badge, small radio clipped to the shoulder, calm steady vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_police_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a low tight bun, dark navy police uniform with plain sleeves without patches, a silver badge, small radio clipped to the shoulder, calm steady vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_police_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a low tight bun, dark navy police uniform with plain sleeves without patches, a silver badge, small radio clipped to the shoulder, calm steady vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_police_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, black hair in a low tight bun, dark navy police uniform with plain sleeves without patches, a silver badge, small radio clipped to the shoulder, calm steady vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Tyler 泰勒（c06_clerk，seed 637936922）

- `assets/char/c06_clerk_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, neat short black hair with a side part, red polo shirt under a gray store apron, blank name badge, earnest helpful vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_clerk_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, neat short black hair with a side part, red polo shirt under a gray store apron, blank name badge, earnest helpful vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_clerk_upset.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, neat short black hair with a side part, red polo shirt under a gray store apron, blank name badge, earnest helpful vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_clerk_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, neat short black hair with a side part, red polo shirt under a gray store apron, blank name badge, earnest helpful vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Marcus 馬可斯（c06_billing，seed 900077780）

- `assets/char/c06_billing_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, neatly trimmed short beard, light gray sweater over a white collared shirt, single-ear headset, silver wristwatch, patient professional vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_billing_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, neatly trimmed short beard, light gray sweater over a white collared shirt, single-ear headset, silver wristwatch, patient professional vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_billing_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, neatly trimmed short beard, light gray sweater over a white collared shirt, single-ear headset, silver wristwatch, patient professional vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c06_billing_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short curly black hair, neatly trimmed short beard, light gray sweater over a white collared shirt, single-ear headset, silver wristwatch, patient professional vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Derek 德瑞克（c07_recruiter，seed 4129381077）

- `assets/char/c07_recruiter_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short neat black hair with a slight wave, navy suit jacket over an open-collar light blue shirt, lanyard with a blank name card, holding a clipboard, energetic recruiter vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_recruiter_upset.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short neat black hair with a slight wave, navy suit jacket over an open-collar light blue shirt, lanyard with a blank name card, holding a clipboard, energetic recruiter vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_recruiter_confused.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short neat black hair with a slight wave, navy suit jacket over an open-collar light blue shirt, lanyard with a blank name card, holding a clipboard, energetic recruiter vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Rachel 瑞秋（c07_hr，seed 3031343858）

- `assets/char/c07_hr_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long straight black hair in a neat low ponytail, light gray cardigan over a pale blue blouse, lanyard with a blank staff badge, holding a slim tablet, warm approachable recruiter vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_hr_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long straight black hair in a neat low ponytail, light gray cardigan over a pale blue blouse, lanyard with a blank staff badge, holding a slim tablet, warm approachable recruiter vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_hr_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long straight black hair in a neat low ponytail, light gray cardigan over a pale blue blouse, lanyard with a blank staff badge, holding a slim tablet, warm approachable recruiter vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_hr_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long straight black hair in a neat low ponytail, light gray cardigan over a pale blue blouse, lanyard with a blank staff badge, holding a slim tablet, warm approachable recruiter vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Hayes 海斯先生（c07_advisor，seed 1061141076）

- `assets/char/c07_advisor_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 50s, short salt-and-pepper hair, neatly trimmed gray beard, brown tweed blazer with elbow patches over a light green sweater vest, red pen clipped to his breast pocket, patient experienced advisor vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_advisor_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 50s, short salt-and-pepper hair, neatly trimmed gray beard, brown tweed blazer with elbow patches over a light green sweater vest, red pen clipped to his breast pocket, patient experienced advisor vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_advisor_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 50s, short salt-and-pepper hair, neatly trimmed gray beard, brown tweed blazer with elbow patches over a light green sweater vest, red pen clipped to his breast pocket, patient experienced advisor vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c07_advisor_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 50s, short salt-and-pepper hair, neatly trimmed gray beard, brown tweed blazer with elbow patches over a light green sweater vest, red pen clipped to his breast pocket, patient experienced advisor vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Nina 妮娜（c08_nina，seed 1536891491）

- `assets/char/c08_nina_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, high ponytail with a wide navy headband, mustard yellow cardigan over a striped blouse, a pen tucked behind one ear, organized welcoming office coordinator vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_nina_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, high ponytail with a wide navy headband, mustard yellow cardigan over a striped blouse, a pen tucked behind one ear, organized welcoming office coordinator vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_nina_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, high ponytail with a wide navy headband, mustard yellow cardigan over a striped blouse, a pen tucked behind one ear, organized welcoming office coordinator vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Daniel 丹尼爾（c08_daniel，seed 3468536136）

- `assets/char/c08_daniel_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, neatly side-parted black hair with a few gray strands, rectangular tortoiseshell glasses, black turtleneck under a camel blazer, silver wristwatch, confident experienced designer vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_daniel_happy.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, neatly side-parted black hair with a few gray strands, rectangular tortoiseshell glasses, black turtleneck under a camel blazer, silver wristwatch, confident experienced designer vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_daniel_upset.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, neatly side-parted black hair with a few gray strands, rectangular tortoiseshell glasses, black turtleneck under a camel blazer, silver wristwatch, confident experienced designer vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_daniel_confused.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, neatly side-parted black hair with a few gray strands, rectangular tortoiseshell glasses, black turtleneck under a camel blazer, silver wristwatch, confident experienced designer vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Priya 普莉雅（c08_priya，seed 2933421722）

- `assets/char/c08_priya_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, long wavy dark hair with caramel highlights, emerald green wrap blouse, thin gold bar necklace, a stack of colorful beaded bracelets, creative energetic marketer vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_priya_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, long wavy dark hair with caramel highlights, emerald green wrap blouse, thin gold bar necklace, a stack of colorful beaded bracelets, creative energetic marketer vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_priya_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, long wavy dark hair with caramel highlights, emerald green wrap blouse, thin gold bar necklace, a stack of colorful beaded bracelets, creative energetic marketer vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_priya_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her late 20s, long wavy dark hair with caramel highlights, emerald green wrap blouse, thin gold bar necklace, a stack of colorful beaded bracelets, creative energetic marketer vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Hughes 休斯先生（c08_hughes，seed 2413777791）

- `assets/char/c08_hughes_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his mid 50s, short silver hair combed back, trimmed gray beard, dark green suit jacket over a light blue shirt, plain gold lapel pin, phone headset on one ear, calm experienced hotel manager vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_hughes_upset.webp`

  ```text
  anime style visual novel character sprite, man in his mid 50s, short silver hair combed back, trimmed gray beard, dark green suit jacket over a light blue shirt, plain gold lapel pin, phone headset on one ear, calm experienced hotel manager vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_hughes_confused.webp`

  ```text
  anime style visual novel character sprite, man in his mid 50s, short silver hair combed back, trimmed gray beard, dark green suit jacket over a light blue shirt, plain gold lapel pin, phone headset on one ear, calm experienced hotel manager vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Toby 托比（c08_server，seed 1549182708）

- `assets/char/c08_server_neutral.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, curly brown hair, black waist apron over a white shirt with rolled sleeves, small notepad tucked in the apron pocket, cheerful attentive server vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_server_happy.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, curly brown hair, black waist apron over a white shirt with rolled sleeves, small notepad tucked in the apron pocket, cheerful attentive server vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c08_server_confused.webp`

  ```text
  anime style visual novel character sprite, young man in his early 20s, curly brown hair, black waist apron over a white shirt with rolled sleeves, small notepad tucked in the apron pocket, cheerful attentive server vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ms. Grant 葛蘭特總監（c09_hotel_director，seed 4021064201）

- `assets/char/c09_hotel_director_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, silver-streaked dark hair in a neat low bun, tailored navy skirt suit with a small gold pin on the lapel, slim silver wristwatch, poised and gracious hospitality executive vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_hotel_director_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, silver-streaked dark hair in a neat low bun, tailored navy skirt suit with a small gold pin on the lapel, slim silver wristwatch, poised and gracious hospitality executive vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_hotel_director_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, silver-streaked dark hair in a neat low bun, tailored navy skirt suit with a small gold pin on the lapel, slim silver wristwatch, poised and gracious hospitality executive vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_hotel_director_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 50s, silver-streaked dark hair in a neat low bun, tailored navy skirt suit with a small gold pin on the lapel, slim silver wristwatch, poised and gracious hospitality executive vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Reyes 雷耶斯先生（c09_cafe_founder，seed 1754604511）

- `assets/char/c09_cafe_founder_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short curly black hair, neatly trimmed beard, brown corduroy blazer over an olive green henley shirt, small coffee bean pin on the lapel, relaxed creative entrepreneur vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_cafe_founder_happy.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short curly black hair, neatly trimmed beard, brown corduroy blazer over an olive green henley shirt, small coffee bean pin on the lapel, relaxed creative entrepreneur vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_cafe_founder_upset.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short curly black hair, neatly trimmed beard, brown corduroy blazer over an olive green henley shirt, small coffee bean pin on the lapel, relaxed creative entrepreneur vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_cafe_founder_confused.webp`

  ```text
  anime style visual novel character sprite, man in his late 30s, short curly black hair, neatly trimmed beard, brown corduroy blazer over an olive green henley shirt, small coffee bean pin on the lapel, relaxed creative entrepreneur vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Ms. Novak 諾瓦克女士（c09_cafe_finance，seed 3196507746）

- `assets/char/c09_cafe_finance_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, straight chin-length black hair with blunt bangs, black rectangular glasses, burgundy blazer over a gray turtleneck, slim leather folder held against her chest, sharp no-nonsense negotiator vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_cafe_finance_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, straight chin-length black hair with blunt bangs, black rectangular glasses, burgundy blazer over a gray turtleneck, slim leather folder held against her chest, sharp no-nonsense negotiator vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_cafe_finance_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, straight chin-length black hair with blunt bangs, black rectangular glasses, burgundy blazer over a gray turtleneck, slim leather folder held against her chest, sharp no-nonsense negotiator vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_cafe_finance_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her mid 40s, straight chin-length black hair with blunt bangs, black rectangular glasses, burgundy blazer over a gray turtleneck, slim leather folder held against her chest, sharp no-nonsense negotiator vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Brooks 布魯克斯先生（c09_office_manager，seed 3049177162）

- `assets/char/c09_office_manager_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 40s, short spiky black hair, light blue shirt with rolled-up sleeves and a loosened striped tie, wireless earpiece in one ear, ring of keys clipped to his belt, busy hands-on manager vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_office_manager_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 40s, short spiky black hair, light blue shirt with rolled-up sleeves and a loosened striped tie, wireless earpiece in one ear, ring of keys clipped to his belt, busy hands-on manager vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_office_manager_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 40s, short spiky black hair, light blue shirt with rolled-up sleeves and a loosened striped tie, wireless earpiece in one ear, ring of keys clipped to his belt, busy hands-on manager vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_office_manager_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 40s, short spiky black hair, light blue shirt with rolled-up sleeves and a loosened striped tie, wireless earpiece in one ear, ring of keys clipped to his belt, busy hands-on manager vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Nora 諾拉（c09_designer，seed 2101916623）

- `assets/char/c09_designer_neutral.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long wavy dark hair with a few teal streaks, mustard yellow wrap dress, chunky geometric earrings, small sketchbook tucked under one arm, creative outgoing designer vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_designer_happy.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long wavy dark hair with a few teal streaks, mustard yellow wrap dress, chunky geometric earrings, small sketchbook tucked under one arm, creative outgoing designer vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_designer_upset.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long wavy dark hair with a few teal streaks, mustard yellow wrap dress, chunky geometric earrings, small sketchbook tucked under one arm, creative outgoing designer vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_designer_confused.webp`

  ```text
  anime style visual novel character sprite, woman in her early 30s, long wavy dark hair with a few teal streaks, mustard yellow wrap dress, chunky geometric earrings, small sketchbook tucked under one arm, creative outgoing designer vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Doyle 多伊爾先生（c09_consultant，seed 2536524259）

- `assets/char/c09_consultant_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, short white hair, neatly trimmed white beard, tweed jacket with elbow patches over a pale blue shirt, half-moon reading glasses, sharp analytical expert vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_consultant_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, short white hair, neatly trimmed white beard, tweed jacket with elbow patches over a pale blue shirt, half-moon reading glasses, sharp analytical expert vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_consultant_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, short white hair, neatly trimmed white beard, tweed jacket with elbow patches over a pale blue shirt, half-moon reading glasses, sharp analytical expert vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_consultant_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 60s, short white hair, neatly trimmed white beard, tweed jacket with elbow patches over a pale blue shirt, half-moon reading glasses, sharp analytical expert vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light green background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Mr. Becker 貝克先生（c09_buyer，seed 2946922689）

- `assets/char/c09_buyer_neutral.webp`

  ```text
  anime style visual novel character sprite, tall man in his late 40s, short neatly parted hair, clean-shaven, slim charcoal gray suit with a dark green knit tie, silver cufflinks, precise straightforward businessman vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_buyer_happy.webp`

  ```text
  anime style visual novel character sprite, tall man in his late 40s, short neatly parted hair, clean-shaven, slim charcoal gray suit with a dark green knit tie, silver cufflinks, precise straightforward businessman vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_buyer_upset.webp`

  ```text
  anime style visual novel character sprite, tall man in his late 40s, short neatly parted hair, clean-shaven, slim charcoal gray suit with a dark green knit tie, silver cufflinks, precise straightforward businessman vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c09_buyer_confused.webp`

  ```text
  anime style visual novel character sprite, tall man in his late 40s, short neatly parted hair, clean-shaven, slim charcoal gray suit with a dark green knit tie, silver cufflinks, precise straightforward businessman vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Hana 花奈（c10_hana，seed 850922654）

- `assets/char/c10_hana_neutral.webp`

  ```text
  anime style visual novel character sprite, young woman around 20, straight black hair in a low ponytail with blunt bangs, oversized cream cardigan over a navy striped shirt, small spiral notebook held to her chest, maple leaf pin on her collar, shy newcomer vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c10_hana_happy.webp`

  ```text
  anime style visual novel character sprite, young woman around 20, straight black hair in a low ponytail with blunt bangs, oversized cream cardigan over a navy striped shirt, small spiral notebook held to her chest, maple leaf pin on her collar, shy newcomer vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c10_hana_upset.webp`

  ```text
  anime style visual novel character sprite, young woman around 20, straight black hair in a low ponytail with blunt bangs, oversized cream cardigan over a navy striped shirt, small spiral notebook held to her chest, maple leaf pin on her collar, shy newcomer vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c10_hana_confused.webp`

  ```text
  anime style visual novel character sprite, young woman around 20, straight black hair in a low ponytail with blunt bangs, oversized cream cardigan over a navy striped shirt, small spiral notebook held to her chest, maple leaf pin on her collar, shy newcomer vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

### Owen 歐文（c10_owen，seed 4120431545）

- `assets/char/c10_owen_neutral.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short neat black hair with a side part, rectangular black glasses, olive green quilted vest over a gray hoodie, laptop bag strap across his chest, quick-witted debater vibe, calm neutral expression, relaxed, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c10_owen_happy.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short neat black hair with a side part, rectangular black glasses, olive green quilted vest over a gray hoodie, laptop bag strap across his chest, quick-witted debater vibe, bright warm smile, happy cheerful expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c10_owen_upset.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short neat black hair with a side part, rectangular black glasses, olive green quilted vest over a gray hoodie, laptop bag strap across his chest, quick-witted debater vibe, annoyed frown, furrowed eyebrows, pouting lips, clearly displeased expression, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```

- `assets/char/c10_owen_confused.webp`

  ```text
  anime style visual novel character sprite, man in his early 30s, short neat black hair with a side part, rectangular black glasses, olive green quilted vest over a gray hoodie, laptop bag strap across his chest, quick-witted debater vibe, confused puzzled expression, one eyebrow raised, head slightly tilted, Asian face, East Asian features, upper body portrait, facing viewer, centered, isolated on a plain flat light blue background, nothing behind the subject, 2D anime style, high quality illustration, clean lineart, soft cel shading
  ```
