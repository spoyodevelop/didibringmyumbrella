import React from "react";
import { useWeatherStore } from "@/app/store/weather-store";
import { FaUmbrella, FaCloudRain, FaChartBar } from "react-icons/fa";

const AllPOPStatsMainSection = ({ className }) => {
  const { allOfPOPDataStats, allOfPOPData } = useWeatherStore();
  const now = new Date();
  const startDate = new Date(2024, 3, 21);
  const diffInMilliseconds = now - startDate;

  // Convert milliseconds to days
  const daysPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return (
    <section
      className={`${className} p-2 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg`}
    >
      <section className="flex flex-col space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-blue-700 lg:text-3xl">
            <FaCloudRain className="inline-block mb-1 mr-2 text-blue-500" />
            강수 정보를 톺아 보면...
          </h1>
        </div>
        <div className="p-6 mb-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
          <h2 className="mb-2 text-lg font-semibold text-blue-600 lg:text-xl">
            어떤 확률이 눈에 띄나요?
          </h2>
          <p className="leading-relaxed text-gray-700">
            총 {allOfPOPDataStats["POP30"]?.arrayLength}개의 30% 강수 확률
            예보가 있었어요. 그리고 총 {allOfPOPDataStats["POP60"]?.arrayLength}{" "}
            개의 60% 강수 확률 예보가 있었어요. 100% 비가 내린다고 한적은{" "}
            {allOfPOPDataStats["POP100"]?.arrayLength}번이였고, 실제로도{" "}
            {allOfPOPDataStats["POP100"]?.didItRainCount}번 강수가 관측되었어요.
          </p>
        </div>
        <div className="p-6 mb-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
          <h2 className="mb-2 text-lg font-semibold text-blue-600 lg:text-xl">
            {allOfPOPDataStats["totalArrayCount"]}개의 강수확률 예보를 분석한
            결과에요.
          </h2>
          <p className="leading-relaxed text-gray-700">
            2024년 4월 21일 부터 지금까지, 총 {daysPassed}일 동안 자료를 긁어
            모았어요.
          </p>
        </div>
        <div className="self-center p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-4 text-2xl font-semibold text-center text-blue-700 lg:text-3xl">
              우산을 챙기는거.. 귀찮죠..?
            </h2>
            <p className="mb-4 text-center text-gray-700">
              강수 확률 % 부터 우산을 챙기는것이 좋은지 살펴볼까요?
            </p>
            <FaUmbrella className="text-5xl text-blue-500" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default AllPOPStatsMainSection;
