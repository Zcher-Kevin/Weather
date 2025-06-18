import React, { useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/Main.css';

const Main = () => {
  const { weatherData, currentTemperature, city, error } = useContext(WeatherDataContext);

  return (
    <div className='main-container'>
      {error && <p className='error'>{error}</p>}
      {weatherData && (
        <>
          <div className='current-temp'>
            <h2>Current Temperature</h2>
            <h3>Current Location: {city || 'Loading...'}</h3>
            <h1>{currentTemperature !== null ? `${currentTemperature}°C` : 'N/A'}</h1>
            <p>{weatherData?.latitude}°N, {weatherData?.longitude}°E</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;

/*
 * <div className='mini-forecast'>
            <h3>10-day</h3>
            <div className="forecast-list">
              {daily.time?.slice(0, 5).map((time, index) => (
                <div key={index} className="forecast-item">
                  <p>{new Date(time).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  <p>{daily.temperature_2m_max?.[index] || 'N/A'}°C / {daily.temperature_2m_min?.[index] || 'N/A'}°C</p>
                </div>
              ))}
            </div>
          </div>
 */