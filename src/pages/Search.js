import React, { useState, useEffect, useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/Search.css';

const Search = ({ isOpen, toggleSearchModal, initialQuery }) => {
  const { fetchWeatherData } = useContext(WeatherDataContext);
  const [search, setSearch] = useState(initialQuery || '');
  const [cityLookup, setCityLookup] = useState([]);

  useEffect(() => {
    setSearch(initialQuery || '');
  }, [initialQuery]);

  useEffect(() => {
    if (search.length < 2) {
      setCityLookup([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const query = encodeURIComponent(search);
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`;


        const response = await fetch(url);
        console.log('Fetch Response Status:', response.status); // Check HTTP status
        const data = await response.json();
        console.log('Open-Meteo Geocoding Response:', data);

        if (data.results && Array.isArray(data.results)) {
          console.log('Raw Results Data:', data.results); // Log raw data
          let filteredCities = data.results;

          // Special handling for "Hong Kong" to limit to the primary entry
          if (search.toLowerCase().includes('hong kong')) {
            const primaryCity = data.results.reduce((primary, city) => {
              console.log('City Population Check:', city.name, city.population); // Log population if available
              return (primary.population || 0) > (city.population || 0) ? primary : city;
            }, data.results[0] || {});
            filteredCities = [primaryCity];
            console.log('Selected Primary City:', primaryCity);
          } else {
            // For other searches, deduplicate by name
            filteredCities = data.results.reduce((unique, city) => {
              console.log('Deduplication Check:', city.name); // Log each city checked
              if (!unique.some((item) => item.name === city.name)) {
                unique.push(city);
              }
              return unique;
            }, []);
            console.log('Filtered Cities After Deduplication:', filteredCities);
          }

          setCityLookup(filteredCities);
        } else {
          console.log('No valid results data:', data);
          setCityLookup([]);
        }
      } catch (err) {
        console.error('Fetch Error:', err.message);
        setCityLookup([]);
      }
    };

    fetchCities();
  }, [search]);

  const handleCitySelect = (cityName) => {
    fetchWeatherData(cityName);
    toggleSearchModal();
    setSearch('');
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal">
      <div className="search-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="icon-small back-button"
          onClick={toggleSearchModal}
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            placeholder="Search for a city"
            autoFocus
          />
        </div>
      </div>

      {search.length <= 1 && (
        <div className="search-placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon-medium"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          Search for a city
        </div>
      )}

      <div className="search-results">
        {cityLookup.length > 0 ? (
          cityLookup.map((city, index) => (
            <div
              key={`item-${index}`}
              className="city-result"
              onClick={() => handleCitySelect(city.name)}
            >
              {city.name} 
            </div>
          ))
        ) : (
          search.length >= 2 && <p className="search-placeholder">No cities found for "{search}"</p>
        )}
      </div>
    </div>
  );
};

export default Search;