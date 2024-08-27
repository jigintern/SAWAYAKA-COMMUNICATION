//さわやかポイントをIDから検索して配列で返す
async function Get_sp(req, kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const ID = requestJson["ID"]; //誰が送信したか
  console.log("test " + ID);

  // IDのユーザーデータを取得
  const data = await kv.list({ prefix: ["SP"] });
  // リザルトに格納
  const result = [];
  for await (const entry of data) {
    if (entry.value.User === Number(ID)) {
      result.push({
        key: entry.key, //配列
        value: entry.value, //JSON
      });
    }
  }

  //   for await (const entry of data) {
  //     if(entry.value.User===Number(ID)){
  //       result.push(entry.value);
  //     }
  //   }
  //console.log(result);
  console.log(result);
  return new Response(JSON.stringify(result));
}
export { Get_sp };
