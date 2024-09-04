//ステッカーの購入を行う。
import { getSaleItemsList } from "./saleItems_list.js";

//ステッカーの購入は配置する場所を決めてから。決定ボタンを押すと購入確認が出てSPが足りないとステータス400が返ってくる。
async function postBuySticker(req, kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const ID = requestJson["ID"]; //誰が買うか
  const itemName = requestJson["itemName"]; //何を買うか
  const xPosition = requestJson["xPosition"]; //どこに置くか(x)
  const yPosition = requestJson["yPosition"]; //どこに置くか(y)
  const data = await kv.get(["useritem", Number(ID)]);
  const newValue = data.value; //次に保存するユーザーデータ

  const itemList = getSaleItemsList(); //商品一覧を取得する

  if (!(itemName in itemList.sticker)) { //商品がない
    const result = "その名前の商品はありません";
    return new Response(result, { status: 400 });
  }
  if (itemList.sticker[itemName].cost > newValue.SPcount) { //お金が足りない
    const result = "SPの送信数が足りません。";
    return new Response(result, { status: 400 });
  }
  if (isNaN(Number(xPosition)) || isNaN(Number(yPosition))) { //座標が数値以外
    const result = "xまたはy座標が数値ではありません。";
    return new Response(result, { status: 400 });
  }
  if (Number(xPosition) < 0 || Number(xPosition) > 1) { //x座標が不正
    const result = "座標が不正です(x座標)";
    return new Response(result, { status: 400 });
  }
  if (Number(yPosition) < 0 || Number(yPosition) > 1) { //x座標が不正
    const result = "座標が不正です(y座標)";
    return new Response(result, { status: 400 });
  }
  //購入が確定

  newValue.SPcount = newValue.SPcount - itemList.sticker[itemName].cost;
  newValue.hasSticker.push({
    itemName, //アイテム名
    X: Number(xPosition), //配置x座標(%)
    Y: Number(yPosition), //配置y座標(%)
  });
  await kv.set(["useritem", Number(ID)], newValue);

  const result = "購入しました。";
  return new Response(result);
}

export { postBuySticker };

//自身の所有ポイントを確認する。戻り値は数値

//ステッカーの購入は配置する場所を決めてから。決定ボタンを押すと購入確認が出てSPが足りないとステータス400が返ってくる。
async function getMyPoint(req, kv) {
  const ID = new URL(req.url).searchParams.get("id");
  const data = await kv.get(["useritem", Number(ID)]);
  const newValue = data.value; //次に保存するユーザーデータ
  return new Response(Number(newValue.SPcount));
}

export { getMyPoint };
