import clearImg from './img/clear.jpg';
import cloudImg from './img/cloud.jpg';
import cloudSunImg from './img/cloud-sun.jpg';
import cloudSunRainImg from './img/cloud-sun-rain.jpg';
import rainImg from './img/rain.jpg';
import stormImg from './img/storm.jpg';
import snowImg from './img/snow.jpg';

export function updateLocation(city, country) {
  const locText = document.querySelector('#location-text');
  locText.textContent = `${city}, ${country}`;
}

export function updateTemperature(temp) {
  const tempElement = document.querySelector('#temperature-text');
  tempElement.textContent = `${temp}°C`;
}

export function updateWeatherIcon(type, iconRef = 'main') {
  let weatherIcon;
  let size;
  if (iconRef === 'main') {
    weatherIcon = document.querySelector('#weather-icon i');
    size = 'fa-8x';
  } else {
    weatherIcon = iconRef;
    size = 'fa-2x';
  }

  if (type === 1000) {
    weatherIcon.classList = `fa-solid ${size} fa-sun`;
    changeBackground(clearImg);
  }
  if (type === 1003) {
    weatherIcon.classList = `fa-solid ${size} fa-cloud-sun`;
    changeBackground(cloudSunImg);
  }
  if (
    type === 1006 ||
    type === 1009 ||
    type === 1030 ||
    type === 1135 ||
    type === 1147
  ) {
    weatherIcon.classList = `fa-solid ${size} fa-cloud`;
    changeBackground(cloudImg);
  }
  if (
    type === 1063 ||
    type === 1150 ||
    type === 1153 ||
    type === 1168 ||
    type === 1171 ||
    type === 1189 ||
    type === 1192 ||
    type === 1195 ||
    type === 1198 ||
    type === 1201
  ) {
    weatherIcon.classList = `fa-solid ${size} fa-cloud-rain`;
    changeBackground(rainImg);
  }
  if (type === 1063 || type === 1183 || type === 1186) {
    weatherIcon.classList = `fa-solid ${size} fa-cloud-sun-rain`;
    changeBackground(cloudSunRainImg);
  }
  if (type === 1087 || type === 1240 || type === 1243 || type === 1246) {
    weatherIcon.classList = `fa-solid ${size} fa-cloud-showers-heavy`;
    changeBackground(stormImg);
  }
  if (
    type === 1069 ||
    type === 1072 ||
    type === 1114 ||
    type === 1117 ||
    type === 1204 ||
    type === 1207 ||
    type === 1210 ||
    type === 1213 ||
    type === 1216 ||
    type === 1219 ||
    type === 1222 ||
    type === 1225 ||
    type === 1237 ||
    type === 1249 ||
    type === 1252 ||
    type === 1255 ||
    type === 1258 ||
    type === 1261 ||
    type === 1264 ||
    type === 1273 ||
    type === 1276 ||
    type === 1279 ||
    type === 1282
  ) {
    weatherIcon.classList = `fa-solid ${size} fa-snowflake`;
    changeBackground(snowImg);
  }
}

function changeBackground(bgUrl) {
  document.body.style.background = `url(${bgUrl}) center center/cover`;
}

export function updateDay(
  dayEl,
  temperature,
  weather,
  dayName,
  isActive = false
) {
  const divEl = document.querySelector(`#${dayEl}`);
  const temperatureEl = document.querySelector(`#${dayEl} .temperature-p`);
  const weatherIcoEl = document.querySelector(`#${dayEl} i`);
  const dayTextEl = document.querySelector(`#${dayEl} .day-p`);

  temperatureEl.textContent = `${temperature}°C`;
  updateWeatherIcon(weather, weatherIcoEl);
  dayTextEl.textContent = dayName;

  if (isActive) {
    divEl.style.background = 'rgba(255, 255, 255, 0.274)';
    divEl.style.padding = '0.5rem 0.25rem';
    divEl.style.borderRadius = '5px';
  }
}
