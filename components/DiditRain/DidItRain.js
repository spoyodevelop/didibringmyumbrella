"use client"; // This is a client-side component
import { useWeatherStore } from "@/app/store/weather-store";
import React, { useEffect, useState, useRef } from "react";
import Loading from "@/components/ui/Loading";
import WeatherData from "./WeatherData";
import { CAPITAL_LOCATION } from "@/util/locations";
import RealPOPstats from "../RealPOPstats";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import POPdata from "../POPData";

const DidItRain = ({ className }) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async (placeData) => {
    setIsLoading(true);
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
      setIsLoading(false);
      return data;
    } catch (error) {
      updateSystemMessage({
        status: "error",
        message: "날씨정보를 가져오는데 에러가 발생했어요.",
      });
      console.error("Error fetching weather data:", error);
      setIsLoading(false);
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
  const { didItRain } = weatherData;

  return (
    <div className={className}>
      <div className="mb-4 card md:mb-0">
        <div className="items-center card-body">
          <h1 className="text-lg lg:text-base">
            현재는 {finalDisplayingPlace} 데이터를 보여주고 있어요.
          </h1>
          {weatherData && didItRain ? (
            <h1 className="text-2xl text-black lg:3xl card-title">
              비가 내리고 있어요
            </h1>
          ) : (
            <h1 className="text-2xl text-black lg:3xl card-title">
              비가 내리지 않고 있어요
            </h1>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 md:flex-nowrap justify-evenly">
        {weatherData.POP ? (
          <WeatherData
            data={weatherData}
            typeOfData="POP"
            className="w-full mb-4 card md:w-auto md:mb-0 bg-slate-50"
          />
        ) : (
          <div className="w-64 lg:w-64 bg-slate-50 card">
            <div className="flex items-center justify-center card-body">
              <Loading />
            </div>
          </div>
        )}

        <RealPOPstats className="w-full mb-4 md:w-auto md:mb-0 card bg-slate-50" />

        {weatherData.RN1 ? (
          <WeatherData
            data={weatherData}
            typeOfData="RN1"
            className="w-full mb-4 md:w-auto md:mb-0 card bg-slate-50"
          />
        ) : (
          <div className="w-64 lg:w-64 bg-slate-50 card">
            <div className="flex items-center justify-center card-body">
              <Loading />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DidItRain;
