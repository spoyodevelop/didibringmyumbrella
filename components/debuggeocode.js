"use client";
import React, { useState, useEffect, useRef } from "react";

const DebugGeocodeComponent = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const fetchingData = useRef(false); // useRef to track if data fetching is in progress

  async function fetchWeatherData(latitude, longitude) {
    const response = await fetch(
      `/api/weather?latitude=${latitude}&longitude=${longitude}`
    );

    if (!response.ok) {
      console.log(`Failed to fetch data: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  }

  const handleFetchWeather = async () => {
    if (!latitude || !longitude) {
      console.error("Latitude and Longitude are required.");
      return;
    }

    try {
      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <div>
        <label>Latitude:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button onClick={handleFetchWeather}>Fetch Weather</button>
      <br />
      <br />
      <div>
        Latitude: {latitude}
        <br />
        Longitude: {longitude}
        <br />
        Location Data: {JSON.stringify(weatherData)}
      </div>
    </div>
  );
};

export default DebugGeocodeComponent;
