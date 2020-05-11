const displayTime = () => {
  let clock = document.querySelector("#clock");

  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let meridian = "AM";

  //set meridian
  if(hours >= 12)
    meridian = "PM";

  //set hours
  if(hours > 12)
    hours = hours - 12;
  if(hours < 10)
    hours = "0" + hours;

  // Set Minutes
  if(minutes < 10)
    minutes = "0" + minutes;

  // Set Seconds
  if(seconds < 10)
    seconds = "0" + seconds;

  clock.textContent = `${hours}:${minutes}:${seconds} ${meridian}`;

  changeImage();
}

const changeImage = () => {
  let meme = document.querySelector(".meme img");
  const currentHour = new Date().getHours();

  if(currentHour === 3){
    meme.src = "./assets/3am.jpeg";
    return;
  }

  if(currentHour >= 5 && currentHour < 12)
    meme.src = "./assets/morning.jpg";
  else if(currentHour >= 12 && currentHour < 18)
    meme.src = "./assets/afternoon.jpg";
  else if(currentHour >= 18 && currentHour < 22)
    meme.src = "./assets/evening.jpg";
  else if(currentHour >= 22 && currentHour < 5)
    meme.src = "./assets/night.jpg";
}

displayTime();
setInterval(displayTime,1000);
