const airclick = document.getElementById("airclick");
const weatherClick = document.getElementById("weatherClick");

airclick.onclick = function () {
  let localDivs = document.getElementsByClassName("local");
  for (let i = 0; i < localDivs.length; i++) {
    localDivs[i].style.display = "flex";

    localDivs[i].scrollIntoView({ behavior: 'smooth' });
  }
}

weatherClick.onclick = function () {
  let weatherDiv = document.getElementsByClassName("weather");
  weatherClick.classList.toggle('hidden');
  for (let i = 0; i < weatherDiv.length; i++) {
    weatherDiv[i].style.display = "flex";
    weatherDiv[i].scrollIntoView({ behavior: 'smooth' });
  }
}

