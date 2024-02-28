
function fetchWeather() {
    const apiKey = 'a9c9a0a1032415b1d0206526a51b3b13'; // Replace with your API key
    const city = document.getElementById('cityInput').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResults').innerHTML = 'Error fetching weather data. Please try again.';
        });
}

function displayWeather(data) {
    if (!data || !data.list) {
        console.error('Weather data is empty or malformed');
        document.getElementById('weatherResults').innerHTML = 'Weather data is empty or malformed. Please try again.';
        return;
    }

    const forecastList = data.list;
    const dailyForecasts = [];
    const uniqueDates = {};
    let daysCount = 0;

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US');
        if (!uniqueDates[date] && daysCount < 5) {
            dailyForecasts.push(forecast);
            uniqueDates[date] = true;
            daysCount++;
        }
    });

    let forecastHtml = '<div class="forecast">';
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        forecastHtml += `
            <div class="forecast-item">
                <div>${day}</div>
                <img src="${iconUrl}" alt="${forecast.weather[0].description}">
                <div>${Math.round(forecast.main.temp)}&deg;C</div>
            </div>
        `;
    });
    forecastHtml += '</div>';

    document.getElementById('weatherResults').innerHTML = forecastHtml;
}





