"use client";

import React, { useEffect } from "react";
import SelectDB from "./SelectDB";
import { CAPITAL_LOCATION } from "@/util/locations";
import { useWeatherStore } from "@/app/store/weather-store";

const DBSelection = ({ className }) => {
  const { place, updatePlace } = useWeatherStore((state) => ({
    place: state.place,
    updatePlace: state.updatePlace,
  }));

  const handleSelectChange = async (e) => {
    const newValue = e.target.value;
    updatePlace(newValue);
  };

  return (
    <div className={className}>
      <p>
        혹은, 광역시의 위치를 선택해서 날씨정보를 확인할수 있어요.
        {/* {
          CAPITAL_LOCATION.find(
            (capital) => capital.administrativeArea === place
          )?.administrativeAreaKorean // Use optional chaining to avoid errors
        } */}
      </p>

      <SelectDB
        selectedValue={place}
        onSelectChange={handleSelectChange}
        className="select select-primary"
      />
    </div>
  );
};

export default DBSelection;
