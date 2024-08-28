addEventListener("load", () => {
  const current_user_footer = localStorage.getItem("current_user");
  document.getElementById("footer_link_profile").setAttribute(
    "href",
    `/profile?id=${JSON.parse(current_user_footer).id}`,
  );
});
