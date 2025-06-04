// Description:
// Main usage: This component fetches and stores the data from the API.
// further description will be added later.

import React, {createContext, useState, useEffect} from 'react';
import { fetchWeatherApi} from 'openmeteo';

export const WeatherDataContext = createContext();

const Data = ({ children, initalCity = 'London' }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [currentTemperature, setCurrentTemperature] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState(initalCity);
    const [lastCity, setLastCity] = useState(initalCity);

    const fetchWeatherData = async (cityName) => {
        if ( lastCity === cityName && weatherData) {
            return;
        }

        try {
        // Geocode city name to latitude and longitude 
        // (using the searching function provided by the API)
        const geoResponse = await fetchWeatherApi('https://geocoding-api.open-meteo.com/v1/search', {
            query: cityName,
            limit: 1
        });
        const {latitude, longitude} = geoResponse[0] || {
            latitude: 51.5074, longitude: -0.1278 // Default to London if no results
        };

        const params = {
            latitude,
            longitude,
            current: 'temperature_2m,wind_speed_10m,wind_direction_10m,uv_index',
            hourly: 'temperature_2m,precipitation,uv_index,wind_speed_10m',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max',
            forecast_days: 10,
            timezone: 'auto',
        };

        const response = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
        const data = response[0];

        setWeatherData(data);
        setCurrentTemperature(data.current?.temperature_2m || null);
        setLastCity(cityName);
        setError(null);
    } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
        setWeatherData(null);
        setWeatherData(null);
        }
    }
    
    useEffect(() => {
    }, [city]);

    return (
        <WeatherDataContext.Provider value={{ weatherData, error, city, setCity }}>
            {children}
        </WeatherDataContext.Provider>
    );
}

export default Data;