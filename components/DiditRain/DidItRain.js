import { useWeatherStore } from "@/app/store/weather-store";
import React, { useState, useRef, useEffect } from "react";
import Loading from "@/components/ui/Loading";
import WeatherData from "./WeatherData";
import { CAPITAL_LOCATION } from "@/util/locations";
import RealPOPstats from "../RealPOPstats";

import QuestionIcon from "../icons/QuestionButton";
import useSWR from "swr";
import ErrorCard from "../ui/ErrorCard";
import { IoMdRefresh } from "react-icons/io";
import useFormattedDate from "@/hooks/useFormattedDate";
const DidItRain = ({ className, onClick }) => {
  const isItInit = useRef(true);
  const [date, setDate] = useState(null);
  const {
    place,
    placeData,
    updateWeatherData,
    currentPlaceData,
    updateSystemMessage,
    updatePlaceData,
    popData,
  } = useWeatherStore();
  const [animate, setAnimate] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);
  useEffect(
    () =>
      setFormattedDate(
        new Date().toLocaleString("ko-KR", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      ),
    []
  );
  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
    mutate: mutateWeather,
  } = useSWR(
    () => {
      if (!placeData.administrativeArea) return null;
      if (!placeData) return null;
      let url = "";
      if (placeData.convertedX && placeData.convertedY) {
        url = `api/weather/fetchweather?convertedX=${placeData.convertedX}&convertedY=${placeData.convertedY}&administrativeArea=${placeData.administrativeArea}`;
      } else {
        url = `/api/weather/fetchweather?&administrativeArea=${placeData.administrativeArea}`;
      }
      return url;
    },
    async (url) => {
      try {
        const response = await fetch(url, { next: { revalidate: 1800 } });
        if (!response.ok) {
          // HTTP 에러 처리
          const errorMessage = await response.text();
          updateSystemMessage({
            status: "error",
            message: `날씨정보를 가져오는데 에러가 발생했어요. `,
          });
          return null;
        }
        const data = await response.json();
        updateSystemMessage({
          status: "success",
          message: `날씨정보를 가져왔어요.`,
        });
        updateWeatherData(data);
        return data;
      } catch (error) {
        updateSystemMessage({
          status: "error",
          message: "날씨정보를 가져오는데 에러가 발생했어요.",
        });
        console.error("Error fetching weather data:", error);
        throw error;
      }
    }
  );

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
  //rifting state up of RealPOPstats.js
  //send data to RealPOPstats.js
  //apply error data if weatherError is true
  function handleClick() {
    if (currentPlaceData?.convertedX && currentPlaceData?.convertedY) {
      fetch(
        `/api/cache?action=invalidate&key=weather_${currentPlaceData?.administrativeArea}_${currentPlaceData?.convertedX}_${currentPlaceData?.convertedY}`
      );
      fetch(
        `/api/cache?action=invalidate&key=weather_DB_${currentPlaceData?.administrativeArea}`
      );
      fetch(
        `/api/cache?action=invalidate&key=weather_POPdata_${currentPlaceData?.administrativeArea}`
      );
    } else {
      if (placeData) {
        fetch(
          `/api/cache?action=invalidate&key=weather_${placeData?.administrativeArea}`
        );
        fetch(
          `/api/cache?action=invalidate&key=weather_DB_${placeData?.administrativeArea}`
        );
        fetch(
          `/api/cache?action=invalidate&key=weather_POPdata_${placeData?.administrativeArea}`
        );
      }
    }
    mutateWeather();
    setAnimate(true);
    setFormattedDate(
      new Date().toLocaleString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
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
          <div className="flex flex-col items-center gap-2 mt-1">
            <button
              onClick={handleClick}
              className="flex items-center justify-center p-2 text-black bg-white rounded-full hover:bg-gray-100 hover:ring-2 hover:ring-offset-2 hover:ring-offset-slate-100 hover:ring-primary"
            >
              <IoMdRefresh
                size={24}
                className={`transform ${animate ? "rotate-animation" : ""}`}
                onAnimationEnd={() => setAnimate(false)}
              />
            </button>
            <p className="text-base">마지막 업데이트 : {formattedDate}</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4 stats rounded-xl bg-slate-100 stats-vertical xl:stats-horizontal">
        {!weatherLoading && !weatherError ? (
          <>
            <RealPOPstats className="flex flex-col xl:flex-col 2xl:flex-row item-center rounded-xl text-primary" />
            <WeatherData
              data={weatherData}
              typeOfData="POP"
              className="flex flex-col xl:flex-col 2xl:flex-row item-center rounded-xl text-primary "
            />
            <WeatherData
              data={weatherData}
              typeOfData="RN1"
              className="flex flex-col xl:flex-col 2xl:flex-row item-center rounded-xl text-primary"
            />
          </>
        ) : weatherError ? (
          // Assuming you have an ErrorComponent defined somewhere in your project
          <>
            <ErrorCard className="flex items-center justify-center w-full bg-slate-50 card text-primary" />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-40">
            <Loading size="lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DidItRain;
