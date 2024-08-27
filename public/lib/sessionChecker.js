const current_user_login = localStorage.getItem("current_user");
if (!current_user_login) {
  if (new URL(window.location.href).pathname !== '/welcome') {
    window.location.href = "/welcome";
  }
}
