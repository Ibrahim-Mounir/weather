// apiKey: edb302091d6b421aa57211403240410
let searchInput = document.getElementById("search");
let searchBtn = document.querySelector(".search-btn");
let weather;
let dayName;
let monthName;
let lad;
let lon;

// displaying the weather on click
searchBtn.addEventListener("click", function () {
  getWeather(searchInput.value);
});
// displaying the weather on input change
searchInput.addEventListener("input", function () {
  getWeather(searchInput.value);
});
async function getWeather(latitude, longitude) {
  weather = await fetchApi(latitude, longitude);
  if (!weather.error) {
    displayInfo();
  }
}
// asking to get the location permission and display it
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeather(latitude, longitude);
    },
    (error) => {
      getWeather("cairo");
    }
  );
} else {
}
// fetching api
async function fetchApi(latitude, longitude) {
  let response = await fetch(
    `
    
   
     http://api.weatherapi.com/v1/forecast.json?key=edb302091d6b421aa57211403240410&q=${latitude},${longitude}&days=3`
  );
  weather = await response.json();

  return weather;
}
// getting the name of the day
function getDayName(forecastDayIndex) {
  let date = new Date(weather.forecast.forecastday[forecastDayIndex].date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  return (dayName = days[dayIndex]);
}
// getting the name of the Month
function getDayAndMonth(forecastDayIndex) {
  let date = new Date(weather.forecast.forecastday[forecastDayIndex].date);
  let day = date.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthIndex = date.getMonth();
  return (monthName = `${day} of ${months[monthIndex]}`);
}
// displaying the weather in the html
function displayInfo() {
  let box = `
  <div class="col-lg-4 p-0">
            <div class="today-card card-height">
              <div class="card-heading d-flex justify-content-between">
                <span class="day"> ${getDayName(0)}</span>
                <span class="date"> ${getDayAndMonth(0)} </span>
              </div>
              <div class="card-body">
                <span class="city">${weather.location.name}</span>
                <h3 class="degree text-white">
                ${weather.current.temp_c}
                 <sup>o</sup>C
                </h3>
                <img
                  src="${weather.forecast.forecastday[0].day.condition.icon}"
                "
                style="width:90px"
                  alt=""
                />
                <span class="text-sky d-block mb-3">
                ${weather.current.condition.text}
                </span>
                <ul class="d-flex weather-info">
                  <li class="fw-light">
                    <i class="fa-solid fa-droplet"></i>
                     ${weather.current.humidity}%
                  </li>
                  <li class="fw-light">
                    <i class="fa-solid fa-wind"></i>
                    ${weather.current.wind_kph}km/h
                  </li>
                  <li class="fw-light">
                    <i class="fa-regular fa-compass"></i>
                    ${weather.current.wind_dir}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4 p-0">
            <div class="tomorrow-card card-height">
              <div class="card-heading d-flex justify-content-center">
                <span class="day"> 
                  ${getDayName(1)}
                 </span>
              </div>
              <div
                class="card-body d-flex justify-content-center flex-column align-items-center"
              >
                <img
                  src="${weather.forecast.forecastday[1].day.condition.icon}
                "
                  alt=""
                />

                <span class="max-degree text-white">${
                  weather.forecast.forecastday[1].day.maxtemp_c
                } <sup>o</sup>C</span>
                <span class="min-degree">${
                  weather.forecast.forecastday[1].day.mintemp_c
                } <sup>o</sup>C </span>

                <span class="text-sky d-block mb-3">${
                  weather.forecast.forecastday[1].day.condition.text
                }</span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 p-0">
            <div class="day-after-card card-height">
              <div class="card-heading d-flex justify-content-center">
                <span class="day">${getDayName(2)} </span>
              </div>
              <div
                class="card-body d-flex justify-content-center flex-column align-items-center"
              >
                <img
                  src="${weather.forecast.forecastday[2].day.condition.icon}
                "
                  alt=""
                />
                <span class="max-degree text-white">${
                  weather.forecast.forecastday[2].day.maxtemp_c
                } <sup>o</sup>C</span>
                <span class="min-degree">${
                  weather.forecast.forecastday[2].day.mintemp_c
                } <sup>o</sup>C</span>
                <span class="text-sky d-block mb-3">${
                  weather.forecast.forecastday[2].day.condition.text
                }</span>
              </div>
            </div>
          </div>
  `;
  document.getElementById("rowData").innerHTML = box;
}
