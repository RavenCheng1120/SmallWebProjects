/*
使用OpenWeather API取得天氣資訊
https://openweathermap.org/current
*/

window.addEventListener("load", () => {
  let long;
  let lat;
  let timezone = document.querySelector(".timezone");
  let temperature = document.querySelector(".degree");
  let description = document.querySelector(".temperature-description");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e6fb45cb63ce0285250749b70e3e8a8a`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          timezone.textContent = data.name;
          temperature.textContent = (data.main.temp-273.15).toFixed(2);
          description.textContent = data.weather[0].description;

          let iconCode = data.weather[0].icon;
          var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          document.getElementById("icon").src = iconUrl;
        });
    });
  }else{
    alert("Not Working!!! AHhhhHHHhh!");
  }

});
