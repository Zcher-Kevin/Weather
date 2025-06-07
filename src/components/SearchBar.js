// the bar for searching the city and displaying the weather data

import React, { useContext, useState } from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/SearchBar.css';

const SearchBar = ({ toggleSearchModal, setSearchQuery}) => {
    const { fetchWeatherData } = useContext(WeatherDataContext);
    const [inputedCity, setInputedCity] = useState('');
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputedCity.trim()) {
            e.preventDefault();
            setSearchQuery(inputedCity);
            toggleSearchModal();
        }
    };

    const handleCitySelect = () => {
        if (inputedCity.trim()) {
            fetchWeatherData(inputedCity);
            setInputedCity('');
        }
    };

    const handleInputChange = (e) => {
        setInputedCity(e.target.value);
    };

    return (
        <div className='search-bar'>
            <div className="search-input-wrapper">
                <input
                type="text"
                value={inputedCity}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Search for city"
                className="search-input"
                />
            </div>
            <div className="add-button" onClick={() => { setSearchQuery(inputedCity); toggleSearchModal(); }}>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                className="icon-small"
                >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;
