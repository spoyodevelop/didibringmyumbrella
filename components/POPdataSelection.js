import { useWeatherStore } from "@/app/store/weather-store";
import { use, useEffect, useState } from "react";

const POPDataSelection = ({ className }) => {
  const { allOfPOPData, pastPOPData, updatePopDataForNivo, place } =
    useWeatherStore();
  const [selectedPlace, setSelectedPlace] = useState("place");
  const handleSelectChange = (event) => {
    setSelectedPlace(event.target.value);
  };
  useEffect(() => {
    if (selectedPlace === "place") {
      updatePopDataForNivo(pastPOPData);
    } else if (selectedPlace === "totalOfallArea") {
      updatePopDataForNivo(allOfPOPData);
    }
  }, [selectedPlace]);
  useEffect(() => {
    setSelectedPlace("place");
  }, [place]);
  return (
    <select
      value={selectedPlace}
      onChange={handleSelectChange}
      className={className}
    >
      <option value="place">선택된 지역의 강수확률을 보여줍니다.</option>
      <option value="totalOfallArea">전국의 강수확률을 보여줍니다.</option>
    </select>
  );
};

export default POPDataSelection;
