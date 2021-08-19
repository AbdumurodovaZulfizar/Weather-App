const cityname = document.getElementById('city-name');
const cityweather = document.getElementById('city-weather');
const time = document.getElementById('city-time');
const todayicon = document.getElementById('today-icon');
const celcius = document.getElementById('celcius');
const fahrenheit = document.getElementById('fahrenheit');
const wind = document.getElementById('wind');
const humadityplace = document.getElementById('humadity');
const pressureplace = document.getElementById('pressure');

const currenttime = (timezone) => {
  const date = new Date();
  const utctime = date.getTime() + date.getTimezoneOffset() * 60000;
  const timeOffset = timezone / 3600;

  const format = {
    weekday: 'long',
    date: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const foreignTime = new Date(
    utctime + 3600000 * timeOffset,
  ).toLocaleDateString('en-US', format);
  return foreignTime;
};

const updateweather = (data) => {
  const { name, timezone } = data;
  const { description, main, icon } = data.weather[0];
  const { speed } = data.wind;
  const { humidity, pressure } = data.main;
  const { temp } = data.main;
  cityname.innerHTML = name;
  cityweather.innerHTML = description;
  time.innerHTML = currenttime(timezone);
  todayicon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" class="icon-weather" alt="weather-icon">`;
  celcius.innerHTML = `${temp}&degC`;
  const tempF = (temp * 1.8 + 32).toFixed(2);
  fahrenheit.innerHTML = `${tempF}&degF`;
  wind.innerHTML = `${speed} M/S`;
  humadityplace.innerHTML = `${humidity} %`;
  pressureplace.innerHTML = `${pressure} hPa`;
  document.querySelector(
    'body',
  ).style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${main}')`;
};

const updateforecaststyle = (forecast) => {
  const forecast5day = document.getElementById('day-5');
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const thisweek = today.toLocaleString('en-Us', { weekday: 'long' });
  const nextweek = tomorrow.toLocaleString('en-Us', { weekday: 'long' });
  forecast5day.innerHTML = '';
  for (let i = 0; i < forecast.length; i += 1) {
    const oneday = document.createElement('div');
    const element = forecast[i];
    const options = {
      weekday: 'long',
    };
    const weekday = element.desweekday.toLocaleString('en-Us', options);
    const weekdays = thisweek === weekday ? 'Today' : nextweek === weekday ? 'Tomorrow' : weekday; // eslint-disable-line
    oneday.innerHTML = `<p class='text-center mb-0'>${weekdays}</p>
    <img src="https://openweathermap.org/img/wn/${element.weathericon}.png" class="text-center" alt="weather-icon">
    <p class='text-center city-deg'>${element.temperature}&deg</p>`;
    forecast5day.appendChild(oneday);
  }
};

const updateforecast = (data) => {
  const forecast = [];
  const dataArray = data.data.list;

  for (let i = 3; i < dataArray.length; i += 8) {
    const oneDay = {
      weather: dataArray[i].weather[0].main,
      description: dataArray[i].weather[0].description,
      weathericon: dataArray[i].weather[0].icon,
      temperature: Math.round(dataArray[i].main.temp),
      desweekday: new Date(dataArray[i].dt_txt),
    };
    forecast.push(oneDay);
  }

  return updateforecaststyle(forecast);
};

export { updateweather, updateforecast };
