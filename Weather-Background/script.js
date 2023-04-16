/*
        WeatherForecastDisplay encapsulates the weather forecast
    */
var WeatherForecastDisplay = (function () {
  //used for looking up a simple text value for the month.
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /*
  * WeatherForecastWidget - encapsulates data retrieval and displau
  */
  function WeatherForecastWidget(selector) {
    //Initialize the widget using the container parameters
    this.config = {
      "location": selector.getAttribute("data-location"),
      "unitGroup": selector.getAttribute("data-unitGroup") || "us",
      "key": selector.getAttribute("data-key")
    }
    //the root HTML tag selector
    this.selector = selector;
    //weather forecasta data
    this.data = null;
    var me = this;
    //constructs Weather API request and then loads the weather forecast data from the Weather API
    this.loadForecastData = function () {
      me.refresh();
      //endpoint
      var uri = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?";
      //parameters
      uri += "unitGroup=" + me.config.unitGroup + "&locationMode=single&aggregateHours=24&contentType=json&iconSet=icons1&location=" + me.config.location + "&key=" + me.config.key;
      fetch(uri)
        .then(response => response.json())
        .then(rawResult => {
          me.data = rawResult;
          me.refresh();
        });
    }

    //displays the weather data inside the container tag
    this.refresh = function () {
      if (!me.data) {
        return;
      }
      var currentData = me.data.location.currentConditions;
      var dateTime = new Date(currentData.datetime)
      const weatherData = {
        location: me.data.location.id,
        weatherIcon: currentData.icon,
        year: dateTime.getFullYear(),
        month: dateTime.getMonth(),
        day: dateTime.getDate(),
        dayOfWeek: dateTime.getDay(),
        Fahrenheit: currentData.temp,
      };
      // console.log(currentData)
      createLocationDivs(weatherData)
    }

    function createLocationDivs(weatherData) {
      const { location, weatherIcon, year, month, day, dayOfWeek, Fahrenheit } = weatherData;
      // Create location divs
      var locationDiv1 = document.createElement("div");
      locationDiv1.classList.add("location");
      locationDiv1.textContent = location;

      // Create weather info div
      var DateInfoDiv = document.createElement("div");
      DateInfoDiv.classList.add("time-info");

      // Append date, time and weather icon info to weatherInfoDiv
      var dateInfo = document.createElement("div");
      dateInfo.textContent = `${MONTHS[month]} ${day} ${year}`;
      DateInfoDiv.appendChild(dateInfo);
      var dayOfWeekInfo = document.createElement("div");
      dayOfWeekInfo.textContent = `${DAYS[dayOfWeek]}`;
      DateInfoDiv.appendChild(dayOfWeekInfo);

      // Create weather temp div
      var weatherInfoDiv = document.createElement("div");
      weatherInfoDiv.classList.add("weather-info");
      // Append Celsius,
      var CelsiusInfo = document.createElement("div");
      CelsiusInfo.textContent = `${Math.round((Fahrenheit - 32) / 1.8)}\xB0C`;
      weatherInfoDiv.appendChild(CelsiusInfo);

      // Create img element for weather icon and set its src
      var weatherIconImg = document.createElement("img");
      weatherIconImg.src = `Images/${weatherIcon}.svg`;
      weatherIconImg.classList.add("weather-icon");
      // Append weather icon img to the weather-info div

      // Append location divs and weather info div to the weather-widget
      me.selector.appendChild(locationDiv1);
      me.selector.appendChild(DateInfoDiv);
      me.selector.appendChild(weatherInfoDiv);
      me.selector.appendChild(weatherIconImg);
    }
  }

  return {
    WeatherForecastWidget: WeatherForecastWidget,
  }

})();

document.addEventListener("DOMContentLoaded", function () {
  // Get the weather-widget div
  var weatherWidget = document.querySelector(".weather-widget");

  // Create a new WeatherForecastWidget instance and attach it to the weather-widget div
  var widgetInstance = new WeatherForecastDisplay.WeatherForecastWidget(weatherWidget);

  // Load the forecast data and display it
  widgetInstance.loadForecastData();
});