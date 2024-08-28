import { Status } from "https://deno.land/std@0.151.0/http/http_status.ts";

async function POST_add_DB_SP(req,kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const fromID = requestJson["fromID"]; //誰が送信したか
  //const spNO = requestJson["spNO"]; //何個目のコメントか
  const sendID = requestJson["sendId"]; //誰にまたはコメ主
  //const sendTime = requestJson["time"];
  const sendText = requestJson["sendText"];

  if(Number(fromID)===Number(sendID)){
    const result = "自身にSP送信することはできません";
    return new Response(result,{status: 400});
  }

  const sendTime = getCurrentDateTime();//送信時間をサーバーが自動で取得するようにする。

  const dataKey=["user", Number(fromID)];
  const data = await kv.get(dataKey);
  const spNO = Number(data.value.sendedSpCount) + 1;
  const newValue = data.value;
  newValue.sendedSpCount = spNO;
  await kv.set(dataKey, newValue);

  const key = ["SP", Number(fromID), Number(spNO)]; //なんのデータか,誰(ID),何番目の投稿か
  console.log("Sp : " + Number(fromID) + " : " + Number(spNO));
  //name: "山田"
  const value = {
    User: Number(sendID),
    time: Number(sendTime),
    mainText: sendText,
  };

  //Deno KVに保存
  //構文 : kv.set(key,value);
  // 第一引数はkey, 第二引数はvalue
  // keyが既に存在する場合は、更新
  //const result = await kv.set([コンマ区切りで文字列か数字のID], { 型(文字列): 値(文字列、数字) });
  //const result = await kv.set(key, value);
  // レスポンスを表示(KVに保存が成功すればコンソールにOKと表示される)
  //console.log(result);

  const result = await kv.set(key, value);

  //const result = "仮";
  console.log(result);

  //const result = "送ろうとしました";
  return new Response(result,{status: 200});
}

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export { POST_add_DB_SP };
