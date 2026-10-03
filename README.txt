figure-search FREE OCR v1.1

追加機能:
- 写真を選択
- Tesseract.js（ブラウザ内OCR）で日本語＋英語を読み取り
- 商品名らしい文字を商品名欄へ自動入力
- 手動修正後、各検索サイトへ検索
- OpenAI APIは使用しません

注意:
- OCR処理自体の従量AI API料金はありません。
- Tesseract.jsと言語データはCDNからブラウザへ読み込まれます。
- 写真だけからキャラクター/商品を画像認識する機能ではありません。
- OCR精度は写真の角度、反射、文字サイズなどに左右されます。

GitHub:
index.html / package.json / server.js / README.txt を既存figure-searchへ上書きアップロードしてください。
RenderのAuto-Deployが有効なら自動更新されます。
