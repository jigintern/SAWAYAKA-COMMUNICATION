//サーバーはフロントから送られてきたIDのデータを取得する。なければ新規登録する。
async function ID_create_DB(req,kv) {
    // IDのユーザーデータを取得
    const data = await kv.list({ prefix: ["user"] });
    console.log("データの長さ " + data.size);
    // リザルトに格納
    const result = [];
    for await (const entry of data) {
      result.push({
        key: entry.key,//配列
        value: entry.value,//JSON
      });
      console.log(entry.key + " : " + JSON.stringify(entry.value));

      console.log("IDが取得できたか? "+entry.key[1]);
    }

    //await kv.set("user", value);
    return new Response(result);
}
export { ID_create_DB };



//フロントエンドようにローカルに保存するコードを以下に残しておきます。


// function ID_seve_for_local(req) {
//   const myId = localStorage.getItem("myId");
//   console.log("myIdがあるかどうか " + myId);
//   if(myId === null){
//     const key = "myId"; //なんのデータか,誰(ID,6桁),何番目の投稿か(7桁)
//     const value = req;
//     console.log("\n" + key + " : " + req);
//     localStorage.setItem(key, value);
  
//     //const result = "送ろうとしました";
//     //return new Response(result);
//     return req;
//   }else{
//     return myId;
//   }
// }

// export { ID_seve_for_local };