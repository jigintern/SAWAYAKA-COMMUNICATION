//時間取得
function getNowTime() {
  const diff = 9 * 60 * 60 * 1000; // ミリ秒に変換
  const now = new Date(new Date().getTime() + diff); //日本時間

  return `${now.toISOString()}`;
}
export { getNowTime };
