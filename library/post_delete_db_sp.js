async function POST_delete_DB_SP(req, kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const deleteId = requestJson["id"];

  //SPの削除
  await kv.delete(deleteId);

  const result = deleteId + " の削除を試みました";
  return new Response(result);
}

export { POST_delete_DB_SP };
