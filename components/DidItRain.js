"use client"; // This is a client-side component
import { useWeatherStore } from "@/app/store/weather-store";
import React, { useEffect, useRef } from "react";

const DidItRain = () => {
  const isItInit = useRef(true);
  const {
    place,
    placeData,
    updateWeatherData,
    weatherData,
    currentPlaceData,
    updateSystemMessage,
    updatePlaceData,
  } = useWeatherStore();
  const fetchWeatherData = async (placeData) => {
    let url = "";
    if (placeData.convertedX && placeData.convertedY) {
      url = `api/weather/fetchweather?convertedX=${placeData.convertedX}&convertedY=${placeData.convertedY}&administrativeArea=${placeData.administrativeArea}`;
    } else {
      url = `/api/weather/fetchweather?&administrativeArea=${placeData.administrativeArea}`;
    }

    try {
      const response = await fetch(url, { next: { revalidate: 3600 } });

      if (!response.ok) {
        // HTTP 에러 처리
        const errorMessage = await response.text();
        updateSystemMessage({
          status: "error",
          message: `날씨정보를 가져오는데 에러가 발생했어요. ${errorMessage}`,
        });
        return;
      }

      const data = await response.json();
      updateSystemMessage({
        status: "success",
        message: `날씨정보를 가져왔어요.`,
      });
      return data;
    } catch (error) {
      updateSystemMessage({
        status: "error",
        message: "날씨정보를 가져오는데 에러가 발생했어요.",
      });
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };
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
