import { CAPITAL_LOCATION } from "@/util/locations";
import { useWeatherStore } from "@/app/store/weather-store";

const SelectDB = ({ selectedValue, onSelectChange, className }) => {
  const { currentPlaceData } = useWeatherStore();
  return (
    <select
      value={selectedValue}
      onChange={onSelectChange}
      className={className}
    >
      {CAPITAL_LOCATION.map((location) => (
        <option
          key={location.administrativeArea}
          value={location.administrativeArea}
        >
          {location.administrativeArea === "currentLocation"
            ? !currentPlaceData.administrativeArea
              ? "기본위치"
              : "현 위치"
            : location.administrativeAreaKorean}
        </option>
      ))}
    </select>
  );
};

export default SelectDB;
