// この関数で今の自分の周りのユーザが検索できる
async function getAroundPeople(req, kv) {
  // 近くにいるユーザを保持する配列
  const nearUserArray = [];

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
  const MyLatitude = Number(user.latitude);
  const MyLongitude = Number(user.longitude);

  // 自分自身とユーザー一覧の緯度と経度を取得して一致したものだけを抽出する
  for await (const userItem of userIterator) {
    if (userItem.value.latitude === undefined) {
      continue;
    }

    const latitudeDiff = Math.abs(Number(userItem.value.latitude) - MyLatitude);
    const longitudeDiff = Math.abs(
      Number(userItem.value.longitude) - MyLongitude,
    );

    if (latitudeDiff < 0.0005000 && longitudeDiff < 0.001000) {
      nearUserArray.push(userItem);
    }
  }

  return new Response(JSON.stringify(nearUserArray));
}

export { getAroundPeople };
