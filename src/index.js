import 'bootstrap';
import 'jquery';
import { update_forecast, update_weather } from './weather_view';
import { fetch_forecast, fetch_weather } from './weather_api';

const form  = document.getElementById("form");
const city = document.getElementById("city");
const measure = 'metric';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city_value = city.value;
  form.reset();
  fetch_weather(city_value).then((data) => {
    update_weather(data)
  }).catch((err) => {
    document.querySelector(".text-warning").textContent = err.message;
  });
  fetch_forecast(city_value).then((data) => {
    update_forecast(data);
  })
});

window.onload = async () => {
  fetch_weather('Termez')
    .then((data) => {
      update_weather(data);
    })
    .catch((err) => {
      document.querySelector('.text-warning').textContent = err.message;
    });
  fetch_forecast('Termez')
    .then((data) => {
      update_forecast(data);
    })
};
