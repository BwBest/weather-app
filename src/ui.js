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

  switch (type) {
    case 'sun':
      weatherIcon.classList = `fa-solid ${size} fa-sun`;
      break;
    case 'suncloud':
      weatherIcon.classList = `fa-solid ${size} fa-cloud-sun`;
      break;
    case 'cloud':
      weatherIcon.classList = `fa-solid ${size} fa-cloud`;
      break;
    case 'rain':
      weatherIcon.classList = `fa-solid ${size} fa-cloud-rain`;
      break;
    case 'raincloud':
      weatherIcon.classList = `fa-solid ${size} fa-cloud-sun-rain`;
      break;
    case 'storm':
      weatherIcon.classList = `fa-solid ${size} fa-cloud-showers-heavy`;
      break;
    case 'snow':
      weatherIcon.classList = `fa-solid ${size} fa-snowflake`;
      break;
  }
}

export function updateDay(day, temperature, weather, isActive = false) {
  const divEl = document.querySelector(`#${day}`);
  const temperatureEl = document.querySelector(`#${day} .temperature-p`);
  const weatherIcoEl = document.querySelector(`#${day} i`);

  temperatureEl.textContent = `${temperature}°C`;
  updateWeatherIcon(weather, weatherIcoEl);

  if (isActive) {
  }
}
