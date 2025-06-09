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
            <div onClick={() => { setSearchQuery(inputedCity); toggleSearchModal(); }}>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                className="icon-small"
                />
            </div>
        </div>
    );
};

export default SearchBar;
