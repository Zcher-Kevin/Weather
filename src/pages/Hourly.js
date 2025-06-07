// This card is used to display the hourly weather data for the next 24 hours.

import React, { useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/Hourly.css';

const Hourly = () => {
    const { weatherData, error} = useContext(WeatherDataContext);
    const hourly = weatherData?.hourly || {};

    return (
        <div className='hourly-container'>
            <h2>Hourly Forecast</h2>
            {error && <p className='error'>{error}</p>}
            { weatherData && hourly.time && (
                <div className='hourly-list'>
                    {hourly.time.slice(0, 24).map((time, index) => (
                        <div key = {index} className='hourly-item'>
                            <p> { new Date(time).toLocaleTimeString('en-US',
                                 { hour: 'numeric', hour12: true })}</p>
                            <p> { hourly.temperature_2m?.[index] || 'N/A'}°C</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Hourly;