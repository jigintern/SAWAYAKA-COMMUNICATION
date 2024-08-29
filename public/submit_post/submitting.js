function appearDoneText() {
  document.getElementById("comp_check").classList.add("done");
}

function transToProfile(id) {
  window.location.href = `/profile?id=${id}`;
}

async function sendSP() {
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
