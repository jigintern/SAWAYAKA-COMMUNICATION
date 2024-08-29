import { GetNowTime } from "./get_time.js"

// この関数が走るたびに24時間以内に自分と交流があったユーザーが抽出される
async function distilled_user_within_24hours(req,kv) {
    const distilled_user_array = []; // 交流があった(=条件に合致した)ユーザーを全て格納するための配列
    const id = new URL(req.url).searchParams.get("id");

    // データを全取得するためのイテレーターを作成する
    const spIterator = kv.list({
           prefix: ["SP"],
    });

    // ループしながらDeno KVに問い合わせるので、forループにawaitを付ける
    for await (const spItem of spIterator) {
        const Nowtime = await GetNowTime(); //今現在の時間
        // const fromID = Number(spItem.key[1]); //spを送ってきた人のID
        const currentUser = Number(id); //今のユーザID
        const toID = Number(spItem.value.User); //spを送られた人のID
        // const submitedTime = Number(spItem.value.time); //spが送られた時間

        if (toID === currentUser) {
            if(new Date(Nowtime) - new Date(spItem.value.time) < 86400 * 1000) {
                distilled_user_array.push(spItem); // 日付が一緒の場合
            }
        }
    }

    return new Response(JSON.stringify(distilled_user_array)); 
}
  
export { distilled_user_within_24hours };