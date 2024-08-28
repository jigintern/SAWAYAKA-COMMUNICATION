//IDの人のグレードをJOSNのような文字列で返す。
//中身 : {"grade" : <数値>, "gradeTitle" : <数値に一致する文字列>}
async function Get_grade(ID, kv) {
    // IDのユーザーデータを取得
    const data = await kv.get(["user", Number(ID)]);
    const sendedSpCount = Number(data.value.sendedSpCount);

    //グレード一覧作成
    const gradeList = [
        {point:0,name:"error01_バグを管理者に問い合わせてください"},
        {point:1,name:"さわやか始めました"},
        {point:3,name:"あいさつ達人"},
        {point:5,name:"おしゃべり仙人"},
        {point:7,name:"みんなの親友"},
        //SPの送信数から計算する仕様
    ]

    // リザルトに格納
    const result = {
        "grade": 0,
        "gradeTitle": ""
    };
    for(let i = (gradeList.length - 1); i >= 0; i--){
        if(sendedSpCount >= gradeList[i].point){
            result.grade = i;
            result.gradeTitle = gradeList[i].name;
            break;
        }
    }

    //console.log(result);
    return new Response(JSON.stringify(result));
  }
  export { Get_grade };