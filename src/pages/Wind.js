// This card is used to show the current wind data ( Speed, Direction ...)

import React, { useContext} from "react";
import { WeatherDataContext } from "../components/Data";
import "../Css/Wind.css";

const Wind = () => {
    const { weatherData, error} = useContext(WeatherDataContext);
    const current = weatherData?.current || {};

    return (
        <div className="wind-contain">
            <h2>Wind</h2>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div>
                    <p>Speed: {current.wind_speed_10m || 'N/A'} m/s</p>
                    <p>Direction: {current.wind_direction_10m || 'N/A'}°</p>
                </div>
            )}
        </div>
    );
};

export default Wind;