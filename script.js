// Retrieve weather data from OpenWeatherMap API

//let city = prompt("What is your city name");


function insertAfter(newElement, referenceElement) {
  var parent = referenceElement.parentNode;
  var nextSibling = referenceElement.nextSibling;

  if (nextSibling) {
    parent.insertBefore(newElement, nextSibling);
  } else {
    parent.appendChild(newElement);
  }
}


//var forms = document.querySelector('form'); // Get the form element
document.querySelector('.form_1').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the values entered by the user
  var name = document.getElementById('name').value;
  var city = document.getElementById('city').value;

  // Display a personalized welcome message
  //var welcomeMessage = "Welcome, " + name + "! You are from " + city + ".";
  //alert(welcomeMessage);

  // You can perform further actions with the captured user data

  // remove the form
  var forms = document.querySelector('.form_1'); // Get the form element
   while (forms.firstChild) {
    forms.removeChild(forms.firstChild); // Remove each child element
  }
  // send welcome message
  document.getElementById("welcome_mess_1").innerHTML = "Welcome, " + name;
  document.getElementById("welcome_mess_2").innerHTML = "You are from " + city  + "."
});

var inputElement_name = document.getElementById('name');
inputElement_name.addEventListener('input', function() {
  if (inputElement_name.value !== '') {
    inputElement_name.style.color = 'blue';
  } else {
    inputElement_name.style.color = '';
  }
});

var inputElement_city = document.getElementById('city');
inputElement_city.addEventListener('input', function() {
  if (inputElement_city.value !== '') {
    inputElement_city.style.color = 'blue';
  } else {
    inputElement_city.style.color = '';
  }
});

// var weather_div=document.getElementById('name');
//var weather_btn=document.getElementById('child');
// clicking button and then making quotes visible
function handleClick(){
fetch("https://type.fit/api/quotes")
  .then(response=>response.json())
  .then(data=>{
    let data_len=data.length;

    let req = Math.floor(Math.random()*data_len)
    let quote_m = data[req]
    
    
    var weather_div = document.createElement('div');
    weather_div.id="weather";
    weather_div.classList.add('weather_div','container');
    weather_div.textContent = "";
    
    // weather_div.parentNode.replaceChild(weather_div1,weather_div);
    var air_div = document.createElement('div','container');
    air_div.id ="air";
    air_div.classList.add('air_div');
    air_div.textContent = "";

    // weather_btn = document.createElement('button');
    // weather_btn.textContent = 'Weather Report';
    // weather_btn.className = 'weather_btn';
    // weather_btn.id="weather_bnt_id";
    // weather_btn.classList.add('btn','btn-info');
    
    // weather_btn.classList.add('btn-primary');
    
    // var air_btn =  document.createElement('button');
    // air_btn.textContent ='Air Quality Report' ;
    // air_btn.className='air_btn'
    // air_btn.classList.add('btn','btn-info');


    var temp = document.getElementById("quote");
    insertAfter(weather_div,temp);
    insertAfter(air_div,weather_div);

    getWeatherData(25,86,weather_div)
     //getPollutionData(25,86,weather_div)
    // insertAfter(weather_btn,air_div);
    // insertAfter(air_btn,weather_btn);
    

    // var weather_btn = document.getElementById('weather_btn_id');
    // weather_btn.onclick=getWeatherData(25,86,weather_div);
    //weather_btn.onclick=getWeatherData(25,86,weather_div);

    temp.innerHTML = `<p style='color: red; font-size: 18px; padding-top:10px;'>A Quote for You</p>
     " ${quote_m.text} " <br><br>   -By ${quote_m.author}`;
    getPollutionData(25,86,air_div)
    // var weather_btn = document.getElementById('weather_btn_id');
    // weather_btn.onclick=getWeatherData(25,86,weather_div);
  })
  .catch(error => {
    document.getElementById("quote").innerHTML = "Error retrieving the data"
    console.log(error)
    console.error("Error retrieving quotes data:", error);
  });

  // var newPageURL = chrome.extension.getURL('demo.html');
  // window.location.href = newPageURL;

}
var button = document.getElementById('button');
button.onclick = handleClick;

