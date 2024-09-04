globalThis.onload = async (event) => {
    const current_user_profile = await JSON.parse(localStorage.getItem("current_user"))
    const id = current_user_profile.id;

    const userResponse = await fetch(`/distilled_user?id=${id}`, {
        method: "GET",
    })

    const data = await userResponse.json(); 


    const usr_name_content = document.getElementById("itemList");   


    for (let step = 0; step < data.length; step++) {
      //ローカルストレージ
      const myData = await localStorage.getItem('current_user');
      const ID = Number(JSON.parse(myData).id);//自身のID取得

        // 各イテレーションで配列の要素セット
        let current_iterate_username = data[step].key[1];
        if(ID === data[step].key[1]){current_iterate_username = data[step].value.User;}//自身の送信したものなら送信先を見る
        const current_iterate_contact_time = data[step].value.time;
        
        // 新しいdiv要素を作成
        /**
         * @type {HTMLDivElement}
         */
        const outDiv = document.createElement('div');
        const idDiv = document.createElement('div');
        const timeDiv = document.createElement('div');

        outDiv.id = "content_container";
        outDiv.classList.add("item")
        // コンテナに追加する
        usr_name_content.appendChild(outDiv);

        
        outDiv.innerHTML = `
        <div>
          <div class="user_link_outer">
            <a href="/profile?id=${current_iterate_username}">
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </a>
          </div>
        </div>
        `

        // 生成されたdivにidと送られたテキストを設定する
        // idDiv.textContent = `交流した相手のID:${current_iterate_username}`;
        // timeDiv.textContent = `交流した時間：${formatDateTime(current_iterate_contact_time)}`;

        // 生成したdivタグにidやclass名を与える
        idDiv.className = `user_card_container`;
        idDiv.id = `user_card_container_${step}`;

        // コンテナに追加する
        outDiv.appendChild(idDiv);
        outDiv.appendChild(timeDiv);
    }
}

//時間を表示
function formatDateTime(dateTimeString) {
    // 正規表現を使用して分割
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    const match = dateTimeString.match(regex);

    if (match) {
      const [, year, month, day, hour, minute] = match;
      return `${year}年${parseInt(month)}月${parseInt(day)}日${hour}時${minute}分`;
    } else {
      throw new Error('Invalid ISO string format');
    }
  }