import { getNowTime } from "./get_time.js";

// この関数が走るたびに24時間以内に自分と交流があったユーザーが抽出される
async function distilledUserWithin24Hours(id, kv) {
  const distilledUserArray = []; // 交流があった(=条件に合致した)ユーザーを全て格納するための配列

  // データを全取得するためのイテレーターを作成する
  const spIterator = kv.list({ prefix: ["SP"] });
  const nowTime = getNowTime(); //今現在の時間

  for await (const element of spIterator) {
    const sourceId = element.key[1];
    const destinationId = element.value.User;
    const time = element.value.time;

    if (new Date(nowTime) - new Date(time) < 86400 * 1000) { //24時間以内の場合
      if (
        sourceId === Number(id) ||
        Number(destinationId) === Number(id)
      ) {
        //自身に送られたまたは自身が送ったなら
        const result = {
          sourceId,
          destinationId,
          time,
        };

        distilledUserArray.push(result);
      }
    }
  }

  return distilledUserArray;
}

export { distilledUserWithin24Hours };
