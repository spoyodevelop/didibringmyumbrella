import { CircularProgressbar } from "react-circular-progressbar";
import { useWeatherStore } from "@/app/store/weather-store";
import { useState } from "react";
export default function AllPOPStatsUserSelection({ className }) {
  const { allOfPOPDataStats } = useWeatherStore();
  const [selectedPOP, setSelectedPOP] = useState(0);
  function calculatePercentage(numerator, denominator) {
    // 분모가 0인 경우 오류 처리
    if (denominator === 0) {
      return "Error: Division by zero";
    }

    // 퍼센트 계산
    let percentage = (numerator / denominator) * 100;

    return percentage;
  }
  function calculateArrayLength(startPopulation) {
    let Length = 0;
    let Rain = 0;
    startPopulation = Number(startPopulation);
    for (let i = startPopulation; i <= 100; i += 10) {
      const key = `POP${i}`;
      if (allOfPOPDataStats[key]) {
        Length += allOfPOPDataStats[key]?.arrayLength;
        Rain += allOfPOPDataStats[key]?.didItRainCount;
      }
    }
    return { Length, Rain };
  }
  function financial(num, to) {
    return Number.parseFloat(num).toFixed(to);
  }
  const POPpercentage = (percent, tofixed) =>
    financial(
      calculatePercentage(
        calculateArrayLength(percent)?.Rain,
        calculateArrayLength(percent)?.Length
      ),
      tofixed
    );
  const handleChange = (event) => {
    setSelectedPOP(event.target.value);
  };
  return (
    <div className={className}>
      <select onChange={handleChange} value={selectedPOP}>
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
        <option value="90">90</option>
        <option value="100">100</option>
      </select>
      <div className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center ">
        <div>
          <div className="flex flex-col items-center mb-8 space-x-4 lg:mr-4">
            <div className="text-3xl">🌧️</div>
            <h2 className="text-2xl font-bold text-blue-800">
              강수확률 {selectedPOP}% 이상일때,
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center">
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="mt-4 text-blue-800 lg:mt-0">
                  우산을 챙겼다면...{" "}
                  <span className="font-semibold">
                    {financial(
                      calculateArrayLength(selectedPOP)?.Length / 136,
                      2
                    )}
                    일
                  </span>{" "}
                  동안 우산을 챙겼습니다.
                </p>
                <p className="mt-2 text-blue-800">
                  <span className="font-semibold">
                    {financial(
                      calculateArrayLength(selectedPOP)?.Rain / 136,
                      2
                    )}
                    일
                  </span>{" "}
                  동안 비가 내렸습니다.
                </p>
                <p className="mt-2 text-blue-800">
                  <span className="font-semibold">
                    {POPpercentage(selectedPOP, 2)}%
                  </span>
                  의 확률로 우산이 쓸모 있었습니다.
                </p>
              </div>
              <div className="w-1/4 h-1/4">
                <CircularProgressbar
                  value={POPpercentage(selectedPOP, 2)}
                  text={`${POPpercentage(selectedPOP, 2)}%`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
