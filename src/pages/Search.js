import React, { useState, useEffect, useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import '../Css/Search.css';

const Search = ({ isOpen, toggleSearchModal, initialQuery }) => {
  const { fetchWeatherData } = useContext(WeatherDataContext);
  const [search, setSearch] = useState(initialQuery || '');
  const [cityLookup, setCityLookup] = useState([]);

  useEffect(() => {
    setSearch(initialQuery || '');
    if (!initialQuery) {
      setCityLookup([]); // Clear results when initialQuery is empty
    }
  }, [initialQuery]);

  useEffect(() => {
    // Clear results if search is empty
    if (!search) {
      setCityLookup([]);
      return;
    }

    // Only fetch if search length is 2 or more
    if (search.length < 2) {
      setCityLookup([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const query = encodeURIComponent(search);
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`;

        const response = await fetch(url);
        console.log('Fetch Response Status:', response.status);
        const data = await response.json();
        console.log('Open-Meteo Geocoding Response:', data);

        if (data.results && Array.isArray(data.results)) {
          console.log('Raw Results Data:', data.results);
          let filteredCities = data.results;

          if (search.toLowerCase().includes('hong kong')) {
            const primaryCity = data.results.reduce((primary, city) => {
              console.log('City Population Check:', city.name, city.population);
              return (primary.population || 0) > (city.population || 0) ? primary : city;
            }, data.results[0] || {});
            filteredCities = [primaryCity];
            console.log('Selected Primary City:', primaryCity);
          } else {
            filteredCities = data.results.reduce((unique, city) => {
              console.log('Deduplication Check:', city.name);
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
          Searching for a city...
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