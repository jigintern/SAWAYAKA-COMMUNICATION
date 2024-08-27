async function POST_add_DB_SP(req,kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const fromID = requestJson["fromID"]; //誰が送信したか
  //const spNO = requestJson["spNO"]; //何個目のコメントか
  const sendID = requestJson["sendId"]; //誰にまたはコメ主
  const sendTime = requestJson["time"];
  const sendText = requestJson["sendText"];

  const dataKey=["user", Number(fromID)];
  const data = await kv.get(dataKey);
  const spNO = Number(data.value.sendedSpCount) + 1;
  const newValue = data.value;
  newValue.sendedSpCount = spNO;
  await kv.set(dataKey, newValue);

  const key = ["SP", Number(fromID), Number(spNO)]; //なんのデータか,誰(ID),何番目の投稿か
  //name: "山田"
  const value = {
    User: Number(sendID),
    time: Number(sendTime),
    mainText: sendText,
  };

  //Deno KVに保存
  //構文 : kv.set(key,value);
  // 第一引数はkey, 第二引数はvalue
  // keyが既に存在する場合は、更新
  //const result = await kv.set([コンマ区切りで文字列か数字のID], { 型(文字列): 値(文字列、数字) });
  //const result = await kv.set(key, value);
  // レスポンスを表示(KVに保存が成功すればコンソールにOKと表示される)
  //console.log(result);

  const result = await kv.set(key, value);

  //const result = "仮";
  console.log(result);

  //const result = "送ろうとしました";
  return new Response(result);
}

export { POST_add_DB_SP };
