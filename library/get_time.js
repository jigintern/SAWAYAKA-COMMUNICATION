//時間取得
function GetNowTime() {
  const diff = 9 * 60 * 60 * 1000; // ミリ秒に変換
  const now = new Date(new Date().getTime() + diff);//日本時間

  //const now = new Date();//世界時間
  console.log(now.toISOString());
  return `${now.toISOString()}`;
}
export { GetNowTime };