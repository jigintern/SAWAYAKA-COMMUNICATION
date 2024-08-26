async function POST_getAll_DB_SP(req) {
  // リクエストに応じて環境変数を設定する
  await Deno.env.set(
    "DENO_KV_ACCESS_TOKEN",
    Deno.env.get("TOKEN"),
  );
  // Deno KVの読み込み
  const kv = await Deno.openKv(
    Deno.env.get("URL"),
  );
  console.log(kv);

  // データを全取得
  const data = await kv.list({ prefix: [] });
  // リザルトに格納
  const result = [];
  for await (const entry of data) {
    result.push({
      key: entry.key,
      value: entry.value,
    });
  }

  return new Response(result);
}

export { POST_getAll_DB_SP };
