const current_user_login = localStorage.getItem("current_user");
if (!current_user_login) {
  if (new URL(window.location.href).pathname !== '/welcome') {
    window.location.href = "/welcome";
  }
}else{
  const mydata = JSON.parse(current_user_login);
  if(Number(getCurrentDateDay()) - Number(mydata.quest_completed_time) > 500){
    if (new URL(window.location.href).pathname !== '/quest' && new URL(window.location.href).pathname !== "/submit_post") {
      window.location.href = "/quest";
    }
  }
}

function getCurrentDateDay() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
