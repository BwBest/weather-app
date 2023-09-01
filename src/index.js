import './style.css';
import * as ui from './ui.js';

let selectedCity = 'auto:ip';
const forecastArray = [];

function initalize() {
  console.log('initalizing..');
  const data = getData().then((value) => {
    console.log(value);
    ui.updateTemperature(value.currentTemp);
    ui.updateLocation(value.cityName, value.countryName);
    ui.updateWeatherIcon(value.forecastArray[0].condition);

    configureDays();
  });
}

function configureDays() {
  for (let i = 0; i < forecastArray.length; i++) {
    ui.updateDay(
      `day${i}`,
      forecastArray[i].temperature,
      forecastArray[i].condition,
      forecastArray[i].dayName
    );
  }
}

async function getData() {
  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=bb0f91bbe7304e7286c165412233008&q=${selectedCity}`,
      { mode: 'cors' }
    );
    const forecastData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=bb0f91bbe7304e7286c165412233008&q=${selectedCity}&days=7`,
      { mode: 'cors' }
    );

    const responseCurrent = await data.json();
    const responseForecast = await forecastData.json();

    console.log(responseCurrent);

    const forecastsJSON = responseForecast.forecast.forecastday;

    // Reset forecast array first
    forecastArray.splice(0, forecastArray.length);

    forecastsJSON.forEach((item) => {
      const fDate = new Date(item.date);
      forecastArray.push({
        dayName: calculateDay(fDate.getDay()),
        temperature: item.day.avgtemp_c,
        condition: item.day.condition.code,
      });
      console.log(forecastArray);
    });

    return {
      cityName: responseCurrent.location.name,
      countryName: responseCurrent.location.country,
      currentTemp: responseCurrent.current.temp_c,
      forecastArray,
    };
  } catch {
    throw new Error("Couldn't get data from the server");
  }
}

function calculateDay(day) {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  return days[day];
}

function enterSearchMode() {
  const locationDiv = document.querySelector('#location-div');
  const locationText = document.querySelector('#location-text');
  const searchBox = document.querySelector('#search-box');
  const input = document.querySelector('#search-box input');

  locationDiv.classList.add('hidden');
  searchBox.classList.remove('hidden');
  input.value = locationText.textContent;
}

function changeLocation() {
  const locationDiv = document.querySelector('#location-div');
  const locationText = document.querySelector('#location-text');
  const searchBox = document.querySelector('#search-box');
  const input = document.querySelector('#search-box input');

  locationDiv.classList.remove('hidden');
  searchBox.classList.add('hidden');
  selectedCity = input.value;
  console.log('Change');
  initalize();
}

window.addEventListener('load', initalize);
document
  .querySelector('#location-div')
  .addEventListener('click', enterSearchMode);

document.querySelector('#search-btn').addEventListener('click', changeLocation);
