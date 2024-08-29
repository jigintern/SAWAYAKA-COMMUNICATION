//時間取得
function GetNowTime() {
  const now = new Date();
  console.log(now.toISOString());
  return `${now.toISOString()}`;
}
export { GetNowTime };