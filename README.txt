フィギュア完全一致検索 - Render版

キョウ君競艇ツールと同じ基本構成:
index.html / server.js / package.json / README.txt
Node + Express / npm install / npm start / process.env.PORT / Render Web Service

Render:
Build Command: npm install
Start Command: npm start

Environment Variables:
OPENAI_API_KEY = OpenAI API key

公開後:
https://<Renderのサービス名>.onrender.com

確認:
https://<Renderのサービス名>.onrender.com/api/health

STEP 0.3:
写真選択 -> OpenAI画像解析 -> 商品名/メーカー/Ver./限定区分を表示。
次工程でWeb検索と「完全一致した正面画像だけ」の取得を追加。
