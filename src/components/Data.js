import React, { createContext, useState, useEffect } from 'react';

export const WeatherDataContext = createContext();

const Data = ({ children, initialCity = 'London' }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(initialCity);
  const [lastCity, setLastCity] = useState(null);

  const fetchWeatherData = async (cityName) => {
    if (lastCity === cityName && weatherData) {
      return;
    }

    try {
      // Geocode city name to latitude and longitude
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&format=json`);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('No location data found for ' + cityName);
      }
      const { latitude, longitude } = geoData.results[0];

      // Fetch weather forecast
      const forecastResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,precipitation,uv_index,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max&forecast_days=10&timezone=auto&format=json`
      );
      const forecastData = await forecastResponse.json();

      setWeatherData(forecastData);
      setCurrentTemperature(forecastData.current?.temperature_2m || null);
      setLastCity(cityName);
      setError(null);
    } catch (err) {
      console.error('Fetch weather data error:', err.message);
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
      setCurrentTemperature(null);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <WeatherDataContext.Provider value={{ weatherData, currentTemperature, error, fetchWeatherData, setCity }}>
      {children}
    </WeatherDataContext.Provider>
  );
};

export default Data;