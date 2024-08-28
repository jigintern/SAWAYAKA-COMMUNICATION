import { GetNowTime } from "./get_time.js"

// この関数が走るたびに24時間以内に自分と交流があったユーザーが抽出される
async function distilled_user_within_24hours(req,kv) {
    const distilled_user_array = [];
    const id = new URL(req.url).searchParams.get("id");

    // データを全取得するためのイテレーターを作成する
    const spIterator = kv.list({
           prefix: ["SP"],
    });

    // ループしながらDeno KVに問い合わせるので、forループにawaitを付ける
    for await (const spItem of spIterator) {
        const Nowtime = GetNowTime(); //　今現在のID
        const fromID = Number(spItem.key[1]); // spを送ってきた人のID
        const currentUser = Number(id); // 今のユーザID
        const toID = Number(spItem.value.User); // spを送られた人のID
        const submitedTime = Number(spItem.value.time); // spが送られた時間

        if (fromID === currentUser || toID === currentUser) {
            const sp_submited = String(submitedTime);
            const time = String(Nowtime);

            if(sp_submited.slice(6, 8) === time.slice(6, 8)) {
                distilled_user_array.push(spItem);
            }
          }
        }

        console.log(distilled_user_array)

    return new Response(JSON.stringify(distilled_user_array))
}
  
export { distilled_user_within_24hours };