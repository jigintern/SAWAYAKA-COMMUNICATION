async function POST_add_DB_SP(req,kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const fromID = requestJson["fromID"]; //誰が送信したか
  const spNO = requestJson["spNO"]; //何個目のコメントか
  const sendID = requestJson["sendId"]; //誰にまたはコメ主
  const sendTime = requestJson["time"];
  const sendText = requestJson["sendText"];

  const key = ["SP", Number(fromID), Number(spNO)]; //なんのデータか,誰(ID),何番目の投稿か
  console.log("SP_Key_Log " + Number(fromID) + " , " + Number(spNO));
  //console.log("TestLog " + sendID + " , " + sendTime + " , " + sendText);
  //name: "山田"
  const value = {
    User: Number(sendID),
    time: Number(sendTime),
    mainText: sendText,
  };
  console.log(
    "SP_value_log\n" + value.User + "\n" + value.time + "\n" + value.mainText,
  );

  //Deno KVに保存
  //構文 : kv.set(key,value);
  // 第一引数はkey, 第二引数はvalue
  // keyが既に存在する場合は、更新
  //const result = await kv.set([コンマ区切りで文字列か数字のID], { 型(文字列): 値(文字列、数字) });
  //const result = await kv.set(key, value);
  // レスポンスを表示(KVに保存が成功すればコンソールにOKと表示される)
  //console.log(result);

  const result = await kv.set(key, value);
  console.log(result);

  //const result = "送ろうとしました";
  return new Response(result);
}

export { POST_add_DB_SP };
