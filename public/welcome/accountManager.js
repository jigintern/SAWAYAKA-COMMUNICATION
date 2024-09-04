function appearDoneText() {
  document.getElementById("comp_check").classList.add("done");
}

function transToProfile() {
  location.reload();
}

async function createAccount() {
  const input = document.getElementById("input_user_hobby");
  if (input.value === "") {
    const notificationBanner = document.createElement("div");
    notificationBanner.classList.add("notification");
    notificationBanner.addEventListener("click", () => {
      notificationBanner.classList.add("close");
    });
    notificationBanner.addEventListener("click", () => {
      setTimeout(() => {
        notificationBanner.remove();
      }, 500);
    });
    notificationBanner.innerHTML = `
    <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#b88c07" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
      値が未入力です</p>
    `;
    document.getElementById("notification").appendChild(notificationBanner);
    return;
  }
  //未入力処理終わり

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
  const quest_completed_time = 0; //クエストの完了時間を初期設定では0にする

  console.log("ローカルストレージにユーザーを追加");
  console.log(resJson.id);
  localStorage.setItem(
    "current_user",
    JSON.stringify(
      {
        id: resJson.id,
        hobbyId,
        hobbyContent,
        quest_completed_time, //クエストの完了時間を初期設定では0にする
        tutorialEnded: false,
      },
    ),
  );
}
