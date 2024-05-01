"use client";

import React, { useEffect } from "react";
import SelectDB from "./SelectDB";
import { CAPITAL_LOCATION } from "@/util/locations";
import { useWeatherStore } from "@/app/store/weather-store";

const DBSelection = () => {
  const { place, updatePlace } = useWeatherStore((state) => ({
    place: state.place,
    updatePlace: state.updatePlace,
  }));

  const handleSelectChange = async (e) => {
    const newValue = e.target.value;
    updatePlace(newValue);
  };

  return (
    <div>
      <SelectDB selectedValue={place} onSelectChange={handleSelectChange} />
      <p>
        {
          CAPITAL_LOCATION.find(
            (capital) => capital.administrativeArea === place
          )?.administrativeAreaKorean // Use optional chaining to avoid errors
        }
      </p>
    </div>
  );
};

export default DBSelection;
