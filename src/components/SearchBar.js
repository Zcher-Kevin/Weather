import React, { useState } from 'react';
import '../Css/SearchBar.css';

const SearchBar = ({ toggleSearchModal }) => {
    const [inputedCity, setInputedCity] = useState('');

    const handleInputChange = (e) => {
        setInputedCity(e.target.value);
    };

    const handleClick = () => {
        toggleSearchModal();
    };

    return (
        <div className='search-bar'>
            <div className="search-input-wrapper">
                <input
                    type="text"
                    value={inputedCity}
                    onChange={handleInputChange}
                    onClick={handleClick}
                    placeholder="Search for city"
                    className="search-input"
                />
            </div>
        </div>
    );
};

export default SearchBar;