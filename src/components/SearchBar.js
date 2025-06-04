// the bar for searching the city and displaying the weather data

import React, { useContext, useEffect, useState, useCallback } from 'react';
import { WeatherDataContext } from '../components/Data';
import { fetchWeatherApi } from 'openmeteo';
import '../Css/SearchBar.css';

const SearchBar = () => {
    const { fetchWeatherData } = useContext(WeatherDataContext);
    const [inputedCity, setInputedCity] = useState('');
    const [ citylookup, setCityLookup ] = useState([]);
    const [ isDropdownVisible, setIsDropdownVisible ] = useState(false);

    // Debounce function to limit API calls
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchCities = useCallback(debounce(async (searchTerm) => {
        if (searchTerm.length < 2) {
            setCityLookup([]);
            setIsDropdownVisible(false);
            return;
        }

        try {
            const geoResponse = await fetchWeatherApi('https://geocoding-api.open-meteo.com/v1/search', {
                name: searchTerm,
                count: 10,
            });
            setCityLookup(geoResponse);
            setIsDropdownVisible(true);
        } catch (error) {
            console.error('Error fetching city data:', error);
            setCityLookup([]);
            setIsDropdownVisible(false);
        }
    }, 300),
    []
);

useEffect(() => {
    fetchCities(inputedCity);
}, [inputedCity, fetchCities]);

const handleCitySelect = (city) => {
    setInputedCity(city.name);
    fetchWeatherData(city.name);
    setIsDropdownVisible(false);
};

const handleInputChange = (e) => {
    setInputedCity(e.target.value);
};

const handleInputBlur = () => {
    setTimeout(() => {
        setIsDropdownVisible(false);
    }, 200);
};

return (
    <div className='search-bar'>
        <div className='search-input-wrapper'>
            <input
                type="text"
                value={inputedCity}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={() => inputedCity.length >= 2 && setIsDropdownVisible(true)}
                placeholder="Search for a city..."
                className='search-input'
            />
            {isDropdownVisible && citylookup.length > 0 && (
                <div className='search-dropdown'>
                    {citylookup.map((city, index) => (
                        <div
                            key={'item-${index}'}
                            className="city-result"
                            onClick={() => handleCitySelect(city.name)}
                        >
                            {city.name}, {city.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className='add-button' onClick={toggleSearchModal}>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            className="icon-small"
            >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
        </div>
    </div>
)
}