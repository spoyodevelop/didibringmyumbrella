import { useWeatherStore } from "@/app/store/weather-store";
import SquallMeterIntro from "./SquallMeterIntro";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import SquallMeterMainSection from "./SquallMeterMainSection";
import ErrorCard from "./ui/ErrorCard";

export default function SquallMeter({ className }) {
  const { allOfPOPDataStats } = useWeatherStore();

  // Ensure allOfPOPDataStats and totalSonagiMeter exist before accessing them
  let sonagiMeter = 0;
  if (allOfPOPDataStats?.totalSonagiMeter?.length > 0) {
    const lastSonagiMeter =
      allOfPOPDataStats?.totalSonagiMeter[
        allOfPOPDataStats?.totalSonagiMeter?.length - 1
      ].sonagiMeter;
    sonagiMeter = parseFloat(lastSonagiMeter) || 0; // Ensure it's a number
  }

  return (
    <section
      className={`${className} p-2 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg`}
      id="스콜미터"
    >
      <SquallMeterIntro className="flex flex-col items-center justify-center w-full gap-4 p-4 sm:p-6 md:rounded-lg" />

      {allOfPOPDataStats?._id ? (
        <>
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <SquallMeterMainSection />
            <div className="w-2/5 mb-4">
              <CircularProgressbarWithChildren value={sonagiMeter.toFixed(2)}>
                <div className="transition duration-500 transform hover:scale-[1.03] flex items-center justify-center flex-col">
                  <h2 className="text-lg font-bold text-blue-600 sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl">
                    {sonagiMeter.toFixed(2)}%
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
