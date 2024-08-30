//ステッカーの場所を変更8/28の夜作成
import { GET_saleItems_list } from "./saleItems_list.js";
import { Status } from "https://deno.land/std@0.151.0/http/http_status.ts";

//ステッカーの購入は配置する場所を決めてから。決定ボタンを押すと購入確認が出てSPが足りないとステータス400が返ってくる。
async function POST_sticker_cp(req, kv) {
  // リクエストのペイロードを取得
  const requestJson = await req.json();
  // JSONの中からnextWordを取得
  const ID = requestJson["ID"]; //誰の
  const index = requestJson["itemindex"]; //何番目のアイテムを
  const xPosition = requestJson["xPosition"]; //どこに置くか(x)
  const yPosition = requestJson["yPosition"]; //どこに置くか(y)
  const data = await kv.get(["useritem", Number(ID)]);
  const newValue = data.value; //次に保存するユーザーデータ

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

  const itemName = newValue.hasSticker[index].itemName;
  newValue.hasSticker[index] = {
    itemName, //アイテム名
    X: Number(xPosition), //配置x座標(%)
    Y: Number(yPosition), //配置y座標(%)
  };
  await kv.set(["useritem", Number(ID)], newValue);

  const result = "位置を変更しました。";
  return new Response(result);
}
export { POST_sticker_cp };
