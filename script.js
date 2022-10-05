//reference to form
let cityInputForm = document.querySelector('#userCityInputAndUnitForm');
let cityInput = document.querySelector('#cityInput');
//refernce to main output-container in which all the data is displayed
let outputContainer = document.querySelector('.output-container');
//refernce to every element, in which we have to display info:
let description = document.querySelector('.description');
let city = document.querySelector('.city');
let country = document.querySelector('.country');
let temp = document.querySelector('.temp');
let feelsLike = document.querySelector('.feels-like');
let humidity = document.querySelector('.humidity');
let maxTemp = document.querySelector('.max-temp');
let minTemp = document.querySelector('.min-temp');
//refernce to error container and all its components
let errorContainer = document.querySelector('.error-container');
let errorContent = document.querySelector('.error-content');
let errorCloseButton = document.querySelector('.error-close-button');
//refernce to unit switiching button
let unitSwitchButton = document.querySelector('.unit-switch-button');
//reference to all the elements that have units that require unit switching
let allUnitTemp = document.querySelectorAll('.temp-unit');


//at the start, default city's weather will be displayed
window.addEventListener('load', () => {
    getWeather('KARACHI', unitSwitchButton.id);
});

//upon user searching a city, this eveent listener trigers
cityInputForm.addEventListener('submit', event => {
    getWeather(cityInput.value, unitSwitchButton.id);
    event.preventDefault();
    cityInputForm.reset();
});



async function getWeather(locationInput, unit) {

    hideOutputContainer(true);
    hideError(); //if any error message form prevoius error, this hides it

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=53987a387db6e49e3e3a52912febaad3&units=${unit}`;
    fetch(url, { mode: "cors" })
        .then(response => {
            if (response.status === 200) return response.json();
            else throw new Error('Could not find city.');
        })
        .then(data => displayData(data))
        .catch(err => displayError(err));
}

function hideOutputContainer(hidden) {

    //the hidden class has css attatched to it that hides the container
    if (hidden) outputContainer.classList.add('hidden');

    else {
        outputContainer.style['display'] = 'flex';

        setTimeout(() => {
            outputContainer.classList.remove('hidden');
        }, 1000);
    }

}

function displayData(data) {

    setTimeout(() => {
        getAndDisplayImage(data);

        description.textContent = data.weather[0].description;
        city.textContent = data.name;
        country.textContent = data.sys.country;
        temp.textContent = data.main.temp;
        feelsLike.textContent = data.main.feels_like;
        humidity.textContent = data.main.humidity;
        maxTemp.textContent = data.main.temp_max;
        minTemp.textContent = data.main.temp_min;
    }, 600);





    hideOutputContainer(false);
}



let essentailInfoContainer = document.querySelector('.essential-info');

function getAndDisplayImage(data) {

    //first, this block of code checks if the essental info container already has an image or not. if it does, then the if statement code deletes that image. this is useful when we are searching weather for city after city
    let firstChildOfEssentailInfo = document.querySelector('.essential-info *:first-child');
    if (firstChildOfEssentailInfo.className === 'weather-image') essentailInfoContainer.removeChild(firstChildOfEssentailInfo);


    fetch(`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`, { mode: 'cors' })
        .then(response => {
            if (response.status === 200) {
                let weatherImage = document.createElement('img');
                weatherImage.classList.add('weather-image');
                weatherImage.src = response.url;
                essentailInfoContainer.prepend(weatherImage);
            }
        })
}





unitSwitchButton.addEventListener('click', () => {

    if (unitSwitchButton.id === 'metric') {

        allUnitTemp.forEach((node) => {
            node.classList.remove('metric');
            node.classList.add('imperial');
        });

        unitSwitchButton.setAttribute('id', 'imperial');
        unitSwitchButton.textContent = ' °C';
    }
    else {

        allUnitTemp.forEach((node) => {
            node.classList.remove('imperial');
            node.classList.add('metric');
        });

        unitSwitchButton.setAttribute('id', 'metric');
        unitSwitchButton.textContent = ' °F';
    }
    //call the api again with the current city and new(switched) unit
    getWeather(city.textContent, unitSwitchButton.id);
});



//code for error handling starts here
function displayError(err) {
    errorContent.textContent = err.message;
    errorContainer.style['display'] = 'flex';
}

function hideError() {
    errorContainer.style['display'] = "none";
}

errorCloseButton.addEventListener('click', hideError);