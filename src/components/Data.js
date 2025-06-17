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

    setError(null); // Reset error on new fetch
    setWeatherData(null);
    setCurrentTemperature(null);

    try {
      // Geocode using Nominatim
      let geoData;
      const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`
      );
      geoData = await nominatimResponse.json();
      console.log('Nominatim Response:', geoData);

      if (!geoData || geoData.length === 0) {
        // Fallback to Open-Meteo geocoding
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&format=json`
        );
        const fallbackGeoData = await geoResponse.json();
        console.log('Open-Meteo Fallback Response:', fallbackGeoData);

        if (!fallbackGeoData.results || fallbackGeoData.results.length === 0) {
          throw new Error('No location data found for ' + cityName);
        }
        geoData = fallbackGeoData;
      }

      // Extract coordinates
      const locationData = geoData.results ? geoData.results[0] : geoData[0];
      console.log('Location Data:', locationData);
      let latitude, longitude;
      if (locationData.lat && locationData.lon) {
        latitude = locationData.lat;
        longitude = locationData.lon;
      } else if (locationData.latitude && locationData.longitude) {
        latitude = locationData.latitude;
        longitude = locationData.longitude;
      } else {
        throw new Error('Invalid coordinate data in location response');
      }
      console.log('Extracted Coordinates:', { latitude, longitude });

      // Fetch weather forecast using Open-Meteo
      const forecastResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,uv_index,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,uv_index,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max&forecast_days=10&timezone=auto&format=json`
      );
      const forecastData = await forecastResponse.json();
      console.log('Weather Forecast Response:', forecastData);

      if (!forecastData.current && !forecastData.hourly && !forecastData.daily) {
        throw new Error('No weather data available in forecast');
      }

      setWeatherData(forecastData);
      setCurrentTemperature(forecastData.current?.temperature_2m || forecastData.hourly?.temperature_2m[0] || null);
      setLastCity(cityName);
    } catch (err) {
      console.error('Fetch weather data error:', err.message);
      setError(err.message || 'Failed to fetch weather data');
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