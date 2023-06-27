let city = "Varanasi";


// Function to insert an element after a reference element
function insertAfter(newElement, referenceElement) {
  var parent = referenceElement.parentNode; // Get the parent element of the reference element
  var nextSibling = referenceElement.nextSibling; // Get the next sibling of the reference element

  if (nextSibling) {
    // If a next sibling exists, insert the new element before the next sibling
    parent.insertBefore(newElement, nextSibling);
  } else {
    // If there is no next sibling, append the new element to the parent
    parent.appendChild(newElement);
  }
}




// Event listener for form submission
document.querySelector('.form_1').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the values from the input fields
  var name = document.getElementById('name').value;
  var city = document.getElementById('city').value;

  // Clear the form
  var forms = document.querySelector('.form_1');
  while (forms.firstChild) {
    forms.removeChild(forms.firstChild);
  }

  // Update the welcome messages with the entered name and city
  document.getElementById("welcome_mess_1").innerHTML = "Welcome, " + name;
  document.getElementById("welcome_mess_2").innerHTML = "You are from " + city + ".";
});

// Event listener for input changes in the name field
var inputElement_name = document.getElementById('name');
inputElement_name.addEventListener('input', function() {
  if (inputElement_name.value !== '') {
    inputElement_name.style.color = 'blue'; // Change text color to blue when the input has a value
  } else {
    inputElement_name.style.color = ''; // Reset text color when the input is empty
  }
});

// Event listener for input changes in the city field
var inputElement_city = document.getElementById('city');
inputElement_city.addEventListener('input', function() {
  if (inputElement_city.value !== '') {
    inputElement_city.style.color = 'blue'; // Change text color to blue when the input has a value
  } else {
    inputElement_city.style.color = ''; // Reset text color when the input is empty
  }
});



function handleClick() {
  // Fetch quotes from the API
  fetch("https://type.fit/api/quotes")
    .then(response => response.json())
    .then(data => {
      let data_len = data.length;

      // Generate a random quote index
      let req = Math.floor(Math.random() * data_len);
      let quote_m = data[req];

      // Create weather and air div elements
      var weather_div = document.createElement('div');
      weather_div.id = "weather";
      weather_div.classList.add('weather_div', 'container');
      weather_div.textContent = "";

      var air_div = document.createElement('div');
      air_div.id = "air";
      air_div.classList.add('air_div');
      air_div.textContent = "";

      var temp = document.getElementById("quote");

      // Insert weather and air div elements after the temp div
      insertAfter(weather_div, temp);
      insertAfter(air_div, weather_div);

      // Get weather data and display it in the weather div
      getWeatherData(weather_div);

      console.log(quote_m);
      temp.innerHTML = `<p style='color: red; font-size: 18px; padding-top:10px;'>A Quote for You</p>
        " ${quote_m.text} " <br><br>   - By ${quote_m.author}`;

      // Get pollution data and display it in the air div
      getPollutionData(air_div);
    })
    .catch(error => {
      document.getElementById("quote").innerHTML = "Error retrieving the data";
      console.log(error);
      console.error("Error retrieving quotes data:", error);
    });
}

var button = document.getElementById('button');
button.onclick = handleClick;



