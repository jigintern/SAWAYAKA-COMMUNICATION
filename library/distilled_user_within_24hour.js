import { getNowTime } from "./get_time.js";

// この関数が走るたびに24時間以内に自分と交流があったユーザーが抽出される
async function distilledUserWithin24Hours(id, kv) {
  const distilledUserArray = []; // 交流があった(=条件に合致した)ユーザーを全て格納するための配列

  // データを全取得するためのイテレーターを作成する
  const spIterator = kv.list({ prefix: ["SP"] });
  const nowTime = await getNowTime(); //今現在の時間

  for await (const element of spIterator) {
    if (new Date(nowTime) - new Date(element.value.time) < 86400 * 1000) { //24時間以内の場合
      if (
        element.key[1] === Number(id) ||
        Number(element.value.User) === Number(id)
      ) { //自身に送られたまたは自身が送ったなら
        distilledUserArray.push(element);
      }
    }
  }

  return new Response(JSON.stringify(distilledUserArray));
}

export { distilledUserWithin24Hours };
