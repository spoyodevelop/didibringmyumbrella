import { useWeatherStore } from "@/app/store/weather-store";
import { useEffect, useState } from "react";
import Loading from "./ui/Loading";
export default function RealPOPstats({ className }) {
  const { popData, weatherData } = useWeatherStore();
  const [realPOPdata, setRealPOPdata] = useState("");

  useEffect(() => {
    if (!popData || !weatherData) return;
    else if (popData.DBData && weatherData.POP) {
      const originalPOP = weatherData.POP.POP.fcstValue;
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
          setRealPOPdata(percentage);
        }
      }
    }
  }, [popData, weatherData]);

  return (
    <>
      {realPOPdata ? (
        <div className={className}>
          <div className="card-body">
            <h2 className="text-2xl text-black md:text-base card-title">
              실제 강수 확률{" "}
              <span className="text-4xl md:text-2xl lg:text-4xl">
                {realPOPdata}%
              </span>
            </h2>
            <p className="">계산된 강수 확률이에요.</p>
          </div>
        </div>
      ) : (
        <div className="w-64 lg:w-64 bg-slate-50 card">
          <div className="flex items-center justify-center card-body">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}
