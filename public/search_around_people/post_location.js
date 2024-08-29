// 位置情報を取得するための関数
setInterval(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const data = await localStorage.getItem("current_user");
      const userId = JSON.parse(data).id;

      // 読み込んだ位置情報をサーバーに送信する
      const response = await fetch("/receive_location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          userID: userId,
          latitude: position.coords.latitude,  
          longitude: position.coords.longitude,
          }),
      });
      }, (error) => {
      console.log(`Error: ${error.message}`);
      });
  } else {
      console.log("This browser does not support geolocation.");
  }
  }, 5000000); // 秒ごとに送信する