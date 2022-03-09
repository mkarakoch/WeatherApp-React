import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "0a2e626ef7063ebf5196284b4c6061b8";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  function getWeather(e) {
    if (e.key === "Enter") {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  }
  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter City..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>Welcome to "How is the Weather!" Enter a city name</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}&deg;F</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === "404" ? <p> City not found. </p> : <></>}
    </div>
  );
}

export default App;
