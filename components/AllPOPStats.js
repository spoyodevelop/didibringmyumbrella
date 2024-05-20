import { useWeatherStore } from "@/app/store/weather-store";
import MyBarChart from "./NivoBar";
import ErrorCard from "./ui/ErrorCard";
import Loading from "./ui/Loading";
import AllPOPStatsIntro from "./AllPOPStatsIntro";
import AllPOPStatsMainSection from "./AllPOPStatsMainSection";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import NivoTotalBar from "./NivoTotalBar";

const AllPOPStats = ({ className }) => {
  const { allOfPOPDataStats, allOfPOPData } = useWeatherStore();

  function transformDataForNivo(data) {
    // Initialize an empty array to hold the transformed data
    let transformedData = [];

    // Iterate through each key in the data object
    Object.keys(data).forEach((key) => {
      // Check if the key starts with 'POP'
      if (/^POP\d+$/.test(key)) {
        // Extract the population group number
        let populationGroupNumber = parseInt(key.replace("POP", ""));
        if (data[key].arrayLength < 4) {
          return;
        }
        // Create a new object for each population group
        let groupData = {
          강수확률: `${populationGroupNumber}%`,
          예보횟수: data[key].arrayLength,
          비가내린횟수: data[key].didItRainCount,
        };

        // Add the new object to the transformed data array
        transformedData.push(groupData);
      }
    });

    // Return the transformed data
    return transformedData;
  }

  function calculatePercentage(numerator, denominator) {
    // 분모가 0인 경우 오류 처리
    if (denominator === 0) {
      return "Error: Division by zero";
    }

    // 퍼센트 계산
    let percentage = (numerator / denominator) * 100;

    return percentage;
  }
  function financial(num, to) {
    return Number.parseFloat(num).toFixed(to);
  }
  // 예시 사용법

  function calculateArrayLength(startPopulation) {
    let Length = 0;
    let Rain = 0;
    for (let i = startPopulation; i <= 100; i += 10) {
      const key = `POP${i}`;
      if (allOfPOPDataStats[key]) {
        Length += allOfPOPDataStats[key]?.arrayLength;
        Rain += allOfPOPDataStats[key]?.didItRainCount;
      }
    }
    return { Length, Rain };
  }
  let totalLength;
  if (allOfPOPDataStats["totalArrayCount"]) {
    totalLength = allOfPOPDataStats["totalArrayCount"];
  }
  const transformedData = transformDataForNivo(allOfPOPDataStats);

  const POPpercentage = (percent, tofixed) =>
    financial(
      calculatePercentage(
        calculateArrayLength(percent)?.Rain,
        calculateArrayLength(percent)?.Length
      ),
      tofixed
    );

  return (
    <section className={className}>
      <AllPOPStatsIntro className="flex flex-col items-center justify-center w-full gap-2 p-4 overflow-x-scroll rounded-sm md:rounded-sm" />
      <div className="flex flex-col overflow-x-scroll lg:flex-row">
        <div className="flex w-full lg:w-1/2 h-96">
          {transformedData ? (
            <NivoTotalBar data={transformedData} />
          ) : (
            <Loading size="lg" />
          )}
        </div>
        <AllPOPStatsMainSection className="flex flex-col w-full gap-2 p-4 overflow-x-scroll rounded-sm card lg:w-1/2 md:rounded-xl" />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row lg:gap-8 ">
        <div className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center ">
          <div>
            <div className="flex flex-col items-center mb-8 space-x-4 lg:mr-4">
              <div className="text-3xl">🌥️</div>
              <h2 className="text-2xl font-bold text-blue-800">
                강수확률 30% 이상일때,
              </h2>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="mt-4 text-blue-800 lg:mt-0">
                    우산을 챙겼다면...{" "}
                    <span className="font-semibold">
                      {financial(calculateArrayLength(30)?.Length / 136, 2)}일
                    </span>{" "}
                    동안 우산을 챙겼습니다.
                  </p>
                  <p className="mt-2 text-blue-800">
                    <span className="font-semibold">
                      {financial(calculateArrayLength(30)?.Rain / 136, 1)}일
                    </span>{" "}
                    동안 비가 내렸습니다.
                  </p>
                  <p className="mt-2 text-blue-800">
                    <span className="font-semibold">
                      {POPpercentage(30, 2)}%
                    </span>
                    의 확률로 우산이 쓸모 있었습니다.
                  </p>
                </div>
                <div className="w-1/4 h-1/4">
                  <CircularProgressbar
                    value={POPpercentage(30, 2)}
                    text={`${POPpercentage(30, 2)}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center ">
          <div>
            <div className="flex flex-col items-center mb-8 space-x-4 lg:mr-4">
              <div className="text-3xl">☁️</div>
              <h2 className="text-2xl font-bold text-blue-800">
                강수확률 60% 이상일때,
              </h2>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="mt-4 text-blue-800 lg:mt-0">
                    우산을 챙겼다면...{" "}
                    <span className="font-semibold">
                      {financial(calculateArrayLength(60)?.Length / 136, 2)}일
                    </span>{" "}
                    동안 우산을 챙겼습니다.
                  </p>
                  <p className="mt-2 text-blue-800">
                    <span className="font-semibold">
                      {financial(calculateArrayLength(60)?.Rain / 136, 1)}일
                    </span>{" "}
                    동안 비가 내렸습니다.
                  </p>
                  <p className="mt-2 text-blue-800">
                    <span className="font-semibold">
                      {POPpercentage(60, 2)}%
                    </span>
                    의 확률로 우산이 쓸모 있었습니다.
                  </p>
                </div>
                <div className="w-1/4 h-1/4">
                  <CircularProgressbar
                    value={POPpercentage(60, 2)}
                    text={`${POPpercentage(60, 2)}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center ">
          <div>
            <div className="flex flex-col items-center mb-8 space-x-4 lg:mr-4">
              <div className="text-3xl">🌧️</div>
              <h2 className="text-2xl font-bold text-blue-800">
                강수확률 80% 이상일때,
              </h2>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="mt-4 text-blue-800 lg:mt-0">
                    우산을 챙겼다면...{" "}
                    <span className="font-semibold">
                      {financial(calculateArrayLength(80)?.Length / 136, 2)}일
                    </span>{" "}
                    동안 우산을 챙겼습니다.
                  </p>
                  <p className="mt-2 text-blue-800">
                    <span className="font-semibold">
                      {financial(calculateArrayLength(80)?.Rain / 136, 2)}일
                    </span>{" "}
                    동안 비가 내렸습니다.
                  </p>
                  <p className="mt-2 text-blue-800">
                    <span className="font-semibold">
                      {POPpercentage(80, 2)}%
                    </span>
                    의 확률로 우산이 쓸모 있었습니다.
                  </p>
                </div>
                <div className="w-1/4 h-1/4">
                  <CircularProgressbar
                    value={POPpercentage(80, 2)}
                    text={`${POPpercentage(80, 2)}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllPOPStats;
