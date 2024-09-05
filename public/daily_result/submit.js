globalThis.onload = async (event) => {
  const currentUserProfile = await JSON.parse(
    localStorage.getItem("current_user"),
  );
  const id = currentUserProfile.id;

  const userResponse = await fetch(`/distilled_user?id=${id}`, {
    method: "GET",
  });

  const data = await userResponse.json();

  const userNameContent = document.getElementById("itemList");

  for (let step = 0; step < data.length; step++) {
    //ローカルストレージ
    const myData = await localStorage.getItem("current_user");
    const myID = Number(JSON.parse(myData).id); //自身のID取得

    // 各イテレーションで配列の要素セット
    let currentIterateUsername = data[step]["sourceId"];
    if (myID === data[step]["sourceId"]) {
      currentIterateUsername = data[step]["destinationId"];
    } //自身の送信したものなら送信先を見る
    const currentIterateContactTime = String(data[step]["time"]);

    // 新しいdiv要素を作成
    /**
     * @type {HTMLDivElement}
     */
    const outDiv = document.createElement("div");

    outDiv.id = "content_container";
    outDiv.classList.add("item");

    outDiv.innerHTML = `
      <a href="/profile?id=${currentIterateUsername}">
        <div class="user_link_outer">
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
          ${currentIterateUsername}
        </div>
      </a>
      <div class="user_time_outer">
        <p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
          </span>
          ${formatDateTime(currentIterateContactTime)}</p>
      </div>
      `;
    // コンテナに追加する
    userNameContent.appendChild(outDiv);
  }
};

//時間を表示
function formatDateTime(dateTimeString) {
  // 正規表現を使用して分割
  const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;
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
