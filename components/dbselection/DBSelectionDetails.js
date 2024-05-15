"use client";

import React, { useEffect } from "react";
import SelectDB from "./SelectDB";
import { CAPITAL_LOCATION } from "@/util/locations";
import { useWeatherStore } from "@/app/store/weather-store";

const DBSelection = ({ className }) => {
  const { place, updatePlace, currentPlaceData } = useWeatherStore((state) => ({
    place: state.place,
    updatePlace: state.updatePlace,
    currentPlaceData: state.currentPlaceData,
  }));

  const handleSelectChange = async (e) => {
    const newValue = e.target.value;
    updatePlace(newValue);
    console.log(currentPlaceData);
  };

  let displayingPlace = CAPITAL_LOCATION.find(
    (capital) => capital.administrativeArea === place
  )?.administrativeAreaKorean;
  if (place === "currentLocation" && !currentPlaceData?.administrativeArea) {
    displayingPlace = "기본 위치 (서울 중구)";
  }
  return (
    <div className={className}>
      {place ? (
        <p className="text-sm">현재 선택된 광역시는 {displayingPlace}</p>
      ) : (
        <p className="text-sm">
          광역시를 선택해주세요. 기본 위치는 서울 중구입니다.
        </p>
      )}

      <SelectDB
        selectedValue={place}
        onSelectChange={handleSelectChange}
        className="select select-primary"
      />
    </div>
  );
};

export default DBSelection;
