function appearDoneText() {
  document.getElementById("comp_check").classList.add("done");
}

function transToProfile(id) {
  window.location.href = `/profile?id=${id}`;
}

async function sendSP() {
  const input = document.getElementById('id_input_form');
  const input2 = document.getElementById('sp_input_form');
  if (input.value === '' || input2.value === '') {
    const notificationBanner = document.createElement("div");
    notificationBanner.classList.add("notification");
    notificationBanner.addEventListener("click", () => {
      notificationBanner.classList.add("close")
    })
    notificationBanner.addEventListener("click", () => {
      setTimeout(() => {
        notificationBanner.remove()
      }, 500)
    })
    const htmlText = `<p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#b88c07" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>`
    if(input.value === '' && input2.value === ''){
      notificationBanner.innerHTML = `${htmlText}idとさわやかポイントが未入力です</p>`;
      document.getElementById("notification").appendChild(notificationBanner);
      return;
    }
    if(input.value === ''){
      notificationBanner.innerHTML = `${htmlText}idが未入力です</p>`;
      document.getElementById("notification").appendChild(notificationBanner);
      return;
    }
    if(input2.value === ''){
      notificationBanner.innerHTML = `${htmlText}さわやかポイントが未入力です</p>`;
      document.getElementById("notification").appendChild(notificationBanner);
      return;
    }
  }
  //未入力処理終わり

  const id = document.querySelector("#id_input_form").value;
  const sp = document.querySelector("#sp_input_form").value;

  const data = localStorage.getItem("current_user");
  const fromID = Number(JSON.parse(data).id); //ローカルストレージからIDを取得(送信者ID)

  await fetch("/components/up_leaf.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#leaf").innerHTML = data);

  const response = await fetch("/sp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fromID,
      sendId: id,
      sendText: sp,
    }),
  });

  if (response.status === 200) { //クエストクリアを実装
    //ローカルストレージに完了時間を保存
    const data2 = localStorage.getItem("current_user");
    const ID = Number(JSON.parse(data2).id);
    const newData = JSON.parse(data2);
    newData.quest_completed_time = await GetNowTime();
    newData.tutorialEnded = true;//チュートリアル脱却
    localStorage.setItem("current_user", JSON.stringify(newData)); //ローカルストレージにクエスト完了時間を保存

    //データベースに完了時間を記録
    const mode = 1; //クエストを完了にするモード
    await fetch("/quest_completed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        ID,
      }),
    });

    localStorage.setItem("submitted_previous",
      JSON.stringify({
        id: Number(id)
      })
    )

    setTimeout(appearDoneText, 500);
    setTimeout(() => transToProfile(id), 1500);
  } else {
    const error_message = await response.text();
    console.error(error_message)
    document.getElementById("comp_check").innerHTML = `<center>Error Occurred<br>${error_message}<br><small>プロフィールへ戻ります</small></center>`;
    setTimeout(appearDoneText, 0);
    setTimeout(() => transToProfile(fromID), 2000);
  }
}

async function GetNowTime() {
  const result = await fetch("/time", {
    method: "GET",
  });
  const nowTime = await result.text();
  return nowTime;
}
