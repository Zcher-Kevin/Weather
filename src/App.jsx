import React, { useState } from 'react';
import Data from './components/Data';
import SearchBar from './components/SearchBar';
import Search from './pages/Search';
import AppContent from './pages/AppContent'; // Updated to match the file name
import './App.css';

const App = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
    if (!isSearchModalOpen) {
      setSearchQuery(''); // Reset search query when opening the modal
    }
  };

  return (
    <Data initialCity="London">
      <AppContent
        isSearchModalOpen={isSearchModalOpen}
        toggleSearchModal={toggleSearchModal}
        searchQuery={searchQuery}
      />
    </Data>
  );
};

export default App;