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
    if (!popData || !weatherData) return;
    else if (popData.DBData && weatherData.POP) {
      let originalPOP = weatherData.POP.POP.fcstValue;
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
          <div className="card-body">
            <h2 className="text-xl text-black lg:text-sm xl:text-xl card-title">
              실제 강수 확률{" "}
              <span className="text-2xl lg:text-2xl xl:text-3xl">
                {realPOPstats.percentage}%
              </span>
            </h2>
            <p className="text-sm">
              계산된 강수 확률이에요.( 강수 횟수:{" "}
              {realPOPstats.realPOP.didItRainCount} / 총 예보 횟수 :{" "}
              {realPOPstats.realPOP.arrayLength} )
            </p>
          </div>
        </div>
      )}
    </>
  );
}
