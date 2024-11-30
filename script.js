// This code below will update the HTML content of weatherInfo with all this information, making the weather dashboard complete!

document.getElementById("weatherForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const city = document.getElementById("city").value;
    const apiKey = "0a607a6e72433f9b63329a75aa2a28eb"; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const weatherData = await response.json();

        // Display weather data
        document.getElementById("weatherInfo").innerHTML = `
            <h2>Weather in ${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>Temperature: ${weatherData.main.temp}°C (feels like ${weatherData.main.feels_like}°C)</p>
            <p>Min: ${weatherData.main.temp_min}°C | Max: ${weatherData.main.temp_max}°C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Pressure: ${weatherData.main.pressure} hPa</p>
            <p>Weather: ${weatherData.weather[0].main} - ${weatherData.weather[0].description}</p>
            <p>Cloudiness: ${weatherData.clouds.all}%</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            <p>Visibility: ${weatherData.visibility / 1000} km</p>
            <p>Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        `;
    } catch (error) {
        document.getElementById("weatherInfo").innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Load default city weather on page load
window.addEventListener("load", function() {
    document.getElementById("city").value = "Ibadan"; // Set your default city here
    document.getElementById("weatherForm").dispatchEvent(new Event("submit"));
});