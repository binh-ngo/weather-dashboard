var cityTest = document.getElementById("citySearch");
var currentForecast = document.querySelector(".current-forecast")
var cityButton = document.getElementById("cityButton")
var forecast = document.querySelector(".forecast")
var forecastCards = document.querySelector(".forecast-cards")
var weatherIcon = document.getElementById("weatherIcon")
var cityList = document.querySelector(".cityList")

var APIKey = "0aa2a71fe0af3c26df352abfb4be3c92";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityTest.value + "&appid=" + APIKey;

cityButton.addEventListener('click', clearData(forecast));
cityButton.addEventListener('click', createURL);
cityButton.addEventListener('click', saveInput);

function saveInput () {
    var cityListButton = document.createElement("button");
    var cityListItems = document.createElement("li");
    cityListItems.textContent = cityTest.value;
    cityListButton.appendChild(cityListItems);
    cityList.appendChild(cityListButton)
    cityListButton.addEventListener('click', cityButtonEffect)
    function cityButtonEffect() {
        queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityTest.value + "&appid=" + APIKey;
        cityTest.value = cityListButton.value;
        getWeather(queryURL);
    };
}

function createURL () {
    var newURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityTest.value + "&appid=" + APIKey;
    getWeather(newURL);
}

function clearData(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getWeather(input) { 
    fetch(input)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var iconCode = data.list[0].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        weatherIcon.setAttribute('src', iconURL);
        var cityName = document.createElement("h3");
        var cityTemp = document.createElement("p");
        var cityWind = document.createElement("p");
        var cityHumid = document.createElement("p");
        
        cityName.textContent = `${data.city.name} ${dayjs(data.list[0].dt_txt).format("MMM, DD YYYY")}`;
        var kelvinTemp = data.list[0].main.temp;
        var tempFahr = (kelvinTemp - 273.15) * (9/5) + 32;
        cityTemp.textContent = `Temp: ${tempFahr.toFixed(2)} F`;
        cityWind.textContent = `Wind: ${data.list[0].wind.speed} mph`;
        cityHumid.textContent = `Humidity: ${data.list[0].main.humidity}%`;
        currentForecast.appendChild(cityName);
        currentForecast.appendChild(cityTemp);
        currentForecast.appendChild(cityWind);
        currentForecast.appendChild(cityHumid);

        var fiveForecast = document.createElement("h5");
        fiveForecast.textContent = "5-Day Forecast:";
        forecast.append(fiveForecast);

        
        for (var i = 7; i < data.list.length; i = i + 7) {
            var forecastDate = document.createElement("h6");
            var forecastTemp = document.createElement("p");
            var forecastWind = document.createElement("p");
            var forecastHumid = document.createElement("p");
            var forecastCard = document.createElement("div");
            var forecastWeatherIcon = document.createElement("img");
            var forecastIconCode = data.list[i].weather[0].icon;
            var forecastIconURL = "http://openweathermap.org/img/w/" + forecastIconCode + ".png";
            forecastWeatherIcon.setAttribute('src', forecastIconURL);

                forecastDate.textContent = `${dayjs(data.list[i].dt_txt).format("MMM, DD YYYY")}`;
                var forecastKelvinTemp = data.list[i].main.temp;
                var forecastTempFahr = (forecastKelvinTemp - 273.15) * (9/5) + 32;
                forecastTemp.textContent = `Temp: ${forecastTempFahr.toFixed(2)} F`;
                forecastWind.textContent = `Wind: ${data.list[i].wind.speed} mph`;
                forecastHumid.textContent = `Humidity: ${data.list[i].main.humidity}%`;
                forecast.appendChild(forecastCard);
                forecastCard.appendChild(forecastDate);
                forecastCard.appendChild(forecastWeatherIcon);
                forecastCard.appendChild(forecastTemp);
                forecastCard.appendChild(forecastWind);
                forecastCard.appendChild(forecastHumid);
            }

    }) 
}



