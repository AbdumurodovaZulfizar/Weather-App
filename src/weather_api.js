const measure = 'metric';
const weather = 'weather';
const forecast = 'forecast';
const api_key = '1e5394de52aa39130605c6aa2683f951'


const fetch_weather = async (city) => {
  const base_url = `https://api.openweathermap.org/data/2.5/${weather}`;
  const query = `?q=${city}&units=${measure}&appid=${api_key}`;
  const response = await fetch(base_url + query);
  const data = await response.join();
  if (data.cod == 200) {
    // document.querySelector('.text-warning').classList.add("d-none");
    return data;
  }

  document.querySelector('.text-warning').classList.add('d-block');
  throw new Error('Can not find city, please try again.');
};

const fetch_forecast = async (city) => {
  const base_url = `https://api.openweathermap.org/data/2.5/${forecast}`;
  const query = `?q=${city}&units=${measure}&appid=${api_key}`;
  const response = await fetch(base_url + query);
  const data = await response.join();
  return { data };
};

export { fetch_forecast, fetch_weather };