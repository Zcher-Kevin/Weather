// src/pages/Wind.js
import React, { useContext, useEffect, useRef } from "react";
import { WeatherDataContext } from "../components/Data";
import "../Css/Wind.css";

const Wind = () => {
    const { weatherData, error } = useContext(WeatherDataContext);
    const current = weatherData?.current || {};
    const needleRef = useRef(null);

    useEffect(() => {
        if (needleRef.current && current?.wind_direction_10m !== undefined) {
            const windDirection = current.wind_direction_10m; // Use wind_direction_10m
            console.log('Wind direction (degrees):', windDirection); // Debug the value
            needleRef.current.style.transform = `rotate(${windDirection}deg)`;
        }
    }, [weatherData]);

    return (
        <div className="wind-contain">
            <h2>Wind</h2>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <>
                    <div className="wind-data">
                        <div className="wind-info">
                            <p>Speed: {current.wind_speed_10m || 'N/A'} m/s</p>
                            <p>Direction: {current.wind_direction_10m || 'N/A'}°</p>
                        </div>
                        <div className="compass">
                            <div className="compass-base">
                                <div
                                    className="compass-arrow"
                                    ref={needleRef}
                                    style={{
                                        transform: current?.wind_direction_10m ? `rotate(${current.wind_direction_10m}deg)` : 'rotate(0deg)',
                                        transition: 'transform 0.5s ease',
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    
                </>
            )}
        </div>
    );
};

export default Wind;