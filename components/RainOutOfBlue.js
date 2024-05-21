import React, { useState, useEffect } from "react";
import { useWeatherStore } from "@/app/store/weather-store";

// Reference data
const CAPITAL_LOCATION = [
  { administrativeArea: "Seoul", administrativeAreaKorean: "서울특별시" },
  { administrativeArea: "Busan", administrativeAreaKorean: "부산광역시" },
  { administrativeArea: "Daegu", administrativeAreaKorean: "대구광역시" },
  { administrativeArea: "Incheon", administrativeAreaKorean: "인천광역시" },
  { administrativeArea: "Gwangju", administrativeAreaKorean: "광주광역시" },
  { administrativeArea: "Daejeon", administrativeAreaKorean: "대전광역시" },
  { administrativeArea: "Ulsan", administrativeAreaKorean: "울산광역시" },
  {
    administrativeArea: "Sejong-si",
    administrativeAreaKorean: "세종특별자치시",
  },
  { administrativeArea: "Gyeonggi-do", administrativeAreaKorean: "경기도" },
  {
    administrativeArea: "Gangwon-do",
    administrativeAreaKorean: "강원특별자치도",
  },
  {
    administrativeArea: "Chungcheongbuk-do",
    administrativeAreaKorean: "충청북도",
  },
  {
    administrativeArea: "Chungcheongnam-do",
    administrativeAreaKorean: "충청남도",
  },
  {
    administrativeArea: "Jeollabuk-do",
    administrativeAreaKorean: "전북특별자치도",
  },
  { administrativeArea: "Jeollanam-do", administrativeAreaKorean: "전라남도" },
  {
    administrativeArea: "Gyeongsangbuk-do",
    administrativeAreaKorean: "경상북도",
  },
  {
    administrativeArea: "Gyeongsangnam-do",
    administrativeAreaKorean: "경상남도",
  },
  { administrativeArea: "Jeju-do", administrativeAreaKorean: "제주특별자치도" },
];

const RainOutOfBlue = ({ data }) => {
  const { currentPlaceData } = useWeatherStore();
  const [selectedArea, setSelectedArea] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  data = data.rainOutOfBlue;
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const newFilteredData =
        selectedArea === "All"
          ? data
          : data.filter((item) => item.administrativeArea === selectedArea);

      setFilteredData(newFilteredData);
    }
  }, [selectedArea, data]);

  useEffect(() => {
    if (filteredData && Array.isArray(filteredData)) {
      const newSortedData = [...filteredData].sort((a, b) => {
        if (sortOrder === "Newest") {
          return new Date(b.baseDate) - new Date(a.baseDate);
        } else {
          return new Date(a.baseDate) - new Date(b.baseDate);
        }
      });
      setSortedData(newSortedData);
    }
  }, [sortOrder, filteredData]);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const getAreaKoreanName = (administrativeArea) => {
    const location = CAPITAL_LOCATION.find(
      (loc) => loc.administrativeArea === administrativeArea
    );
    return location ? location.administrativeAreaKorean : "자료가 없습니다";
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <label>
        Filter by Area:
        {selectedArea}
        <select value={selectedArea} onChange={handleAreaChange}>
          <option value="All">전체</option>

          {CAPITAL_LOCATION.map((area) => (
            <option
              key={area.administrativeArea}
              value={area.administrativeArea}
            >
              {area.administrativeAreaKorean}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sort by Date:
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="Newest">최신순</option>
          <option value="Oldest">오래된 순</option>
        </select>
      </label>
      <ul>
        {sortedData.map((item) => (
          <li key={item._id}>
            {getAreaKoreanName(item.administrativeArea)} -{" "}
            {new Date(item.baseDate).toLocaleString()} {""}
            {item?.RN1 ? item?.RN1 : "빗방울"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RainOutOfBlue;
