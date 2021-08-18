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

};

const update_forecast_style = (forecast) => {
  const forecast_5day = document.getElementById("day-5");
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const this_week = today.toLocaleString('en-Us', { weekday: 'long'});
  const next_week = tomorrow.toLocaleString('en-Us', {weekday: 'long'});
  forecast_5day.innerHTML = '';
  for (let i  = 0 ;i < forecast.length; i++ ) {
    const one_day = document.createElement("div");
    const element  = forecast[i];
    const options  = {
      weekday: 'long',
    }
    const week_day = element.des_weekday.toLocaleString('en-Us', options);
    const week_days = this_week === week_day ? 'Today': next_week === week_day ? 'Tomorrow': week_day;
    one_day.innerHTML = `<p class='text-center mb-0'>${week_days}</p>
    <img src="https://openweathermap.org/img/wn/${element.weather_icon}.png" class="text-center" alt="weather-icon">
    <p class='text-center mb-0 city-deg'>${element.temperature}&deg</p>`;
    forecast_5day.appendChild(one_day);
  }
};

const update_forecast = (data) => {
  const forecast = [];
  const dataArray = data.data.list;

  for (let i = 3; i < dataArray.length; i += 8) {
    const oneDay = {
      weather: dataArray[i].weather[0].main,
      description: dataArray[i].weather[0].description,
      weather_icon: dataArray[i].weather[0].icon,
      temperature: Math.round(dataArray[i].main.temp),
      des_weekday: new Date(dataArray[i].dt_txt),
    };
    forecast.push(oneDay);
  }

  return update_forecast_style(forecast);
};

export { update_weather, update_forecast }