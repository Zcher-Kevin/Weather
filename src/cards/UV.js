// This card is used to show the UV index data for the current day.

import React, { useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/UV.css';

const UV = () => {
    const { weatherData, error } = useContext(WeatherDataContext);
    const current = weatherData?.current || {};
    const daily = weatherData?.daily || {};

    return (
        <div className='uv-container'>
            <h2>UV Index</h2>
            {error && <p className='error'>{error}</p>}
            {weatherData && (
                <div>
                    <p>Current: {current.uv_index || 'N/A'}</p>
                    <p>Max Today: {daily.uv_index_max?.[0] || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default UV;