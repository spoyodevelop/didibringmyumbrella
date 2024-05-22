import React from "react";
import { useWeatherStore } from "@/app/store/weather-store";

const AllPOPStatsMainSection = ({ className }) => {
  const { allOfPOPDataStats, allOfPOPData } = useWeatherStore();
  const now = new Date();
  const startDate = new Date(2024, 3, 21);
  const diffInMilliseconds = now - startDate;

  // 밀리초를 일수로 변환합니다.
  const daysPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return (
    <section className={className}>
      <section className="flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-xl lg:text-2xl">강수 정보를 톺아 보면...</h1>
        </div>
        <div className="mb-4">
          <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
            어떤 확률이 눈에 띄나요?
          </h2>
          <p>
            총 {allOfPOPDataStats["POP30"]?.arrayLength}개의 30% 강수 확률
            예보가 있었어요.그리고 총 {allOfPOPDataStats["POP60"]?.arrayLength}
            개의 60% 강수 확률 예보가 있었어요. 100% 비가 내린다고 한적은{" "}
            {allOfPOPDataStats["POP100"]?.arrayLength}번이였고, 실제로도{" "}
            {allOfPOPDataStats["POP100"]?.didItRainCount}번 강수가 관측되었어요.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
            {allOfPOPDataStats["totalArrayCount"]}개의 강수확률 예보를 분석한
            결과에요.
          </h2>
          <p>
            {" "}
            2024년 4월 21일 부터 지금까지, 총 {daysPassed}일 동안 자료를 긁어
            모았어요.
          </p>
        </div>
        <div className="self-center card">
          <div className="flex justify-center card-body">
            <h2 className="text-xl font-semibold text-center text-black lg:text-2xl">
              우산을 챙기는거.. 귀찮죠..?
            </h2>
            <p>강수 확률 % 부터 우산을 챙기는것이 좋은지 살펴볼까요?</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AllPOPStatsMainSection;
