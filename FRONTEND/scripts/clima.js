// clima.js
// -*- coding: utf-8 -*-

const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062', 
    url: `https://api.openweathermap.org/data/2.5/weather`
}

const cityName = document.querySelector('#city-name');
const weatherIcon = document.querySelector('#weather-icon');
const temperature = document.querySelector('#temperature');
const weatherDescription = document.querySelector('#weather-description');
const temp_min = document.querySelector("#temp-min");
const temp_max =document.querySelector("#temp-max");
const weather_info = document.querySelector('.weather-info');

// Func para obtener la ubicación del usuario (requiere permiso del usuario)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, useDefaultLocation);
    } else {
        useDefaultLocation();
    }
}

// Func para mostrar la ubicación actual
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByCoordinates(lat, lon);
}

// Func para usar la ubicación predeterminada (Cordoba, Argentina)
function useDefaultLocation() {
    getWeather('Cordoba,ar');
}


function buildWeatherQuery(lat, lon) {
    const queryString = new URLSearchParams({
        lat: lat,
        lon: lon,
        appid: api.key,
        lang: 'es',
        
    }).toString();
    return `${api.url}?${queryString}`;
}

// Func para realizar el fetch
function getWeatherByCoordinates(lat, lon) {
    const weatherQuery = buildWeatherQuery(lat, lon);
    fetch(weatherQuery)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos del clima');
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error al obtener datos del clima:', error);
        });
}


// Func para mostrar los datos del clima en la página
function displayWeatherData(data) {
    cityName.textContent = data.name;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    temp_min.textContent = `${Math.round(data.main.temp_min - 273.15)}°C / `;
    temp_max.textContent = `${Math.round(data.main.temp_max - 273.15)}°C`;

    // Modifica el fondo con una imagen
    // weather_info.style.backgroundImage = `URL(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

}

// Llama a getLocation para obtener la ubicación del usuario o usar la ubicación predeterminada
getLocation();
