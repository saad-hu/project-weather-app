let cityInputForm = document.querySelector('#userCityInputForm');
let cityInput = document.querySelector('#cityInput');



cityInputForm.addEventListener('submit', event => {
    getWeather(cityInput.value);
    event.preventDefault();
});



async function getWeather(locationInput) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=53987a387db6e49e3e3a52912febaad3&units=metric`;
    fetch(url, { mode: "cors" })
        .then(response => {
            console.log(response);
            if (response.status === 200) return response.json();
            else throw new Error('Could not find city.');
        })
        .then(data => displayData(data))
        .catch(err => console.log("Error: ", err))
}

let description = document.querySelector('.description');
let city = document.querySelector('.city');
let country = document.querySelector('.country');
let temp = document.querySelector('.temp');
let feelsLike = document.querySelector('.feels-like');
let humidity = document.querySelector('.humidity');
let maxTemp = document.querySelector('.max-temp');
let minTemp = document.querySelector('.min-temp');


function displayData(data) {
    console.log(data);
    description.textContent = data.weather[0].description;
    city.textContent = data.name;
    country.textContent = data.sys.country;
    temp.textContent = data.main.temp;
    feelsLike.textContent = data.main.feels_like;
    humidity.textContent = data.main.humidity;
    maxTemp.textContent = data.main.temp_max;
    minTemp.textContent = data.main.temp_min;
}




window.addEventListener('load', () => {
    getWeather('KARACHI');
})


