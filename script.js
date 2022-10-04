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
    getAndDisplayImage(data);

    description.textContent = data.weather[0].description;
    city.textContent = data.name;
    country.textContent = data.sys.country;
    temp.textContent = data.main.temp;
    feelsLike.textContent = data.main.feels_like;
    humidity.textContent = data.main.humidity;
    maxTemp.textContent = data.main.temp_max;
    minTemp.textContent = data.main.temp_min;
}

let essentailInfoContainer = document.querySelector('.essential-info');
function getAndDisplayImage(data) {

    //first, this block of code checks if the essental info container already has an image or not. if it does, then the if statement code deletes that image. this is useful when we are searching weather for city after city
    let firstChildOfEssentailInfo = document.querySelector('.essential-info *:first-child');
    if(firstChildOfEssentailInfo.className === 'weather-image') essentailInfoContainer.removeChild(firstChildOfEssentailInfo);


    fetch(`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`, { mode: 'cors' })
        .then(response => {
            if (response.status === 200) {
                let weatherImage = document.createElement('img');
                weatherImage.classList.add('weather-image');
                weatherImage.src = response.url;
                essentailInfoContainer.prepend(weatherImage);
            }
        })
}



let unitSwitchButton = document.querySelector('#unit-switch-button');
console.log(unitSwitchButton.classList);
let allUnitTemp = document.querySelectorAll('.temp-unit');

unitSwitchButton.addEventListener('click', () => {

        if(unitSwitchButton.classList.contains('metric')) {

            allUnitTemp.forEach((node) =>  {
                node.classList.remove('metric');
                node.classList.add('imperial');
            });

            unitSwitchButton.classList.remove('metric');
            unitSwitchButton.classList.add('imperial');
            unitSwitchButton.textContent = ' °C';
        }
        else {

            allUnitTemp.forEach((node) =>  {
                node.classList.remove('imperial');
                node.classList.add('metric');
            });

            unitSwitchButton.classList.remove('imperial');
            unitSwitchButton.classList.add('metric');
            unitSwitchButton.textContent = ' °F';
        }
});



window.addEventListener('load', () => {
    getWeather('KARACHI');
});


