"use client";
import React, { useState, useEffect, useRef } from "react";

const GeocodeComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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

  const fetchData = async () => {
    if (!fetchingData.current) {
      // Check if data fetching is already in progress
      fetchingData.current = true; // Set to true to prevent multiple fetch calls
      //gpt, add user permission to get location.
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatitude(latitude);
            setLongitude(longitude);

            const data = await fetchWeatherData(latitude, longitude);
            setWeatherData(data);
            console.log(data);

            fetchingData.current = false; // Reset to false after data fetch completes
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error sending data:", error);
        fetchingData.current = false; // Reset to false if an error occurs
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const handleClick = () => {
    fetchData(); // Fetch data when button is clicked
  };

  return (
    <div>
      <button onClick={handleClick}>Get Location</button>
      <br />
      Latitude: {latitude}
      <br />
      Longitude: {longitude}
      <br />
      Location Data: {JSON.stringify(weatherData)}
    </div>
  );
};

export default GeocodeComponent;
