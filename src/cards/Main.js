// This card is used to show the current weather data ( Temperature ...)

import React, { useContext, useState} from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/Main.css';

const Main = () => {
    const { weatherData, currentTemperature, error, fetchWeatherData} = useContext(WeatherDataContext);
    
}