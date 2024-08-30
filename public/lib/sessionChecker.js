const current_user_login = localStorage.getItem("current_user");
if (!current_user_login) {
  if (new URL(window.location.href).pathname !== "/welcome") {
    window.location.href = "/welcome";
  }
} else {
  const mydata = JSON.parse(current_user_login);
  QuestTime(mydata);
}

async function QuestTime(mydata) {
  if (
    mydata.tutorialEnded === false &&
    new URL(window.location.href).pathname !== "/quest" &&
    new URL(window.location.href).pathname !== "/submit_post"
  ) {
    window.location.href = "/quest";
  }
  //クエストの間隔を調整できます。../quest_completed.js Line22も確認
  if (
    (new Date(await GetNowTime()) - new Date(mydata.quest_completed_time)) >=
      300000
  ) { //300000ミリ秒は五分
    if (
      new URL(window.location.href).pathname !== "/quest" &&
      new URL(window.location.href).pathname !== "/submit_post"
    ) {
      window.location.href = "/quest?type=1";
    }
  }
}

async function GetNowTime() {
  const result = await fetch("/time", {
    method: "GET",
  });
  const nowTime = await result.text();
  return nowTime;
}
