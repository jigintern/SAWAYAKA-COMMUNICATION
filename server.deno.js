import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }

  if (req.method === "POST" && pathname === "/add_DB_SP") {
    // リクエストのペイロードを取得
    const requestJson = await req.json();
    // JSONの中からnextWordを取得
    const sendID = requestJson["sendId"];
    const sendTime = requestJson["time"];
    const sendText = requestJson["sendText"];
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
    const key = ["SP", 111111, 2222226];
    const value = {
      //name: "山田"
      User: sendID,
      time: sendTime,
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
    await kv.set(key, value);

    const result = "送ろうとしました";
    return new Response(result);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
