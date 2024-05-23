import React, { useState, useEffect } from "react";
import { useWeatherStore } from "@/app/store/weather-store";
import RainOutOfBlueIntro from "./RainOutOfBlueIntro";

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

const RainOutOfBlue = ({ data, className }) => {
  const { currentPlaceData } = useWeatherStore();
  const [selectedArea, setSelectedArea] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [animatedData, setAnimatedData] = useState([]);
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

  useEffect(() => {
    setAnimatedData([]);
    if (sortedData.length > 0) {
      sortedData.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedData((prev) => [...prev, item]);
        }, index * 300); // 나타나는 간격을 300ms로 설정
      });
    }
  }, [sortedData]);
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
    <section className={`${className} p-6 bg-gray-100 rounded-lg shadow-lg`}>
      <RainOutOfBlueIntro className="mb-6" data={data} />

      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Filter by Area:
          <select
            value={selectedArea}
            onChange={handleAreaChange}
            className="block w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
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
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Sort by Date:
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="block w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Newest">최신순</option>
            <option value="Oldest">오래된 순</option>
          </select>
        </label>
      </div>

      {animatedData.length > 0 ? (
        <ul className="space-y-4">
          {animatedData.map((item, index) => (
            <li
              key={item._id}
              className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }} // 애니메이션 지연 시간 설정
            >
              <div className="text-3xl font-extrabold text-blue-500">
                {item?.RN1 ? item?.RN1 + "mm" : "빗방울"}
              </div>
              <div className="text-gray-600">
                {new Date(item.baseDate).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                })}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-lg font-medium text-center text-gray-500 animate-pulse">
          데이터가 없습니다
        </div>
      )}
    </section>
  );
};

export default RainOutOfBlue;
