import { useWeatherStore } from "@/app/store/weather-store";

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
    <div className={className}>
      <p>Weighted Average: {weightedAverage.toFixed(2)}</p>
    </div>
  );
}
