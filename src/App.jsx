import React, { useState } from 'react';
import Data from './components/Data';
import AppContent from './pages/AppContent'; // New wrapper component
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