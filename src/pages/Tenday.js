// This card is used to show the daily weather data for the next 10 days.

import React, { useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/Tenday.css';

const Tenday = () => {
    const { weatherData, error } = useContext(WeatherDataContext);
    const daily = weatherData?.daily || {};

    return (
        <div className='ten-day-container'>
            <h2>10-day Forecast</h2>
            {error && <p className='error'>{error}</p>}
            {weatherData && daily.time && (
                <div className='ten-day-list'>
                    { daily.time.map((time, index) => (
                        <div key={index} className='ten-day-item'>
                            <p>{new Date(time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            <p>{daily.temperature_2m_max?.[index] || 'N/A'}°C / {daily.temperature_2m_min?.[index] || 'N/A'}°C</p>
                            <p>{daily.weather_code ? getWeatherDescription(daily.weather_code[index]) : 'N/A'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const getWeatherDescription = (code) => {
    const descriptions = {
        0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle',
        61: 'Rain', 63: 'Moderate rain', 80: 'Showers', 95: 'Thunderstorm',
    };
    return descriptions[code] || 'Unknown';
};

export default Tenday;