import { useWeatherStore } from "@/app/store/weather-store";
import { useState } from "react";

import ErrorCard from "./ui/ErrorCard";
import Loading from "./ui/Loading";
import AllPOPStatsIntro from "./AllPOPStatsIntro";
import AllPOPStatsMainSection from "./AllPOPStatsMainSection";
import NivoTotalBar from "./NivoTotalBar";
import AllPOPStatsCard from "./AllPOPStatsCard";
import AllPOPStatsSelect from "./AllPOPStatsSelect";

import "react-circular-progressbar/dist/styles.css";
import { transformDataForNivo } from "@/util/AllPOPstatsFormatting";

const AllPOPStats = ({ className }) => {
  const { allOfPOPDataStats, allOfPOPData } = useWeatherStore();
  const [selectedPOP, setSelectedPOP] = useState(0);

  const transformedData = transformDataForNivo(allOfPOPDataStats);

  const handleChange = (event) => {
    setSelectedPOP(event.target.value);
  };

  return (
    <section
      className={`${className} p-4 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg`}
      id="어느때우산"
    >
      <AllPOPStatsIntro className="flex flex-col items-center justify-center w-full gap-4 p-4 sm:p-6 md:rounded-lg" />
      {allOfPOPDataStats._id ? (
        <>
          <div className="flex flex-col w-full gap-4 md:gap-8 lg:flex-row lg:gap-12">
            <div className="flex flex-col items-center justify-center w-full gap-4 md:gap-8 lg:w-2/3">
              <div className="flex items-center justify-center w-full shadow-xl h-80 md:h-96 lg:rounded-xl">
                {transformedData ? (
                  <NivoTotalBar data={transformedData} />
                ) : (
                  <Loading size="lg" />
                )}
              </div>
              <AllPOPStatsMainSection className="flex flex-col w-full gap-4 p-4 bg-white rounded-lg shadow-lg sm:p-6 md:p-8 md:rounded-xl" />
            </div>
            <div className="flex flex-col items-center w-full gap-4 justify-evenly lg:w-1/3">
              <AllPOPStatsCard
                className="flex p-4 sm:p-6 bg-blue-100 rounded-lg shadow-lg transition duration-500 transform hover:scale-[1.03]"
                data={allOfPOPDataStats}
                percent={30}
              />
              <AllPOPStatsCard
                className="flex p-4 sm:p-6 bg-blue-100 rounded-lg shadow-lg transition duration-500 transform hover:scale-[1.03]"
                data={allOfPOPDataStats}
                percent={60}
              />
              <AllPOPStatsCard
                className="flex p-4 sm:p-6 bg-blue-100 rounded-lg shadow-lg transition duration-500 transform hover:scale-[1.03]"
                data={allOfPOPDataStats}
                percent={80}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-4 mt-8 lg:flex-row lg:gap-8">
            <div className="flex flex-col gap-4">
              <AllPOPStatsSelect
                onChange={handleChange}
                selectedPOP={selectedPOP}
                className="flex flex-col items-center gap-4 md:flex-row"
              />
              <p className="text-base text-center md:text-xl">
                강수 확률을 선택해서 확인해보세요.
              </p>
            </div>
            <AllPOPStatsCard
              className="flex p-4 sm:p-6 bg-blue-100 rounded-lg shadow-lg transition duration-500 transform hover:scale-[1.03]"
              data={allOfPOPDataStats}
              percent={selectedPOP}
            />
          </div>
        </>
      ) : (
        <ErrorCard />
      )}
    </section>
  );
};

export default AllPOPStats;
