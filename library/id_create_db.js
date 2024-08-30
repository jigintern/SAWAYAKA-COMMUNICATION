//サーバーはフロントから送られてきたIDのデータを取得する。なければ新規登録する。
async function idCreateDb(req, kv) {
  // IDのユーザーデータを取得
  const data = await kv.list({ prefix: ["user"] });
  const { hobbyId, hobbyContent } = await req.json();
  // リザルトに格納
  let max = 0;
  for await (const entry of data) {
    if (max < entry.key[1]) max = entry.key[1];
  }

  const sendedSpCount = 0; //送ったさわやかポイントの数
  const questCompletedTime = 0; //クエストの完了時間を初期設定ではアカウント作成日にする。
  //変更で初期設定では0にする。

  const key = ["user", max + 1]; //なんのデータか,誰(ID,6桁),何番目の投稿か(7桁)
  const value = {
    hobbyId,
    hobbyContent,
    sendedSpCount,
    quest_completed_time: questCompletedTime,
  };
  await kv.set(key, value);

  //ステッカー機能等、用の個人情報系データベース
  const pointKey = ["useritem", max + 1];
  //keyがuseritemなのは今後の開発でステッカー以外のアイテムが増えることを許容するため。
  const pointValue = {
    SPcount: 0,
    hasSticker: [],
  };
  await kv.set(pointKey, pointValue);

  return Response.json({ id: max + 1 }); //IDを返す
}

export { idCreateDb };

async function idGetDb(req, kv) {
  // IDのユーザーデータを取得
  const id = new URL(req.url).searchParams.get("id");
  const data = await kv.get(["user", Number(id)]);

  return Response.json(data);
}
export { idGetDb };
