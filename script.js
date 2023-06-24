// Retrieve weather data from OpenWeatherMap API
let city = prompt("What is your city name");
function getWeatherData(latitude, longitude) {
  const apiKey = "08acd3959fc64db2afa65937232406";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=08acd3959fc64db2afa65937232406&q=${city}&days=4&aqi=yes&alerts=yes`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract weather information from the API response
      const temperature = data.current.temp_c;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;
      const weatherConditions = data.current.condition.icon;
      
      // Update the weather-info element in popup.html with the weather data
      document.getElementById("weather_info").innerHTML = `
        Temperature: ${temperature} &deg;C<br>
        Humidity: ${humidity} %<br>
        Wind Speed: ${windSpeed} km/hr<br>
        Conditions: ${weatherConditions}
      `;
    })
    .catch(error => {
      // Handle errors if the weather data cannot be retrieved
      document.getElementById("weather_info").innerHTML = "Error retrieving weather data.";
      console.error("Error retrieving weather data:", error);
    });
}

// Retrieve pollution data from AirVisual API

function getPollutionData(latitude, longitude) {
  const apiKey = "ae01209a36db2619525812602750871b";
  // alert(city);
  const url = `http://api.weatherapi.com/v1/forecast.json?key=08acd3959fc64db2afa65937232406&q=${city}&days=4&aqi=yes&alerts=yes`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract pollution information from the API response
      console.log(data)
      const components = data.current.air_quality.co;
      let pollutionLevel = data.current.air_quality.no2;
      let mainPollutant = data.current.air_quality.o3;
      let solutions = data.current.air_quality.so2;
      
      const pollution_l = parseFloat(pollutionLevel);
      const main_p = parseFloat(mainPollutant);
      const solutions_l = parseFloat(solutions);

      if(pollution_l > 0 && pollution_l < 50){
        pollutionLevel = "Good";
      }
      else if(pollution_l > 51 && pollution_l < 100){
        pollutionLevel = "Moderate";
      }
      else if(pollution_l > 101 && pollution_l < 150){
        pollutionLevel = "Unhealthy for Sensitive Groups";
      }
      else if(pollution_l > 151 && pollution_l < 200){
        pollutionLevel = "Unhealthy";

      } 
      else if(pollution_l > 201 && pollution_l < 300){
        pollutionLevel = "Very Unhealthy";
      }


      // Update the pollution-info and solutions elements in popup.html with the pollution data
      document.getElementById("pollution_info").innerHTML = `
        Pollution Level: ${pollutionLevel}<br>
        Main Pollutant: ${mainPollutant}
      `;
      document.getElementById("solutions_info").innerHTML = `Solutions: ${solutions}`;
    })
    .catch(error => {
      // Handle errors if the pollution data cannot be retrieved
      document.getElementById("pollution_info").innerHTML = "Error retrieving pollution data.";
      document.getElementById("solutions_info").innerHTML = "";
      console.error("Error retrieving pollution data:", error);
    });
}

// Get the user's current location and retrieve weather and pollution data
navigator.geolocation.getCurrentPosition(
  position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Call the functions to retrieve weather and pollution data
    getWeatherData(latitude, longitude);
    getPollutionData(latitude, longitude);
  },
  error => {
    // Handle errors if the user's location cannot be accessed
    document.getElementById("weather-info").innerHTML = "Error retrieving location data.";
    document.getElementById("pollution-info").innerHTML = "Error retrieving location data.";
    document.getElementById("solutions").innerHTML = "";
    console.error("Error retrieving location:", error);
  }
);
