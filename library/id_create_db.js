//サーバーはフロントから送られてきたIDのデータを取得する。なければ新規登録する。
async function ID_create_DB(req, kv) {
  // IDのユーザーデータを取得
  const data = await kv.list({ prefix: ["user"] });
  const { hobbyId, hobbyContent } = await req.json();
  // リザルトに格納
  let max = 0;
  for await (const entry of data) {
    if (max < entry.key[1]) max = entry.key[1];
    //console.log(entry.key + " : " + JSON.stringify(entry.value));
    //console.log("IDが取得できたか? " + entry.key[1]);
  }

  //const grade = 0;//現在のグレード(SPの送信数を基準にする)
  const sendedSpCount = 0; //送ったさわやかポイントの数
  const quest_completed_time = 0; //クエストの完了時間を初期設定ではアカウント作成日にする。
  //変更で初期設定では0にする。

  const key = ["user", max + 1]; //なんのデータか,誰(ID,6桁),何番目の投稿か(7桁)
  const value = {
    hobbyId,
    hobbyContent,
    sendedSpCount,
    quest_completed_time: quest_completed_time,
  };
  await kv.set(key, value);

  //ステッカー機能等、用の個人情報系データベース
  const pointkey = ["useritem", max + 1];
  //keyがuseritemなのは今後の開発でステッカー以外のアイテムが増えることを許容するため。
  const pointvalue = {
    SPcount: 0,
    hasSticker: [],
  };
  await kv.set(pointkey, pointvalue);

  return Response.json({ id: max + 1 }); //IDを返す
}

// function getCurrentDateDay() {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");
//   return `${year}${month}${day}`;
// }

export { ID_create_DB };

async function ID_get_DB(req, kv) {
  // IDのユーザーデータを取得
  const id = new URL(req.url).searchParams.get("id");
  const data = await kv.get(["user", Number(id)]);

  //console.log(data);

  return Response.json(data);
}
export { ID_get_DB };
