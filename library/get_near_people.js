// この関数で今の自分の周りのユーザが検索できる
async function get_around_people(req,kv) {
    // 近くにいるユーザを保持する配列
    const nearuserArray = [];

    // リクエストのペイロードを取得
    const id = new URL(req.url).searchParams.get("id");
    // JSONの中から欲しい情報を取り出す
    const userID = Number(id); //useridの取得

    // 自分自身を取得
    const getMyself = await kv.get(["user", userID]);
    const user = getMyself.value;

    // データを全取得するためのイテレーターを作成する
    const userIterator = await kv.list({
        prefix: ["user"],
    });

    // 自分自身の緯度経度
    const Mylatitude = Number(user.latitude);
    const Mylongitude = Number(user.longitude);

    // 自分自身とユーザー一覧の緯度と経度を取得して一致したものだけを抽出する
    for await (const userItem of userIterator) {
        if(userItem.value.latitude === undefined) {
             continue;
        }

        console.log(userItem.value.latitude)
        console.log(userItem.value.longitude)

        const latitidediff = Math.abs(Number(userItem.value.latitude) - Mylatitude) 
        const longitudedediff = Math.abs(Number(userItem.value.longitude) - Mylongitude) 
        

        if(latitidediff < 0.0005000 && longitudedediff < 0.001000) {
            nearuserArray.push(userItem)
        }
    }    

    
    return new Response(JSON.stringify(nearuserArray));
}

  
export { get_around_people };