function getWeatherData(divElement) {
  const apiKey = "08acd3959fc64db2afa65937232406";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=08acd3959fc64db2afa65937232406&q=${city}&days=4&aqi=yes&alerts=yes`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      // Retrieve location information
      const loaction_name = data.location.name;
      const location_country = data.location.country;
      const location_lat = data.location.lat;
      const location_lon = data.location.lon;
      
      // Retrieve astro information
      const sunrise = data.forecast.forecastday[0].astro.sunrise;
      const sunset = data.forecast.forecastday[0].astro.sunset;
      const moonrise = data.forecast.forecastday[0].astro.moonrise;
      const moonset = data.forecast.forecastday[0].astro.moonset;
      const moon_phase = data.forecast.forecastday[0].astro.moon_phase;
      const moon_illumination = data.forecast.forecastday[0].astro.moon_illumination;

      // Retrieve temperature information
      const current_temp = data.current.temp_c;
      const max_temp = data.forecast.forecastday[0].day.maxtemp_c;
      const min_temp = data.forecast.forecastday[0].day.mintemp_c;
      const avg_temp = data.forecast.forecastday[0].day.avgtemp_c;
      const feels_like = data.current.feelslike_c;
      
      // Retrieve wind information
      const wind_speed = data.current.wind_kph;
      const wind_degree = data.current.wind_degree;
      const wind_dir = data.current.wind_dir;
      const max_wind_speed = data.forecast.forecastday[0].day.maxwind_kph;
      
      // Retrieve rain information 
      const humidity = data.current.humidity;
      const cloud = data.current.cloud;
      const chance_of_rain = data.forecast.forecastday[0].day.daily_chance_of_rain;
      const chance_of_snow = data.forecast.forecastday[0].day.daily_chance_of_snow;
      const total_precipitation = data.forecast.forecastday[0].day.totalprecip_mm;
      const condition = data.forecast.forecastday[0].day.condition.text;


      // Update the divElement with the weather data
      divElement.innerHTML = `
        <div class="weather_report">Weather Report</div>
           
           <p class="header">Location Info</p>
           <div class="location">
           Location : ${loaction_name}<br>
           Country : ${location_country}<br>
           Latitude : ${location_lat} <br>
           Longitude : ${location_lon} 
           </div>

           <p class="header">Astro Info</p>
           <div class="astro">
            Sunrise : ${sunrise} <br>
            Sunset : ${sunset} <br>
            Moonrise : ${moonrise} <br>
            Moonset : ${moonset} <br>
            Moon Phase : ${moon_phase} <br>
            Moon Illumination : ${moon_illumination} <br><br>
           </div>

           <p class="header">Temperature Info</p> 
           <div class="temp">
            Current Temperature : ${current_temp} &deg;C<br>
            Max Temperature : ${max_temp} &deg;C<br>
            Min Temperature : ${min_temp} &deg;C<br>
            Average Temperature : ${avg_temp} &deg;C<br>
            Feels Like : ${feels_like} &deg;C<br><br>
           </div>
           
           <p class="header">Wind Info</p>
           <div class="wind">
            Wind Speed : ${wind_speed} km/hr<br>
            Wind Degree : ${wind_degree}<br>
            Wind Direction : ${wind_dir}<br>
            Max Wind Speed : ${max_wind_speed} km/hr<br><br>
           </div>

           <p class="header">Rain Info</p>
           <div class="rain">
            Humidity : ${humidity}<br>
            Cloud : ${cloud}<br>
            Chance of Rain : ${chance_of_rain} %<br>
            Chance of Snow : ${chance_of_snow} %<br>
            Total Precipitation : ${total_precipitation} mm<br>
            Condition : ${condition}<br><br>
           </div>
      `;
    })
    .catch(error => {
      divElement.innerHTML = "Error retrieving weather data.";
      console.error("Error retrieving weather data:", error);
    });
}


function getPollutionData(divElement) {
  const apiKey = "ae01209a36db2619525812602750871b";
  
  const url = `http://api.weatherapi.com/v1/forecast.json?key=08acd3959fc64db2afa65937232406&q=${city}&days=4&aqi=yes&alerts=yes`;

  // Fetch the pollution data from the API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract the pollution data from the API response
      const uv_concentration = data.current.uv;
      const co_concentration = data.current.air_quality.co;
      const no2_concentration = data.current.air_quality.no2;
      const o3_concentration = data.current.air_quality.o3;
      const so2_concentration = data.current.air_quality.so2;
      const pm2_5_concentration = data.current.air_quality.pm2_5;
      const pm10_concentration = data.current.air_quality.pm10;
     
      // Update the pollution-info and solutions elements in popup.html with the pollution data
      divElement.innerHTML = `
      <div class="pollution_level">Pollution Level</div>
       &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        Pollutant &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  Concentration &nbsp&nbsp&nbsp&nbsp   <br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <span class="pollutant">UV</span>   <span class="concentration uv">${uv_concentration.toFixed(2)}</span>   <br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <span class="pollutant">CO</span> <span class="concentration co">${co_concentration.toFixed(2)}</span>    <br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <span class="pollutant">NO2</span> <span class="concentration no2">${no2_concentration.toFixed(2)}</span> <br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <span class="pollutant">O3</span> <span class="concentration o3">${o3_concentration.toFixed(2)}</span>    <br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <span class="pollutant">SO2</span> <span class="concentration so2">${so2_concentration.toFixed(2)}</span>  <br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <span class="pollutant">PM 2.5</span> <span class="concentration pm25">${pm2_5_concentration.toFixed(2)}</span> <br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <span class="pollutant">PM 10</span> <span class="concentration pm10">${pm10_concentration.toFixed(2)}</span> <br>
        <br>
      `; 
    })
    .catch(error => {
      divElement.innerHTML = "Error retrieving pollution data.";
      console.error("Error retrieving pollution data:", error);
    });
}



