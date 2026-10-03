import express from "express";
import multer from "multer";
import OpenAI from "openai";

const app = express();
const upload = multer({limits:{fileSize:15*1024*1024}});
const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

app.use(express.static("."));
app.use((req,res,next)=>{res.setHeader("Access-Control-Allow-Origin","*");next();});

app.get("/api/health",(req,res)=>res.json({ok:true,service:"figure-exact-match",version:"0.3-render"}));

app.post("/api/analyze",upload.single("image"),async(req,res)=>{
 try{
  if(!req.file)return res.status(400).json({error:"画像がありません"});
  if(!process.env.OPENAI_API_KEY)return res.status(500).json({error:"RenderのOPENAI_API_KEYが未設定です"});
  const data=`data:${req.file.mimetype||"image/jpeg"};base64,${req.file.buffer.toString("base64")}`;
  const prompt=`日本のフィギュア商品識別専用。写真に実際に見える情報だけを根拠にする。
通常版、タイクレ限定、オンライン限定、カラー違い、表情違い、○○ver.を厳密に区別。
限定表記が見えなければ推測せずnull。読めない項目もnull。
JSONのみ:
{"franchise":string|null,"character":string|null,"product_name":string|null,"manufacturer":string|null,"version":string|null,"limited_edition":string|null,"visible_text":string[],"confidence":"高"|"中"|"低","caution":string}`;
  const out=await client.responses.create({model:"gpt-5.4-mini",input:[{role:"user",content:[{type:"input_text",text:prompt},{type:"input_image",image_url:data,detail:"high"}]}]});
  const text=out.output_text.trim().replace(/^```json\s*/i,"").replace(/```$/,"").trim();
  res.json(JSON.parse(text));
 }catch(e){console.error(e);res.status(500).json({error:"AI解析に失敗しました"})}
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`figure-search running on ${PORT}`));