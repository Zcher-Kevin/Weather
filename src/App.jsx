import React, {useState} from 'react';
import Data from './components/Data';
import SearchBar from './components/SearchBar';
import Search from './pages/Search';
import Main from './pages/Main';
import Hourly from './pages/Hourly';
import TenDay from './pages/Tenday';
import UV from './pages/UV';
import Wind from './pages/Wind';
import './App.css';

const App = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
    if (!isSearchModalOpen) {
      setSearchQuery(''); // Reset search query when opening the modal
    }
  }

  return (
    <Data initialCity="London">
      <div className='app'>
        <SearchBar toggleSearchModal={toggleSearchModal}
          setSearchQuery={setSearchQuery} />
        <div className='content'>
          <div className='left-panel'>
            <Main />
          </div>
          <div className='right-panel'>
            <div className="right-item">
              <Hourly />
            </div>
            <div className="right-item">
              <TenDay />
            </div>
            <div className="right-item">
              <UV />
            </div>
            <div className="right-item">
              <Wind />
            </div>
          </div>
        </div>
        <Search isOpen={isSearchModalOpen} toggleSearchModal={toggleSearchModal} initialQuery={searchQuery} />
      </div>
    </Data> 
  );
}

export default App;
