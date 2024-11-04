import { useWeatherStore } from "@/app/store/weather-store";
import { useEffect } from "react";
import Loading from "./ui/Loading";
import rounding from "@/util/rounding";
export default function RealPOPstats({ className }) {
  const {
    popData,
    weatherData,
    realPOPstats,
    updateRealPOPstats,
    updatePopData,
    updateWeatherData,
  } = useWeatherStore();

  useEffect(() => {
    if (!popData || !weatherData.POP) return;
    else if (popData.DBData && weatherData.POP) {
      let originalPOP = weatherData.POP.POP?.fcstValue;
      originalPOP = rounding(originalPOP);
      const realPOP = popData.DBData[`POP${originalPOP}`];

      let percentage = 0;
      if (
        typeof realPOP.didItRainCount === "number" &&
        typeof realPOP.arrayLength === "number"
      ) {
        if (realPOP.arrayLength !== 0 && realPOP.didItRainCount === 0) {
          percentage = 0;
        } else {
          percentage = (realPOP.didItRainCount / realPOP.arrayLength) * 100;
          percentage = Math.round(percentage);
        }
        if (!isNaN(percentage)) {
          updateRealPOPstats({ percentage, realPOP, originalPOP });
        }
      }
    }
  }, [popData, weatherData, updatePopData, updateWeatherData]);
  // 이게 잘 맞는지 다시한번 확인해보기.
  return (
    <>
      {(realPOPstats.percentage === 0 || realPOPstats.percentage) && (
        <div className={className}>
          <div className="stat">
            <div className="font-bold text-black stat-title">
              실제 강수 확률
            </div>
            <div className="stat-value">{realPOPstats.percentage}%</div>
            <div className="stat-desc">계산된 강수 확률이에요.</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: realPOPstats.percentage + "%" }}
              >
                {" "}
              </div>
            </div>
          </div>
          <div className="stat">
            <div className="font-bold text-black stat-title">강수 횟수</div>
            <div className="stat-value">
              {realPOPstats.realPOP.didItRainCount}
            </div>
            <div className="stat-desc">
              총 예보 횟수 : {realPOPstats.realPOP.arrayLength}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
