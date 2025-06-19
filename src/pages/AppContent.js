// src/pages/AppContent.js
import React, { useContext } from 'react';
import { WeatherDataContext } from '../components/Data';
import Search from './Search';
import Main from './Main';
import Hourly from './Hourly';
import TenDay from './Tenday';
import UV from './UV';
import Wind from './Wind';
import SearchBar from '../components/SearchBar';

const AppContent = ({ isSearchModalOpen, toggleSearchModal, searchQuery }) => {
  const { loading } = useContext(WeatherDataContext);

  return (
    <div className="app">
      {loading ? (
        <div className="loading-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div className="content">
            <div className="left-panel">
              <div className="search-bar">
                <SearchBar toggleSearchModal={toggleSearchModal} />
              </div>
              <div className="main-item">
                <Main />
              </div>
            </div>
            <div className="divider"></div>
            <div className="right-panel">
              <div className="hourly-item">
                <Hourly />
              </div>
              <div className="tenday-item">
                <TenDay />
              </div>
              <div className="smaller-item-list">
                <div className="uv-item">
                  <UV />
                </div>
                <div className="wind-item">
                  <Wind />
                </div>
              </div>
            </div>
          </div>
          <Search isOpen={isSearchModalOpen} toggleSearchModal={toggleSearchModal} initialQuery={searchQuery} />
        </>
      )}
    </div>
  );
};

export default AppContent;