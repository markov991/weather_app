import {
  renderingCityNames,
  renderForecast,
  renderingCurrentDayWeather,
} from "./renderingFunctions.js";

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getCityCords = function (citi) {
  fetch(`https://api.api-ninjas.com/v1/city?name=${citi}&limit=5`, {
    headers: { "X-Api-Key": "ZQEpIk/4gO7SYrjGkOXOIg==7I38UslgCK3qLI6t" },
  })
    .then((response) => response.json())
    .then((data) => {
      renderingCityNames(data);
    });
};

const getCity = async function (lat, lng) {
  try {
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=bdc_8947c2fa73d94ba6929b32f3d65fe52d`
    );
    if (!resGeo.ok) throw new Error("Problem getting location data");

    const dataGeo = await resGeo.json();

    document.querySelector(".city-name").innerHTML = dataGeo.locality;
  } catch (err) {
    console.error(err);
  }
};

const getWeatherInfo = async function (lat, lng) {
  try {
    const resWeather = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=25e7a6483e9f464093c123807230602&q=${lat},${lng}&days=6&aqi=no&alerts=no`
    );
    if (!resWeather.ok) throw new Error("Problem getting weather data");

    const dataWeather = await resWeather.json();

    renderingCurrentDayWeather(dataWeather);

    renderForecast(dataWeather);
  } catch (err) {
    console.error(err);
  }
};

export { getPosition, getCityCords, getCity, getWeatherInfo };
