import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";
import "https://deno.land/std@0.224.0/dotenv/load.ts"; //.envの読み込み用
import { distilledUserWithin24Hours } from "./library/distilled_user_within_24hour.js"; // 定期的にユーザーの位置情報をdbに保存する
import { getGrade } from "./library/get_grade.js";
import { getMySticker } from "./library/get_mySticker.js"; //ステッカーの確認
import { getAroundPeople } from "./library/get_near_people.js"; // 定期的に周りのユーザをデータベースから取ってくる
import { postDbSp } from "./library/get_sp.js";
import { getNowTime } from "./library/get_time.js"; //時間取得
import { idCreateDb, idGetDb } from "./library/id_create_db.js"; //ローカルストレージからIDを読み込む(key="myId")。なければIDを作って保存してその値を返す
import { postAddDbSp } from "./library/post_add_db_sp.js";
import { postDeleteDbSp } from "./library/post_delete_db_sp.js";
import { postUserLocationSaveDb } from "./library/post_location_save_db.js"; // 定期的にユーザーの位置情報をdbに保存する
import { getMyPoint, postBuySticker } from "./library/post_sticker_buy.js"; //ステッカーの購入
import { postStickerCp } from "./library/post_sticker_cp.js"; //ステッカーの移動
import { questCompleted } from "./library/quest_completed.js"; //クエスト完了
import { getSaleItemsList } from "./library/saleItems_list.js"; //販売商品の確認

let kv;

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  if (kv === undefined) {
    // リクエストに応じて環境変数を設定する
    // Deno KVの読み込み
    kv = await Deno.openKv(Deno.env.get("URL"));
  }

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }

  if (req.method === "POST" && pathname === "/sp") {
    return postAddDbSp(req, kv);
  }

  // SP削除
  if (req.method === "DELETE" && pathname === "/sp") {
    return postDeleteDbSp(req, kv);
  }

  if (req.method === "GET" && pathname === "/sp") {
    return postDbSp(req, kv);
  }

  if (req.method === "GET" && pathname === "/user") {
    return idGetDb(req, kv);
  }

  //自分のIDの読み出し(あれば値を返し、なければ新しく作って保存してその値を返す。)
  if (req.method === "POST" && pathname === "/user") {
    return idCreateDb(req, kv);
  }

  if (req.method === "POST" && pathname === "/quest_completed") {
    return questCompleted(req, kv);
  }

  // ユーザの現在地をサーバーが受け取る
  if (req.method === "POST" && pathname === "/receive_location") {
    return postUserLocationSaveDb(req, kv);
  }

  // 自身のグレード取得(文字列JSON)
  if (req.method === "GET" && pathname === "/grade") {
    return getGrade(req, kv);
  }

  // 24時間以内にコンタクトしたユーザーをデータベースから抽出する
  if (req.method === "GET" && pathname === "/distilled_user") {
    const id = new URL(req.url).searchParams.get("id"); //送信者自身のID
    const userList = distilledUserWithin24Hours(id, kv);

    return new Response(JSON.stringify(userList));
  }

  //自身のポイント確認(戻り値数値)
  if (req.method === "GET" && pathname === "/myPoint") {
    return getMyPoint(req, kv);
  }

  // 自分の周りのユーザーを探索する
  if (req.method === "GET" && pathname === "/get_around_people") {
    return getAroundPeople(req, kv);
  }

  // ステッカーの購入
  if (req.method === "POST" && pathname === "/buy_sticker") {
    return postBuySticker(req, kv);
  }

  // ステッカーの確認
  if (req.method === "GET" && pathname === "/get_mySticker") {
    return getMySticker(req, kv);
  }

  // ステッカーの確認
  if (req.method === "POST" && pathname === "/move_mySticker") {
    return postStickerCp(req, kv);
  }

  // 商品の確認
  if (req.method === "GET" && pathname === "/shopitems") {
    return new Response(JSON.stringify(getSaleItemsList()));
  }

  if (req.method === "GET" && pathname === "/time") {
    return new Response(getNowTime());
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
