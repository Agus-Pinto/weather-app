import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import WeatherCard from './WeatherCards';

interface WeatherData {
  temperature: string;
  description: string;
  humidity: number; 
  windSpeed: number;
  // Add more properties as needed
}

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const { main, weather, wind } = response.data;
      const temperatureKelvin = main.temp;
      const temperatureCelsius = temperatureKelvin - 273.15;
      const temperatureFormatted = temperatureCelsius.toFixed(1);
      const description = weather[0].description;
      const humidity = main.humidity;
      const windSpeed = wind.speed;

      setWeatherData({
        temperature: temperatureFormatted,
        description,
        humidity,
        windSpeed,
        // Add more properties as needed
      });
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="container">
      <img className='nubeImg' src={require('../src/assets/nube.webp')}/>
      <img className='nubeImg2' src={require('../src/assets/nube2.webp')}/>
      <div className="weatherData">
        <h1 className='title'>Weather App</h1>
        <form className="form" onSubmit={handleFormSubmit}>
        <img className='sunImg' src={require('../src/assets/sun-removebg-preview.png')} alt="Sun" />
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            className="input"
            placeholder='please write your location'
          />
          <button type="submit" className="button">
            Get Weather
          </button>
        </form>
        {weatherData ? (
          <WeatherCard
            temperature={weatherData.temperature}
            description={weatherData.description}
            humidity = {weatherData.humidity}
            windSpeed={weatherData.windSpeed}
            // Add more properties as needed
          />
        ) : (
          <p className="error">{error ? error : 'Enter a city to get weather data.'}</p>
        )}
      </div>
    </div>
  );
};

export default App;