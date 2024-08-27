//サーバーはフロントから送られてきたIDのデータを取得する。なければ新規登録する。
async function ID_create_DB(req,kv) {
  // IDのユーザーデータを取得
  const data = await kv.list({ prefix: ["user"] });
  const {hobbyId, hobbyContent} = await req.json();
  // リザルトに格納
  let max = 0;
  for await (const entry of data) {
    if (max < entry.key[1]) max = entry.key[1];
    console.log(entry.key + " : " + JSON.stringify(entry.value));

    console.log("IDが取得できたか? "+entry.key[1]);
  }

  console.log("データの長さ " + data.size);
  console.log(max);

  const key = ["user", max+1]; //なんのデータか,誰(ID,6桁),何番目の投稿か(7桁)
  const value = {
    hobbyId,
    hobbyContent
  };

  const result = await kv.set(key, value);

  return Response.json({id: max + 1});
}
export { ID_create_DB };
