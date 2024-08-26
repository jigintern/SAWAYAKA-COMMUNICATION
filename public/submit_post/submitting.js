function appearDoneText() {
  document.getElementById("comp_check").classList.add("done");
}

function transToProfile() {
  window.location.href = '/profile';
}

async function sendSP() {
  const id = document.querySelector("#id_input_form").value;
  const sp = document.querySelector("#sp_input_form").value;

  await fetch("/components/up_leaf.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#leaf").innerHTML = data);

  const response = await fetch("/add_DB_SP",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sendId: id, "time": getCurrentDateTime(), sendText: sp })
    });

  console.log(response)

  if (response.status === 200) {
    setTimeout(appearDoneText, 500);
    setTimeout(transToProfile, 1500);
  }

  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}
