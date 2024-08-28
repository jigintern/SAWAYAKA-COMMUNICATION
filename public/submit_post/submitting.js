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
  //console.log(response);

  if (response.status === 200) { //クエストクリアを実装
    //newDataはJSON
    const data2 = localStorage.getItem("current_user");
    const ID = Number(JSON.parse(data2).id);
    const newData = JSON.parse(data2);
    newData.quest_completed_time = Number(getCurrentDateDay());
    localStorage.setItem("current_user", JSON.stringify(newData)); //ローカルストレージにクエスト完了時間を保存

    const mode = 1; //クエストを完了にするモード
    await fetch("/quest_completed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        ID,
      }),
    });

    setTimeout(appearDoneText, 500);
    setTimeout(() => transToProfile(id), 1500);
  } else {
    document.getElementById("comp_check").innerText = "Error Occurred";
    setTimeout(appearDoneText, 500);
  }
}

function getCurrentDateDay() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
