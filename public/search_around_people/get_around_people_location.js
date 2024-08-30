/// <reference lib="dom" />
// 定期的に自分の周りのユーザ情報を受け取る

const getUsers = async () => {
  // ローカルストレージから今のユーザIDを取得する
  const current_user_profile = JSON.parse(localStorage.getItem("current_user"))
  const id = current_user_profile.id; // 今のユーザIDを格納する


  const userResponse = await fetch(`/get_around_people?id=${id}`, {
    method: "GET",
  })

  const userList = await userResponse.json();
  const list = document.getElementById("user_list")
  console.log(userList)
  list.innerHTML = "";

  for (item of userList) {
    const div = document.createElement("div");
    div.classList.add("user");
    div.innerHTML = `
      <svg id="svg_x5F_leaf" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 747.35 877.82">
      <path class="svg_x5F_leaf_path"
          d="M0,873.85c1.36.25,19.03,3.97,49.48,3.97,18.09,0,39.61-1.31,62.51-5.45,36.32-6.57,68.51-18.93,95.68-36.74,33.9-22.23,59.92-52.96,77.38-91.35,87.24,48.42,186.2,13.76,202.67,7.99,164.25-57.55,218.73-252.15,237.35-318.69,54.46-194.56-4.33-363.59-33.76-433.58,7.19,58.78-103.84,112.64-207.37,166.96-103.53,54.32-273.61,83.83-306.88,281.09-15.62,92.62,2.35,210.16,76.69,274.37,18.08-152.57,202.81-316.97,202.81-316.97,0,0-112.46,168.42-186.14,329.81l-3.04,6.64c-29.76,61.72-82.85,99.94-157.92,113.64-58.45,10.67-108.96,1.67-109.46,1.58v16.73Z" />
      </svg>
      `;
    list.appendChild(div)
  }
}

globalThis.addEventListener("load", () => getUsers());

setInterval(() => getUsers(), 5000); // 5秒ごとに取得する
