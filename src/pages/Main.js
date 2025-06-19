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