import './style.css';
import * as ui from './ui.js';

let selectedCity = 'auto:ip';

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

  return {
    cityName: responseCurrent.location.name,
    countryName: responseCurrent.location.country,
    currentTemp: responseCurrent.current.temp_c,
  };
}

getData();
