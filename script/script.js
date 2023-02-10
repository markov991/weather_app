import { getPosition, getCityCords, getCity, getWeatherInfo } from "./data.js";

export { searchResults, selectingCityFromSearchResults };

const inputCitySearch = document.querySelector(".search-input");
const weatherInfoContainer = document.querySelector(".weather-inf-container");
const searchResults = document.querySelector(".search-results");

addEventListener("load", () => {
  initApp();
  closingSearchModal();
  eventListenersForSearch();
});

const blurFunction = function () {
  searchResults.classList.contains("hidden")
    ? weatherInfoContainer.classList.remove("blur")
    : weatherInfoContainer.classList.add("blur");
};

const closingSearchModal = function () {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      searchResults.classList.add("hidden");
      inputCitySearch.value = "";
    }
    blurFunction();
  });
};

const selectingCityFromSearchResults = function (citi) {
  const searchResults_cities = document.querySelectorAll(".search-result");
  searchResults_cities.forEach((resultCity, i) => {
    resultCity.addEventListener("click", () => {
      getWeatherInfo(citi[i].latitude, citi[i].longitude);
      document.querySelector(".city-name").innerHTML = citi[i].name;
      inputCitySearch.value = "";

      searchResults.classList.add("hidden");
      blurFunction();
    });
  });
};

const eventListenersForSearch = function () {
  inputCitySearch.addEventListener("keydown", (e) => {
    if (inputCitySearch.value.length > 2) {
      if (e.key === "Enter") {
        gettingSearchresults();
      }
    }
  });
  document.querySelector(".search-icon").addEventListener("click", () => {
    if (inputCitySearch.value.length > 2) {
      gettingSearchresults();
    }
  });
};

const gettingSearchresults = function () {
  getCityCords(inputCitySearch.value);
  searchResults.innerHTML = "";
  searchResults.classList.remove("hidden");
  blurFunction();
};

const initApp = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const city = await getCity(lat, lng);
    const weatinfo = await getWeatherInfo(lat, lng);
  } catch (err) {
    console.error(err);
  }
};
