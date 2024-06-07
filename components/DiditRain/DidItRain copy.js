"use client"; // This is a client-side component
import { useWeatherStore } from "@/app/store/weather-store";
import React, { useEffect, useState, useRef } from "react";
import Loading from "@/components/ui/Loading";
import WeatherData from "./WeatherData";
import { CAPITAL_LOCATION } from "@/util/locations";
import RealPOPstats from "../RealPOPstats";

import QuestionIcon from "../icons/QuestionButton";

const DidItRain = ({ className, onClick }) => {
  const isItInit = useRef(true);
  const {
    place,
    placeData,
    updateWeatherData,
    weatherData,
    currentPlaceData,
    updateSystemMessage,
    updatePlaceData,
    popData,
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

  function getDisplayingPlace(place) {
    let displayingPlace = "";
    if (place === "currentLocation") {
      if (currentPlaceData.administrativeArea) {
        displayingPlace = "현위치";
      } else {
        displayingPlace = "기본위치";
      }
    } else if (place === "") {
      displayingPlace = "기본위치";
    } else {
      displayingPlace = CAPITAL_LOCATION.find(
        (capital) => capital.administrativeArea === place
      )?.administrativeAreaKorean;
    }
    return displayingPlace;
  }
  let finalDisplayingPlace = getDisplayingPlace(place);
  let didItRain;
  if (weatherData) {
    ({ didItRain } = weatherData);
  }

  return (
    <div className={className}>
      <div className="card">
        <div className="flex items-center justify-center card-body">
          <h2 className="text-lg lg:text-sm">
            현재 {finalDisplayingPlace} 데이터를 보여주고 있어요.
          </h2>
          {(weatherData && weatherData?.didItRain) ||
          weatherData?.RN1?.RN1?.obsrValue > 0 ? (
            <h1 className="text-2xl text-black lg:3xl card-title">
              비가 내리고 있어요{" "}
              <QuestionIcon buttonSize="xs" onClick={onClick} />
            </h1>
          ) : (
            <h1 className="text-2xl text-black lg:3xl card-title">
              비가 내리지 않고 있어요{" "}
              <QuestionIcon buttonSize="xs" onClick={onClick} />
            </h1>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:flex-nowrap justify-evenly">
        {weatherData?.POP ? (
          <WeatherData
            data={weatherData}
            typeOfData="POP"
            className="shadow-lg card bg-slate-50"
          />
        ) : (
          <div className="flex items-center justify-center w-64 lg:w-64 bg-slate-50 card">
            <div className="card-body">
              <Loading />
            </div>
          </div>
        )}

        <RealPOPstats className="items-center shadow-lg card bg-slate-50" />

        {weatherData?.RN1 ? (
          <WeatherData
            data={weatherData}
            typeOfData="RN1"
            className="shadow-lg card bg-slate-50"
          />
        ) : (
          <div className="flex items-center justify-center w-64 lg:w-64 bg-slate-50 card">
            <div className="card-body">
              <Loading />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DidItRain;
