if ('geolocation' in navigator) {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition((position) => {
    console.log(`latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);
  });
} else {
  console.error('this browser has not support geolocation.');
}