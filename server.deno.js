import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";
import { POST_add_DB_SP } from "./library/post_add_db_sp.js";
import { POST_delete_DB_SP } from "./library/post_delete_db_sp.js";
import { POST_getAll_DB_SP } from "./library/post_getall_db_sp.js";
import { ID_create_DB, ID_get_DB } from "./library/id_create_db.js"; //ローカルストレージからIDを読み込む(key="myId")。なければIDを作って保存してその値を返す
import { Get_sp } from "./library/get_sp.js";
import { Get_grade } from "./library/get_grade.js";
import { Quest_completed } from "./library/quest_completed.js";//クエスト完了
import { POST_user_location_save_db } from "./library/post_location_save_db.js"; // 定期的にユーザーの位置情報をdbに保存する
import "https://deno.land/std@0.224.0/dotenv/load.ts"; //.envの読み込み用

let kv;

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  //console.log(pathname);

  //console.log("URLの取得結果 : " + Deno.env.get("URL"));

  if (kv === undefined) {
    // リクエストに応じて環境変数を設定する
    // await Deno.env.set(
    //   "DENO_KV_ACCESS_TOKEN",
    //   Deno.env.get("TOKEN"),
    // );
    // Deno KVの読み込み
    kv = await Deno.openKv(
      Deno.env.get("URL"),
    );
    //console.log(kv);
  }

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }

  if (req.method === "POST" && pathname === "/add_DB_SP") {
    return POST_add_DB_SP(req, kv);
  }

  if (req.method === "POST" && pathname === "/delete_DB_SP") {
    return POST_delete_DB_SP(req, kv);
  }

  if (req.method === "POST" && pathname === "/getAll_DB_SP") {
    return POST_getAll_DB_SP(req, kv);
  }

  if (req.method === "GET" && pathname === "/get_myId_DB") {
    return ID_get_DB(req, kv);
  }

  //自分のIDの読み出し(あれば値を返し、なければ新しく作って保存してその値を返す。)
  if (req.method === "POST" && pathname === "/get_myId_DB") {
    return ID_create_DB(req, kv);
  }

  if (req.method === "POST" && pathname === "/get_sp_list") {
    return Get_sp(req, kv);
  }

  if (req.method === "POST" && pathname === "/quest_completed") {
    return Quest_completed(req, kv);
  }


  if (req.method === "POST" && pathname === "/receive_location") {  
    return POST_user_location_save_db(req, kv);
  }

  //自身のグレード取得(文字列JOSN)
  if (req.method === "GET" && pathname === "/get_mygrade") {  
    const params = new URL(req.url).searchParams;
    const ID = params.get("ID"); // 文字列 "Jonathan Smith" です。
    return Get_grade(ID, kv);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
