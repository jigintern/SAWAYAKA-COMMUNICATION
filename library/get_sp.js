//さわやかポイントをIDから検索して配列で返す
async function POST_get_DB_SP(req, kv) {
  // リクエストのペイロードを取得
  const id = new URL(req.url).searchParams.get("id");

  // IDのユーザーデータを取得
  const data = await kv.list({ prefix: ["SP"] });
  // リザルトに格納
  const result = [];
  for await (const entry of data) {
    if (entry.value.User === Number(id)) {
      result.push({
        key: entry.key, //配列
        value: entry.value, //JSON
      });
    }
  }

  return new Response(JSON.stringify(result));
}
export { POST_get_DB_SP };
