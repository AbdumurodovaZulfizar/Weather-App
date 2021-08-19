import 'bootstrap';
import 'jquery';
import { updateforecast, updateweather } from './weather_view';
import { fetchforecast, fetchweather } from './weather_api';

const form = document.getElementById('form');
const city = document.getElementById('city');
const units = 'metric';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityvalue = city.value;
  form.reset();
  fetchweather(cityvalue).then((data) => {
    updateweather(data, units);
  }).catch((err) => {
    document.querySelector('.text-warning').textContent = err.message;
  });
  fetchforecast(cityvalue).then((data) => {
    updateforecast(data);
  });
});

window.onload = async () => {
  fetchweather('Termez')
    .then((data) => {
      updateweather(data, units);
    })
    .catch((err) => {
      document.querySelector('.text-warning').textContent = err.message;
    });
  fetchforecast('Termez')
    .then((data) => {
      updateforecast(data);
    });
};
