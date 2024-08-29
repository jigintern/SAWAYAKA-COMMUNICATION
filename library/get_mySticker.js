//自身の所有するステッカーをJSONが入った配列で返す。
import { Status } from "https://deno.land/std@0.151.0/http/http_status.ts";
async function GET_mySticker(req, kv) {
  // IDのユーザーデータを取得
  const id = new URL(req.url).searchParams.get("id");
  const data = await kv.get(["useritem", Number(id)]);
  if(data === undefined){//データが取得できなかった
    const result = "データが取得できませんでした。id不正かも"
    return new Response(result, { status: 400 })
  }
  //const myData = JSON.parse(data.value);
  const myData = data.value //上だとエラー出るかも

  const result = [];
  myData.hasSticker.forEach(element => {
    result.push(element);
  });


  //console.log(result);
  return new Response(JSON.stringify(result));
}
export { GET_mySticker };