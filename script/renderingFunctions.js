import { searchResults, selectingCityFromSearchResults } from "./script.js";

const renderForecast = function (data) {
  document.querySelector(".weather-forecast-container").innerHTML = "";

  const forecastDay = data.forecast.forecastday;

  for (let i = 1; i < forecastDay.length; i++) {
    document.querySelector(".weather-forecast-container").insertAdjacentHTML(
      "beforeend",
      `
        <div class="forecast">
                <p>Date</p>
                <p class="date">${forecastDay[i].date
                  .slice(5, 10)
                  .replace("-", "/")}</p>
                <img
                  class="condition-img"
                  src=${forecastDay[i].day.condition.icon}
                  alt=""
                />
                <div class="forecast-day">
                  <div class="max-temp">${forecastDay[i].day.maxtemp_c}</div>
                  /
                  <div class="min-temp">${forecastDay[i].day.mintemp_c}</div>
                  &deg;C
                </div>
              </div>
        `
    );
  }
};

const renderingCurrentDayWeather = function (data) {
  document.querySelector(".current-temperature").innerHTML =
    data.current.temp_c;

  document
    .querySelector(".forecast-curr-day")
    .querySelector(".min-temp").innerHTML =
    data.forecast.forecastday[0].day.mintemp_c;

  document
    .querySelector(".forecast-curr-day")
    .querySelector(".max-temp").innerHTML =
    data.forecast.forecastday[0].day.maxtemp_c;

  document
    .querySelector(".condition-curr-day")
    .querySelector(".condition").innerHTML =
    data.forecast.forecastday[0].day.condition.text;

  document
    .querySelector(".condition-curr-day")
    .querySelector(".condition-img").src =
    data.forecast.forecastday[0].day.condition.icon;
};

const renderingCityNames = function (citiSearchResult) {
  citiSearchResult.forEach((citi, i) => {
    searchResults.insertAdjacentHTML(
      "beforeend",
      `
      <div class="search-result">${citi.name}</div>
    `
    );
  });
  selectingCityFromSearchResults(citiSearchResult);
};

export { renderingCurrentDayWeather, renderForecast, renderingCityNames };
