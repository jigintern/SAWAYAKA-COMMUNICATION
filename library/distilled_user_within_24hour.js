import { GetNowTime } from "./get_time.js"

// この関数が走るたびに24時間以内に自分と交流があったユーザーが抽出される
async function distilled_user_within_24hours(req,kv) {
    const distilled_user_array = []; // 交流があった(=条件に合致した)ユーザーを全て格納するための配列
    const id = new URL(req.url).searchParams.get("id");//送信者自身のID

    // データを全取得するためのイテレーターを作成する
    const spIterator = kv.list({prefix: ["SP"]});
    const Nowtime = await GetNowTime(); //今現在の時間

    for await (const element of spIterator) {
        if(new Date(Nowtime) - new Date(element.value.time) < 86400 * 1000){//24時間以内の場合
            if (element.key[1] === Number(id) || Number(element.value.User) === Number(id)) {//自身に送られたまたは自身が送ったなら
                distilled_user_array.push(element);
            }
        }
    };

    return new Response(JSON.stringify(distilled_user_array)); 
}
  
export { distilled_user_within_24hours };