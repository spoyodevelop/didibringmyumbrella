"use client";
import { useEffect } from "react";
import { CAPITAL_LOCATION } from "@/util/locations";

import { useWeatherStore } from "@/app/store/weather-store";

async function fetchLocationData(latitude, longitude) {
  const response = await fetch(
    `/api/weather/locationfetching?latitude=${latitude}&longitude=${longitude}`
  );

  if (!response.ok) {
    console.log(`Failed to fetch data: ${response.status}`);
  } else {
    const data = await response.json();
    return data;
  }
}

const CurrentLocation = () => {
  const {
    latitude,
    longitude,
    placeData,
    updatePlaceData,
    place,
    updatePlace,
    currentPlace,
    updateCurrentPlaceData,
  } = useWeatherStore();
  useEffect(() => {
    if (latitude && longitude) {
      fetchLocationData(latitude, longitude).then((data) => {
        updatePlaceData(data);
      });
    }
  }, [latitude, longitude]);
  useEffect(() => {
    if (place) {
      const locationData = CAPITAL_LOCATION.find(
        (capital) => capital.administrativeArea === place
      );
      updatePlaceData(locationData);
    }
  }, [place]);
  return (
    <div>
      <h1>Current Location</h1>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>

      <p>Weather Data: {JSON.stringify(currentPlace)}</p>
    </div>
  );
};
export default CurrentLocation;
// 지금 location 데이터를 어디서 받아오려는거야?
//latitude, longitude가 변경되면 이것을 호출하는게 맞는건가?
