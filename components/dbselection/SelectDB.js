import { CAPITAL_LOCATION } from "@/util/locations";

const SelectDB = ({ selectedValue, onSelectChange }) => {
  return (
    <select value={selectedValue} onChange={onSelectChange}>
      {CAPITAL_LOCATION.map((location) => (
        <option
          key={location.administrativeArea}
          value={location.administrativeArea}
        >
          {location.administrativeAreaKorean}
        </option>
      ))}
    </select>
  );
};

export default SelectDB;
