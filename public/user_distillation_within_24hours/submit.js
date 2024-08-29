window.onload = async (event) => {
    const current_user_profile = await JSON.parse(localStorage.getItem("current_user"))
    console.log("今の自分のIDは");
    console.log(current_user_profile);

    const id = current_user_profile.id


    const userResponse = await fetch(`/distilled_user?id=${id}`, {
        method: "GET",
    })

    const data = await userResponse.json(); //
    console.log(data)
}