//IDの人のグレードをJSONのような文字列で返す。
//中身 : {"grade" : <数値>, "gradeTitle" : <数値に一致する文字列>}
async function getGrade(req, kv) {
  // IDのユーザーデータを取得
  const id = new URL(req.url).searchParams.get("id");
  const data = await kv.get(["user", Number(id)]);
  const sendedSpCount = Number(data.value.sendedSpCount);

  //グレード一覧作成
  const gradeList = [
    { point: 0, name: "グレードなし" },
    { point: 1, name: "さわやか始めました" },
    { point: 3, name: "あいさつ達人" },
    { point: 5, name: "おしゃべり仙人" },
    { point: 7, name: "みんなの親友" },
    //SPの送信数から計算する仕様
  ];

  // リザルトに格納
  const result = {
    "grade": 0,
    "gradeTitle": "グレードなし",
  };
  for (let i = gradeList.length - 1; i >= 0; i--) {
    if (sendedSpCount >= gradeList[i].point) {
      result.grade = i;
      result.gradeTitle = gradeList[i].name;
      break;
    }
  }

  return Response.json(result);
}
export { getGrade };
