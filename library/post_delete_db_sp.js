async function POST_delete_DB_SP(req) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const deleteId = requestJson["deleteId"];
  //console.log(sendID);送るIDが取得できたことを確認済み

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

  //SPの削除
  await kv.delete(deleteId);

  const result = deleteId + " の削除を試みました";
  return new Response(result);
}

export { POST_delete_DB_SP };
