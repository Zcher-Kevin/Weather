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

/*
 * Error Summary and Resolutions
 *
 * Throughout the development of this weather application, several errors were encountered and resolved. Below is a detailed account of each issue, its root cause, and the solution applied:
 *
 * 1. **Initial Error: 'time bonuses' Typo in 10-day.js**
 *    - **Description**: An error occurred due to a typo in `10-day.js` where `new Date(time bonuses)` was used instead of `new Date(time)`, causing a syntax error.
 *    - **Cause**: The variable `time bonuses` was not defined, likely a mistype during editing.
 *    - **Resolution**: Corrected the typo to `new Date(time)` and ensured proper iteration over the `daily.time` array from the Open-Meteo API. The file was renamed to `Tenday.js` for consistency.
 *
 * 2. **Geocoding Error: 'No value found (expected type 'String') at path 'name'**
 *    - **Description**: The Open-Meteo Geocoding API failed with this error when searching for cities like "London".
 *    - **Cause**: The API call in `Data.js` used `query` and `limit` instead of the correct `name` and `count` parameters, and `Search.js` had inconsistent response handling.
 *    - **Resolution**: Updated `Data.js` to use `name` and `count`, and adjusted `Search.js` to correctly parse the `results` array from the API response. Added validation and logging to handle invalid responses.
 *
 * 3. **Serialization Error: 'Data corrupted at path 'format'. Cannot initialize ProtobufSerializationFormat from invalid String value flatbuffers'**
 *    - **Description**: An error occurred due to an invalid serialization format (`flatbuffers`) when using the `openmeteo` package.
 *    - **Cause**: The `openmeteo` package expected Protobuf but received an incompatible format, possibly due to an outdated package or API misconfiguration.
 *    - **Resolution**: Added `format: 'protobuf'` to API calls in `Data.js` and `Search.js`, with a JSON fallback. Later, switched to raw `fetch` calls with `format=json` to bypass `openmeteo` issues after persistent failures.
 *
 * 4. **Scope Error: ''forecastParams' is not defined' in Data.js and ''params' is not defined' in Search.js**
 *    - **Description**: Linting errors (`no-undef`) occurred because `forecastParams` and `params` were defined inside `try` blocks, making them inaccessible in fallback blocks.
 *    - **Cause**: Variable scoping issue due to declarations being block-scoped rather than function-scoped.
 *    - **Resolution**: Moved `forecastParams` and `params` declarations outside the `try` blocks in `Data.js` and `Search.js` to ensure accessibility in fallback logic.
 *
 * 5. **Fetch Failure: 'Failed to fetch weather data (Protobuf and JSON failed)'**
 *    - **Description**: Both Protobuf and JSON fallback attempts failed, resulting in no weather data being displayed.
 *    - **Cause**: Possible network issues, incorrect API endpoints, outdated `openmeteo` package, or CORS restrictions. The `openmeteo` package might have been incompatible with the API.
 *    - **Resolution**: Uninstalled the `openmeteo` package, switched to raw `fetch` calls with JSON in `Data.js` and `Search.js`, and added detailed logging. Manual API testing was recommended to verify endpoint availability.
 *
 * These resolutions involved iterative updates to the codebase, including parameter corrections, serialization handling, scope adjustments, and a shift to direct HTTP requests. The application now uses JSON-based `fetch` calls to ensure reliability as of 06:48 PM HKT on Sunday, June 08, 2025. For future maintenance, verify API endpoint status and consider updating dependencies regularly.
 */

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
        <div className='content'>
          <div className='left-panel'>
            <div className='search-bar'>
              <SearchBar toggleSearchModal={toggleSearchModal} setSearchQuery={setSearchQuery} />
            </div>
            <div className='main-item'>
              <Main />
            </div>
          </div>
          <div className='right-panel'>
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
      </div>
    </Data> 
  );
}

export default App;


