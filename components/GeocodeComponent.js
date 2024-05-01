"use client";
import React, { useState, useEffect, useRef } from "react";
import { useWeatherStore } from "@/app/store/weather-store";

const GeocodeComponent = () => {
  const {
    latitude,
    longitude,

    updateLatitude,
    updateLongitude,
  } = useWeatherStore((state) => ({
    place: state.place,
    latitude: state.latitude,
    longitude: state.longitude,
    updateLatitude: state.updateLatitude,
    updateLongitude: state.updateLongitude,
    updatePlaceData: state.updatePlaceData,
  }));
  const fetchingData = useRef(false); // useRef to track if data fetching is in progress

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
            updateLatitude(latitude);
            updateLongitude(longitude);

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
    </div>
  );
};

export default GeocodeComponent;
