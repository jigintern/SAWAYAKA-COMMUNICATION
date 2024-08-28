import { Status } from "https://deno.land/std@0.151.0/http/http_status.ts";

async function POST_add_DB_SP(req, kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const fromID = requestJson["fromID"]; //誰が送信したか
  const sendID = requestJson["sendId"]; //誰にまたはコメ主
  const sendText = requestJson["sendText"];

  if (Number(fromID) === Number(sendID)) {
    const result = "自身にSP送信することはできません";
    return new Response(result, { status: 400 });
  }

  const sendTime = getCurrentDateTime(); //送信時間をサーバーが自動で取得するようにする。

  const dataKey = ["user", Number(fromID)];
  const data = await kv.get(dataKey);
  const spNO = Number(data.value.sendedSpCount) + 1;
  const newValue = data.value;
  newValue.sendedSpCount = spNO;
  await kv.set(dataKey, newValue);

  const key = ["SP", Number(fromID), Number(spNO)]; //なんのデータか,誰(ID),何番目の投稿か
  console.log("Sp : " + Number(fromID) + " : " + Number(spNO));
  const value = {
    User: Number(sendID),
    time: Number(sendTime),
    mainText: sendText,
  };

  const result = await kv.set(key, value);

  console.log(result);

  return new Response(result);
}

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export { POST_add_DB_SP };
