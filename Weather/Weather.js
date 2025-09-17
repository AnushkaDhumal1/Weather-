document.getElementById("searchBtn").onclick = getWeather;

async function getWeather() {
  let city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please type a city name!");
    return;
  }

  try {
    // Get city coordinates
    let geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
    let geoData = await geo.json();

    if (geoData.length === 0) {
      alert("City not found!");
      return;
    }

    let lat = geoData[0].lat;
    let lon = geoData[0].lon;

    // Get current weather
    let weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    let weatherData = await weatherRes.json();
    let w = weatherData.current_weather;

    // Show weather
    document.getElementById("weatherResult").innerHTML = `
      <h2>Weather in ${city}</h2>
      <p>Temperature: ${w.temperature}°C</p>
      <p>Wind Speed: ${w.windspeed} km/h</p>
      <p>Weather Code: ${w.weathercode}</p>
      <p>Time: ${w.time}</p>
    `;

  } catch {
    alert("Failed to fetch weather. Try again!");
  }
}
