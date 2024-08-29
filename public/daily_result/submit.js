window.onload = async (event) => {
    const current_user_profile = await JSON.parse(localStorage.getItem("current_user"))
    const id = current_user_profile.id;

    const userResponse = await fetch(`/distilled_user?id=${id}`, {
        method: "GET",
    })

    const data = await userResponse.json(); 


    const usr_name_content = document.getElementById("content_container");
    const usr_name_el = document.getElementById("contacted_username");
    const usercontent_el = document.getElementById("contacted_time");
    const usercontent_time_el = document.getElementById("user_card_container_0");
   


    for (let step = 0; step < data.length; step++) {
        // 各イテレーションで配列の要素セット
        const current_iterate_username = data[step].key[1];
        const current_iterate_contact_time = data[step].value.time;
        
        // 新しいdiv要素を作成
        const idDiv = document.createElement('div');
        const timeDiv = document.createElement('div');
             
        // 生成されたdivにidと送られたテキストを設定する
        idDiv.textContent = `交流した相手のID:${current_iterate_username}`;
        timeDiv.textContent = `交流した時間：${current_iterate_contact_time}`;

        // 生成したdivタグにidやclass名を与える
        idDiv.className = `user_card_container`;
        idDiv.id = `user_card_container_${step}`;

        // コンテナに追加する
        usr_name_content.appendChild(idDiv);
        usr_name_content.appendChild(timeDiv);
    }
}