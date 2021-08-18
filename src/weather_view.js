const city_name = document.getElementById("city-name");
const city_weather = document.getElementById("city-weather");
const time = document.getElementById("city-time");
const today_icon = document.getElementById("today-icon");
const celcius = document.getElementById("cecius");
const fahrenheit = document.getElementById("fahrenheit");
const wind = document.getElementById("wind");
const humadity = document.getElementById("humadity");
const pressure = document.getElementById("pressure");

const current_time = (timezone) => {
  const date = new Date();
  const utc_time = date.getTime() + date.getTimezoneOffset() * 60000;
  const timeOffset = timezone / 3600;

  const format = {
    weekday: 'long',
    date: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const foreignTime = new Date(
    utc_time + 3600000 * timeOffset,
  ).toLocaleDateString('en-US', format);
  return foreignTime;
};

const update_weather = (data, measure) => {
  const { name, timezone } = data;
  const { description, main, icon } = data.weather[0];
  const { speed } = data.wind;
  const { humadity, pressure } = data.main;
  const { temp } = data.main;
  city_name.innerHTML = name;
  city_weather.innerHTML = description;
  time.innerHTML = current_time(timezone);
  today_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" class="icon-weather" alt="weather-icon">`;
  celcius.innerHTML = `${temp}&degC`;
  const tempF = (temp * 1.8 + 32).toFixed(2);
  fahrenheit.innerHTML = `${tempF}&degF`;
  wind.innerHTML = `${speed} M/S`;
  humadity.innerHTML = `${humadity} %`;
  pressure.innerHTML = `${pressure} hPa`
  document.querySelector(
    'body',
  ).style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${main}')`;

}