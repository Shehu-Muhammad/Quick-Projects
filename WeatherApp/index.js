async function lookUpWeather() {
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value; // 2-letter code (CA, NY, etc.)
    let result = document.getElementById('weather');

    if (!city || !state) {
        alert("Please enter a city and select a state.");
        return;
    }

    // Get Long/Lat from city and state
    try {
        const geo_url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&country=US&admin1=${state}`;
        const response = await fetch(geo_url);
        if (!response.ok) {
            throw new Error("Longitutde and latitude not found");
        }

        const data = await response.json();
        console.log("Geo Data:", data);

        if (!data.results || data.results.length === 0) {
            throw new Error("No matching location found");
        }

        const { latitude, longitude } = data.results[0];
        console.log("Latitude:", latitude, "Longitude:", longitude);

        // Now build the weather URL
        const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`;

        const weatherResponse = await fetch(weather_url);
        if (!weatherResponse.ok) {
            throw new Error("Weather data not found");
        }

        const weatherData = await weatherResponse.json();
        console.log("Weather Data:", weatherData);

        // Example: Display temperature
        result.innerHTML = `The current temperature in ${city}, ${state} is ${weatherData.current_weather.temperature}°F`;

    } catch (error) {
        alert("Error: " + error.message);
    }

}
