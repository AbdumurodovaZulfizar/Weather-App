const units = 'metric';
const weather = 'weather';
const forecast = 'forecast';
const apikey = '1e5394de52aa39130605c6aa2683f951';


const fetchweather = async (city) => {
  const baseurl = `https://api.openweathermap.org/data/2.5/${weather}`;
  const query = `?q=${city}&units=${units}&appid=${apikey}`;
  const response = await fetch(baseurl + query);
  const data = await response.json();
  if (data.cod === 200) {
    document.querySelector('.text-warning').style.display = 'none';
    return data;
  }

  document.querySelector('.text-warning').style.display = 'block';
  throw new Error('Can not find city, please try again.');
};

const fetchforecast = async (city) => {
  const baseurl = `https://api.openweathermap.org/data/2.5/${forecast}`;
  const query = `?q=${city}&units=${units}&appid=${apikey}`;
  const response = await fetch(baseurl + query);
  const data = await response.json();
  return { data };
};

export { fetchforecast, fetchweather };