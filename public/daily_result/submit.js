window.onload = async (event) => {
  const current_user_profile = await JSON.parse(
    localStorage.getItem("current_user"),
  );
  const id = current_user_profile.id;

  const userResponse = await fetch(`/distilled_user?id=${id}`, {
    method: "GET",
  });

  const data = await userResponse.json();

  const usr_name_content = document.getElementById("content_container2");
  const usr_name_el = document.getElementById("contacted_username");
  const usercontent_el = document.getElementById("contacted_time");
  const usercontent_time_el = document.getElementById("user_card_container_0");

  for (let step = 0; step < data.length; step++) {
    //ローカルストレージ
    const myData = await localStorage.getItem("current_user");
    const ID = Number(JSON.parse(myData).id); //自身のID取得

    // 各イテレーションで配列の要素セット
    let current_iterate_username = data[step].key[1];
    if (ID === data[step].key[1]) {
      current_iterate_username = data[step].value.User;
    } //自身の送信したものなら送信先を見る
    const current_iterate_contact_time = data[step].value.time;

    // 新しいdiv要素を作成
    const outDiv = document.createElement("div");
    const idDiv = document.createElement("div");
    const timeDiv = document.createElement("div");

    outDiv.id = "content_container";
    // コンテナに追加する
    usr_name_content.appendChild(outDiv);

    // 生成されたdivにidと送られたテキストを設定する
    idDiv.textContent = `交流した相手のID:${current_iterate_username}`;
    timeDiv.textContent = `交流した時間：${
      formatDateTime(current_iterate_contact_time)
    }`;

    // 生成したdivタグにidやclass名を与える
    idDiv.className = `user_card_container`;
    idDiv.id = `user_card_container_${step}`;

    // コンテナに追加する
    outDiv.appendChild(idDiv);
    outDiv.appendChild(timeDiv);
  }
};

//時間を表示
function formatDateTime(dateTimeString) {
  // 正規表現を使用して分割
  const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
  const match = dateTimeString.match(regex);

  if (match) {
    const [, year, month, day, hour, minute] = match;
    return `${year}年${parseInt(month)}月${
      parseInt(day)
    }日${hour}時${minute}分`;
  } else {
    throw new Error("Invalid ISO string format");
  }
}
