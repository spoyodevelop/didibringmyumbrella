import React from "react";
import { useWeatherStore } from "@/app/store/weather-store";

const SquallMeterMainSection = ({ className }) => {
  const { allOfPOPDataStats, allOfPOPData } = useWeatherStore();
  const now = new Date();
  const startDate = new Date(2024, 3, 21);
  const diffInMilliseconds = now - startDate;

  // 밀리초를 일수로 변환합니다.
  const daysPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return (
    <section className={className}>
      <div className="w-full rounded-lg shadow-md md:rounded-xl md:shadow-base bg-slate-200">
        <section className="flex flex-col p-0 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-xl lg:text-2xl">방금까지만 해도 맑았는데...</h1>
          </div>
          <div className="mb-4">
            <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
              갑작스런 비가 왔어요!
            </h2>
            <p>
              예보에서는 분명 비가 안온다고 했는데 ,{" "}
              {allOfPOPDataStats["POP0"].didItRainCount}번이나 비가 온적이
              있어요. 총 {allOfPOPDataStats["POP0"].arrayLength}번의 0%
              강수예보중, {allOfPOPDataStats["POP0"].didItRainCount}번이 비가
              왔어요. 또, 총 {allOfPOPDataStats["POP30"].arrayLength}번의 30%
              강수예보중, {allOfPOPDataStats["POP30"].didItRainCount}번이 비가
              왔어요.
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
                갑작스런 비가 오면 올수록 스콜미터가 높아져요.
              </h2>
              <p className="text-center">
                기후변화가 심해지면서 점점 더 스콜메터가 높아질까요?
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default SquallMeterMainSection;
