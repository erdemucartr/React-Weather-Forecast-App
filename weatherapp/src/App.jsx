import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=4&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data); // response'dan data kısmını al
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">4 Günlük Hava Tahmini</h1>
      <div className="input-container">
        <input
          className="location-input"
          type="text"
          placeholder="Şehir adı giriniz!"
          value={location}
          onChange={handleLocationChange}
        />
      </div>

      {/* WeatherData varsa ve forecastday içeriği varsa harita işlevi */}
      {weatherData &&
        weatherData.forecast &&
        weatherData.forecast.forecastday && (
          <div className="weather-container">
            {weatherData.forecast.forecastday.map((day) => (
              <div className="day-container" key={day.date}>
                <h2>{day.date}</h2>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
                <p>{day.day.condition.text}</p>
                <p>Max Sıcaklık: {day.day.maxtemp_c}°C</p>
                <p>Min Sıcaklık: {day.day.mintemp_c}°C</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default App;
