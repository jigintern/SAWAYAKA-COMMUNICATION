//SPの送信(データベースに追加)

import { GetNowTime } from "./get_time.js";
import { Status } from "https://deno.land/std@0.151.0/http/http_status.ts";
async function POST_add_DB_SP(req, kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const fromID = requestJson["fromID"]; //誰が送信したか
  const sendID = requestJson["sendId"]; //誰にまたはコメ主
  const sendText = requestJson["sendText"];

  if (Number(fromID) === Number(sendID)) {
    const result = "自身に贈ることはできません";
    return new Response(result, { status: 400 });
  }

  const sendingUser = await kv.get(["user", Number(sendID)]);
  if (!sendingUser.value) {
    const result = "ユーザーが見つかりません";
    return new Response(result, { status: 400 });
  }

  const sendTime = await GetNowTime(); //送信時間をサーバーが自動で取得するようにする。

  const dataKey = ["user", Number(fromID)];
  const data = await kv.get(dataKey);
  const spNO = Number(data.value.sendedSpCount) + 1;
  const newValue = data.value;
  newValue.sendedSpCount = spNO;
  await kv.set(dataKey, newValue);

  const key = ["SP", Number(fromID), Number(spNO)]; //なんのデータか,誰(ID),何番目の投稿か
  //console.log("Sp : " + Number(fromID) + " : " + Number(spNO));
  const value = {
    User: Number(sendID),
    time: sendTime,
    mainText: sendText,
  };

  const result = await kv.set(key, value);

  //console.log(result);

  return new Response(result);
}

export { POST_add_DB_SP };
