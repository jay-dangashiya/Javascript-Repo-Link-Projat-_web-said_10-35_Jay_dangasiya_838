const cityInput = document.getElementById("city_Name");
const searchBtn = document.getElementById("Search");
const loader = document.getElementById("loader");
const weatherData = document.getElementById("all_Data");
const errorBox = document.getElementById("error");

searchBtn.addEventListener("click", fetchWeatherData);


async function fetchWeatherData(defaultCity = "Surat") {
    const city = cityInput.value.trim() || defaultCity;

    errorBox.textContent = "";
    weatherData.innerHTML = "";

    if (!city) {
        errorBox.textContent = "Please enter a city name";
        return;
    }


    loader.classList.remove("hidden")

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01922cbf6bb34315bc5cf6dfd814f621&units=metric`

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        loader.classList.add("hidden");

        const { temp, humidity, feels_like, temp_min, temp_max } = data.main;
        const { main, icon } = data.weather[0];
        const { speed } = data.wind;

        weatherData.innerHTML = `
            <div class="weather-card">
                <h5>Temperature: ${temp} °C</h5>
                <h5>Weather: ${main}</h5>
                 <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" />
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${speed} m/s</p>
                <p>Feels Like: ${feels_like} °C</p>
                <p>Min Temp: ${temp_min} °C</p>
                <p>Max Temp: ${temp_max} °C</p>
            </div>
        `;
    } catch (err) {
        loader.classList.add("hidden");
        errorBox.textContent = "City not found";
        console.error(err);
    }
}