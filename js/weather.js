const onPositionGatherErrors = (err) => {
    console.error(err);
}

const getUserLocations = async() => {
    // Get user Location


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( onPositionGathers, onPositionGatherErrors);
    } else {
        onPositionGatherErrors({ message: "Can't Access your location. Please enter your co-ordinates" });
    }
}


let addressValue;
const onPositionGathers = (pos) => {
    let lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4);

    console.log(lat + "<----->" + lon);

    const API_KEY = "aa6c5598db3b46de811c7adf8830cad3";
    const location = [51.507222, -0.127758]; // replace with latitude and longitude coordinates
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&key=${API_KEY}`;

    console.log(url);

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const results = data.results;
            if (results.length > 0) {
                addressValue = results[0].components.county;
                getWeather();
                console.log(addressValue + "-----inside");
            } else {
                console.log("No results found");
            }
        })
        .catch((error) => console.error(error));
}

// // Now you can use the addressValue variable outside of the onPositionGathers function
// console.log("Address value outside the function:", addressValue);

let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon")
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

// search
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if (units !== "metric") {
        // change to metric
        units = "metric"
        // get weather forecast 
        getWeather()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        // change to imperial
        units = "imperial"
        // get weather forecast 
        getWeather()
    }
})



// convert country code to name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country)
}

function getWeather() {
    const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${addressValue}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
        console.log(data)
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        weather__forecast.innerHTML = `<p>${data.weather[0].main}`
        weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
        weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
        weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        weather__humidity.innerHTML = `${data.main.humidity}%`
        weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`
        weather__pressure.innerHTML = `${data.main.pressure} hPa`
    })
}

getUserLocations()
