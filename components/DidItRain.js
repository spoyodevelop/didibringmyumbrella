"use client"; // This is a client-side component
import { useWeatherStore } from "@/app/store/weather-store";
import React, { useEffect, useRef } from "react";

const fetchWeatherData = async (placeData) => {
  let url = "";
  if (placeData.convertedX && placeData.convertedY) {
    url = `api/weather/fetchweather?convertedX=${placeData.convertedX}&convertedY=${placeData.convertedY}&administrativeArea=${placeData.administrativeArea}`;
  } else {
    url = `/api/weather/fetchweather?&administrativeArea=${placeData.administrativeArea}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Failed to fetch data: ${response.status}`);
  } else {
    const data = await response.json();
    return data;
  }
};

const DidItRain = () => {
  const isItInit = useRef(true);
  const {
    place,
    placeData,
    updateWeatherData,
    weatherData,
    currentPlaceData,
    updatePlaceData,
  } = useWeatherStore();

  useEffect(() => {
    if (!placeData.administrativeArea) return;
    if (!placeData) return;

    //1. currentLocation에서 placeData를 받아온다.
    //2. placeData가 바뀌었기 때문에,
    if (placeData.administrativeArea === "totalOfAllArea") {
      updateWeatherData({ message: "totalOfAllArea has no weather data" });
    }

    if (placeData) {
      fetchWeatherData(placeData).then((data) => {
        updateWeatherData(data);
      });
    }
  }, [updatePlaceData, placeData]);

  return (
    <div>
      <p>place:{place}</p>
      <p>placeData:{JSON.stringify(placeData)}</p>
      <h1>Did It Rain?</h1>
      <p>Weather Data: {JSON.stringify(weatherData)}</p>
    </div>
  );
};

export default DidItRain;
