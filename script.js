const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0' + hoursIn12HrFormat: hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+  ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date+  ' ' + months[month]
}, 1000);

// let {latitude, longitude} = success.coords;
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=MY7QQT78G5GFNHASXZ7FUYXJX`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            showWeatherData(data);
        })


    })
    
}
moment().format("dddd, MMMM Do, HH:MM:ss a");

function showWeatherData(data) {
    let {temp, humidity, pressure, windspeed, feelslike, conditions} = data.currentConditions;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.description,


    currentWeatherItemsEl.innerHTML = 
  
` 
<div class="weather-item">
    <div>Temperature</div>
    <div>${temp} &#176;F</div>
</div>
<div class="weather-item">
    <div>Feels Like</div>
    <div>${feelslike} &#176;F</div>
</div>
    <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${windspeed}</div>
</div>

<div class="weather-item">
    <div>Conditions:</div>
    <div>${conditions}</div>
</div>




`;

let otherDayForecast = ''
data.days.forEach((day, idx) => {
    if(idx == 0){
        currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
        <div class="others">
            <div class="day">${window.moment(day.datetime*1000).format('ddd')}</div>
            <div class="temp">${day.temp} &#176;F</div>
            
        </div>
        
        
        
        `

    }else{
        otherDayForecast += `
        <div class="weather-forecast-item"> 
        <div class="day">${window.moment(day.datetime*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">    
        <div class="temp">${day.temp}&#176;F</div>
       
    </div>
    
        `
    }

})

weatherForecastEl.innerHTML = otherDayForecast;

}

