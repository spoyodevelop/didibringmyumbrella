import { useWeatherStore } from "@/app/store/weather-store";
import SquallMeterIntro from "./SquallMeterIntro";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import SquallMeterMainSection from "./SquallMeterMainSection";
import ErrorCard from "./ui/ErrorCard";
import RainOutOfBlue from "./RainOutOfBlue";

export default function SquallMeter({ className }) {
  const { allOfPOPDataStats } = useWeatherStore();
  const weights = {
    POP0: 4,
    POP10: 2,
    POP20: 2,
    POP30: 2,
  };

  // 각 확률 구간에서 비가 온 비율을 계산합니다.
  const rainRatios = (data) => {
    return {
      POP0: data?.POP0?.didItRainCount,
      POP10: data?.POP10?.didItRainCount,
      POP20: data?.POP20?.didItRainCount,
      POP30: data?.POP30?.didItRainCount,
    };
  };

  // 가중 평균 계산 함수
  function calculateWeightedAverage(rainRatios, weights) {
    let weightedSum = 0;
    let totalWeight = 0;

    for (let pop in rainRatios) {
      if (rainRatios?.hasOwnProperty(pop) && weights?.hasOwnProperty(pop)) {
        weightedSum += rainRatios[pop] * weights[pop];
        totalWeight += weights[pop];
      }
    }

    return weightedSum / totalWeight;
  }

  // 비율 계산
  const rainRatiosData = rainRatios(allOfPOPDataStats);

  // 가중 평균 계산
  const weightedAverage = calculateWeightedAverage(rainRatiosData, weights);

  return (
    <section
      className={`${className}  p-2 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg`}
      id="스콜미터"
    >
      <SquallMeterIntro className="flex flex-col items-center justify-center w-full gap-4 p-4 sm:p-6 md:rounded-lg" />
      {allOfPOPDataStats._id ? (
        <>
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <SquallMeterMainSection />
            <div className="w-2/5 mb-4 ">
              <CircularProgressbarWithChildren
                value={weightedAverage.toFixed(2)}
              >
                <div className="transition duration-500 transform  hover:scale-[1.03] flex items-center justify-center flex-col ">
                  <h2 className="text-lg font-bold text-blue-600 sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl">
                    {weightedAverage.toFixed(2)}%
                  </h2>
                  <h2 className="mb-4 text-sm text-black sm:text-base md:text-2xl">
                    소나기미터
                  </h2>
                  <p className="hidden text-xs xl:block xl:text-sm">
                    높을수록 갑작스런
                  </p>
                  <p className="hidden text-xs xl:block xl:text-sm">
                    소나기가 올 확률이 높아요.
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </>
      ) : (
        <ErrorCard />
      )}
    </section>
  );
}
