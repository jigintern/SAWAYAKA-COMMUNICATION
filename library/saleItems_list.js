//アイテムショップのアイテム一覧をここに保存する。
function GET_saleItems_list() {
  const saleItemsList = {
    "sticker": {
      "棒アイス": {
        cost: 1,
        link: "/sticker/ice_stick.svg",
      },
      "メロンクリームソーダ": {
        cost: 2,
        link: "/sticker/melon_cream.svg",
      },
      "スイカ": {
        cost: 1,
        link: "/sticker/water_melon.svg",
      },
    },
  };
  return saleItemsList;
}

export { GET_saleItems_list };
