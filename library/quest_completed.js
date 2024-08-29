//クエストを完了にする。

import { GetNowTime } from "./get_time.js";
async function Quest_completed(req, kv) {
  //クエストの完了日を更新。または本日クエストが完了しているかどうかをサーバーに問い合わせることが出来る。
  //完了日更新は1、完了の確認は0(kye='mode')
  //または戻り値はクエストをすでに完了しているなら1、まだ完了していないなら0

  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からデータ取得
  const mode = requestJson["mode"]; //0なら完了したかどうかを確認し、1なら完了時刻を記録する。
  const ID = requestJson["ID"]; //誰が完了したか

  const dataKey = ["user", Number(ID)];
  const data = await kv.get(dataKey);
  const newValue = data.value;
  if (Number(mode) === 1) {
    console.log(newValue.quest_completed_time);
    newValue.quest_completed_time = await GetNowTime(); //クエスト完了日時をサーバーが自動で取得するようにする。
    await kv.set(dataKey, newValue);
    return new Response(1);
  } else {
    //if (newValue.quest_completed_time === getCurrentDateDay()) {
    //クエストの間隔を調整できます。/public/lib/sessionChecker.js Line9も確認
    if ((new Date(await GetNowTime()) - new Date(newValue.quest_completed_time)) <= 300000) {//300000ミリ秒は五分
      return new Response(1);
    } else {
      return new Response(0);
    }
  }
}

export { Quest_completed };

