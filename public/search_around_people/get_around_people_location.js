// 定期的に自分の周りのユーザ情報を受け取る
setInterval( async () => {
    // ローカルストレージから今のユーザIDを取得する
    const current_user_profile = JSON.parse(localStorage.getItem("current_user"))
    const id = current_user_profile.id; // 今のユーザIDを格納する


    const userResponse = await fetch(`/get_around_people?id=${id}`, {
        method: "GET",
    })

    console.log(await userResponse.json());

}, 10000); // 10秒ごとに取得する
