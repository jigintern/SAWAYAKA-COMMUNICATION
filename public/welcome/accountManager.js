function appearDoneText() {
  document.getElementById("comp_check").classList.add("done");
}

function transToProfile() {
  location.reload();
}

async function createAccount() {
  const hobbyId = document.getElementById("select_user_hobby").value;
  const hobbyContent = document.getElementById("input_user_hobby").value;

  await fetch("/components/up_leaf.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#leaf").innerHTML = data);

  const response = await fetch("/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hobbyId,
      hobbyContent,
    }),
  });

  if (response.status === 200) {
    setTimeout(appearDoneText, 500);
    setTimeout(transToProfile, 1500);
  } else {
    document.getElementById("comp_check").innerText = "Error Occurred";
    setTimeout(appearDoneText, 500);
  }

  const resJson = await response.json();
  const quest_completed_time = 0;//クエストの完了時間を初期設定では0にする

  console.log("ローカルストレージにユーザーを追加");
  console.log(resJson.id);
  localStorage.setItem(
    "current_user",
    JSON.stringify(
      {
        id: resJson.id,
        hobbyId,
        hobbyContent,
        quest_completed_time,//クエストの完了時間を初期設定では0にする
        tutorialEnded: false,
      },
    ),
  );
}
