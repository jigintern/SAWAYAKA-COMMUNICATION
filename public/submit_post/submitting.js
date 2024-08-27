function appearDoneText() {
  document.getElementById("comp_check").classList.add("done");
}

function transToProfile(id) {
  window.location.href = `/profile?id=${id}`;
}

async function sendSP() {
  const id = document.querySelector("#id_input_form").value;
  const sp = document.querySelector("#sp_input_form").value;

  const data = localStorage.getItem('current_user');

  const fromID = Number(JSON.parse(data).id);//ローカルストレージからIDを取得(送信者ID)
  //const spNO = 1;//さわやかポイントいくつ書いたか読みだしてもういらない。

  await fetch("/components/up_leaf.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#leaf").innerHTML = data);

  const response = await fetch("/add_DB_SP", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fromID,
      sendId: id,
      sendText: sp,
    }),
  });

  console.log(response);

  if (response.status === 200) {
    setTimeout(appearDoneText, 500);
    setTimeout(() => transToProfile(id), 1500);
  } else {
    document.getElementById("comp_check").innerText = "Error Occurred";
    setTimeout(appearDoneText, 500);
  }
}
