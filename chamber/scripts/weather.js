const apiKey = 'b1021dcf6ee71eed87479bd158a87d77';
const myLat = '10.23291';
const myLon = '-66.66474';
const units = 'metric'; // Use 'imperial' for Fahrenheit

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=${units}&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&units=${units}&appid=${apiKey}`;

const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const forecastElement = document.getElementById('forecast');

async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error('Network response was not ok');
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    temperature.textContent = `${data.main.temp} °C`;
    description.textContent = `${data.weather[0].description}`;
    const iconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.setAttribute('src', iconSrc);
    icon.setAttribute('alt', data.weather[0].description);
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error('Network response was not ok');
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    forecastElement.innerHTML = '';
    const heading = document.createElement('h3')
    const forecastContainer = document.createElement('div')

    heading.textContent = "Forecast"
    forecastContainer.className = "forecast-container"

    forecastElement.appendChild(heading)
    forecastElement.appendChild(forecastContainer)


    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push({
            temp: item.main.temp,
            icon: item.weather[0].icon,
            description: item.weather[0].description,
        });
    });

    Object.keys(dailyForecasts).slice(0, 3).forEach(date => {
        const dailyInfo =  dailyForecasts[date][0];

        const temps = dailyForecasts[date].map(date => date.temp);
        const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
        const iconSrc = `http://openweathermap.org/img/wn/${dailyInfo.icon}@2x.png`;
        const description = dailyInfo.description;

        const forecastItem = document.createElement('div');
        const forecastDate = document.createElement('span'); 
        const forecastImg = document.createElement('img');
        const forecastTemp = document.createElement('span');
        const forecastDescription = document.createElement('span');

        forecastItem.className = 'forecast-item';

        forecastImg.setAttribute('src', iconSrc);
        forecastImg.setAttribute('alt', description);
        
        forecastTemp.textContent = `Avg Temp: ${avgTemp.toFixed(2)} °C`;
        forecastDate.textContent = `${date}`;
        forecastDescription.textContent = `${dailyInfo.description}`;

        forecastItem.appendChild(forecastDate);
        forecastItem.appendChild(forecastImg);
        forecastItem.appendChild(forecastTemp);
        forecastItem.appendChild(forecastDescription);
        forecastContainer.appendChild(forecastItem);
    });
}

getWeather();
getForecast();
