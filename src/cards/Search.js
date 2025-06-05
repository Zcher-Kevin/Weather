// this page is used to show the city which can be searched for weather data

import React, { useState, useEffect, useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import { fetchWeatherApi } from 'openmeteo';
import '../Css/Search.css'; 

const Search = ({ isOpen, toggleSearchModal}) => {
    const { fetchWeatherData } = useContext(WeatherDataContext);
    const [ search, setSearch ] = useState('');
    const [ cityLookup, setCityLookup ] = useState([]);

    useEffect(() => {
        if (search.length < 2) {
            setCityLookup([]);
            return;
        }

        const fetchCities = async () => {
            try {
                const geoResponse = await fetchWeatherApi('https://geocoding-api.open-meteo.com/v1/search', {
                    name: search,
                    count: 10,
                });
                setCityLookup(geoResponse);
            } catch (error) {
                console.error('Error fetching city data:', error);
                setCityLookup([]);
            }
        };
        fetchCities();
    }, [search]);

    const handleCitySelect = (cityName) => {
        fetchWeatherData(cityName);
        toggleSearchModal();
        setSearch('');
    }

    if (!isOpen) return null; 

    return (
        <div className='search-modal'>
            <div className='search-header'>
                <svg
                    xmlns="http://www.w3.org/200/svg"
                    viewBox='0 0 24 24'
                    className='icon-small back-button'
                    onClick={toggleSearchModal}
                >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                <div className='search-input-wrapper'>
                    <input
                        type='text'
                        placeholder='Search for a city...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='search-input'
                    />
                </div>
            </div>

            {search.length <= 1 && (
                <div className='search-placeholder'>
                    <cvg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox='0 0 24 24'
                        className='icon-medium'
                    >
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 
                        16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.
                        57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01
                         14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </cvg>
                    Search for a city
                </div>
            )}
        </div>
    )
}