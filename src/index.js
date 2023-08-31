import './style.css';
import * as ui from './ui.js';

let selectedCity = 'auto:ip';
const forecastArray = [];

async function getData() {
  const data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=bb0f91bbe7304e7286c165412233008&q=${selectedCity}`,
    { mode: 'cors' }
  );
  const responseCurrent = await data.json();

  const forecastData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=bb0f91bbe7304e7286c165412233008&q=${selectedCity}&days=7`,
    { mode: 'cors' }
  );
  const responseForecast = await forecastData.json();

  const forecastsJSON = responseForecast.forecast.forecastday;

  forecastsJSON.forEach((item) => {
    const fDate = new Date(item.date);
    forecastArray.push({
      dayName: calculateDay(fDate.getDay()),
      temperature: item.day.avgtemp_c,
      conditionText: item.day.condition.text,
    });

    console.log(forecastArray);
  });

  return {
    cityName: responseCurrent.location.name,
    countryName: responseCurrent.location.country,
    currentTemp: responseCurrent.current.temp_c,
    forecastArray,
  };
}

function calculateDay(day) {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  return days[day];
}

getData();