// console.log(weather_div);
// console.log(weather_btn);
// weather_div.innerHTML=""
// //weather_btn.onclick=getWeatherData(25,86,weather_div);
// console.log(weather_div);
//weather_btn.onclick = getWeatherData(25,86);
// function weather_info() {
//    fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       // Extract weather information from the API response
//       const temperature = data.current.temp_c;
//       const humidity = data.current.humidity;
//       const windSpeed = data.current.wind_kph;
//       const weatherConditions = data.current.condition.icon;
      
//       // Update the weather-info element in popup.html with the weather data
//       document.getElementById("weather_info").innerHTML = `<p style='color: red; font-size: 18px; padding-top:10px;'>A Quote for You</p>
//         Temperature: ${temperature} &deg;C<br>
//         Humidity: ${humidity} %<br>
//         Wind Speed: ${windSpeed} km/hr<br>
//         Conditions: ${weatherConditions}
//       `;
//     })
//     .catch(error => {
//       // Handle errors if the weather data cannot be retrieved
//       document.getElementById("weather_info").innerHTML = "Error retrieving weather data.";
//       console.error("Error retrieving weather data:", error);
//     });
// }










// function handleClick1(){
//    var parentElement = document.getElementById('container');
  
//   while (parentElement.firstChild) {
//     parentElement.removeChild(parentElement.firstChild);
//   }
// }
// var button1= document.getElementById('clear');
// button1.onclick = handleClick1;




function getWeatherData(latitude, longitude,divElement) {
  const apiKey = "08acd3959fc64db2afa65937232406";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=08acd3959fc64db2afa65937232406&q=Varanasi&days=4&aqi=yes&alerts=yes`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract weather information from the API response
      const temperature = data.current.temp_c;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;
      
      
      // Update the weather-info element in popup.html with the weather data
      divElement.innerHTML = `
        <div class="weather_report">Weather Report</div>
        Temperature: ${temperature} &deg;C 
        <br>
        Humidity: ${humidity} %
       <br>
        Wind Speed: ${windSpeed} km/hr
        <br>
        
      `;
    })
    .catch(error => {
      // Handle errors if the weather data cannot be retrieved
      divElement.innerHTML = "Error retrieving weather data.";
      console.error("Error retrieving weather data:", error);
    });
}

// Retrieve pollution data from AirVisual API

function getPollutionData(latitude, longitude,divElement) {
  const apiKey = "ae01209a36db2619525812602750871b";
  // alert(city);
  const url = `http://api.weatherapi.com/v1/forecast.json?key=08acd3959fc64db2afa65937232406&q=Varanasi&days=4&aqi=yes&alerts=yes`;

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
      divElement.innerHTML = `
      <div class="pollution_level">Pollution Level</div>
       
        Pollution Level: ${pollutionLevel}<br>
        Main Pollutant: ${mainPollutant}
      `;
      //document.getElementById("solutions_info").innerHTML = `Solutions: ${solutions}`;
    })
    .catch(error => {
      // Handle errors if the pollution data cannot be retrieved
      divElement.innerHTML = "Error retrieving pollution data.";
      //document.getElementById("solutions_info").innerHTML = "";
      console.error("Error retrieving pollution data:", error);
    });
}

// Get the user's current location and retrieve weather and pollution data
navigator.geolocation.getCurrentPosition(
  position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Call the functions to retrieve weather and pollution data
    // getWeatherData(latitude, longitude);
    // getPollutionData(latitude, longitude);
  },
  error => {
    // Handle errors if the user's location cannot be accessed
    document.getElementById("weather-info").innerHTML = "Error retrieving location data.";
    document.getElementById("pollution-info").innerHTML = "Error retrieving location data.";
    document.getElementById("solutions").innerHTML = "";
    console.error("Error retrieving location:", error);
  }
);
