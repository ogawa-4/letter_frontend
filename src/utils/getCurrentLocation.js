export function getCurrentLocation(setLatitude, setLongitude, setCurrentPosition, setMessage) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat.toString());
        setLongitude(lon.toString());
        setCurrentPosition([lat, lon]);
      },
      (error) => {
        console.error("位置情報の取得に失敗:", error);
        setMessage("位置情報の取得に失敗");
      }
    );
  } else {
    setMessage("このブラウザは位置情報に対応していません");
  }
}
