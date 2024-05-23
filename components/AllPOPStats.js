import { useWeatherStore } from "@/app/store/weather-store";

import ErrorCard from "./ui/ErrorCard";
import Loading from "./ui/Loading";
import AllPOPStatsIntro from "./AllPOPStatsIntro";
import AllPOPStatsMainSection from "./AllPOPStatsMainSection";

import "react-circular-progressbar/dist/styles.css";
import NivoTotalBar from "./NivoTotalBar";
import { transformDataForNivo } from "@/util/AllPOPstatsFormatting";

import { useState } from "react";
import AllPOPStatsCard from "./AllPOPStatsCard";
import AllPOPStatsSelect from "./AllPOPStatsSelect";
const AllPOPStats = ({ className }) => {
  const { allOfPOPDataStats, allOfPOPData } = useWeatherStore();
  const [selectedPOP, setSelectedPOP] = useState(0);

  const transformedData = transformDataForNivo(allOfPOPDataStats);

  const handleChange = (event) => {
    setSelectedPOP(event.target.value);
  };
  return (
    <section className={className}>
      <AllPOPStatsIntro className="flex flex-col items-center justify-center w-full gap-2 p-4 overflow-x-scroll rounded-sm md:rounded-sm" />
      {allOfPOPDataStats._id ? (
        <>
          <div className="flex flex-col w-full lg:flex-row">
            <div className="flex flex-col items-center justify-center w-auto lg:flex-row">
              <div className="flex items-center justify-center w-full shadow-xl h-80 md:h-96 md:w-full lg:w-3/5 rounded-xl">
                {transformedData ? (
                  <NivoTotalBar data={transformedData} />
                ) : (
                  <Loading size="lg" />
                )}
              </div>
              <AllPOPStatsMainSection className="flex flex-col w-full h-auto gap-2 p-8 rounded-sm card lg:w-1/2 md:rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-4 mb-8 lg:flex-row lg:gap-8">
            <AllPOPStatsCard
              className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center transition duration-500 transform hover:scale-[1.03]"
              data={allOfPOPDataStats}
              percent={30}
            />
            <AllPOPStatsCard
              className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center transition duration-500 transform hover:scale-[1.03]"
              data={allOfPOPDataStats}
              percent={60}
            />
            <AllPOPStatsCard
              className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center transition duration-500 transform hover:scale-[1.03]"
              data={allOfPOPDataStats}
              percent={80}
            />
          </div>
          <AllPOPStatsSelect
            onChange={handleChange}
            selectedPOP={selectedPOP}
            className="flex flex-col items-center gap-4 md:flex-row"
          />
          <p className="text-base md:text-xl ">
            강수 확률을 선택해서 확인해보세요.
          </p>
          <AllPOPStatsCard
            className="flex p-6 bg-blue-100 rounded-lg shadow-lg lg:flex-row lg:items-center transition duration-500 transform hover:scale-[1.03]"
            data={allOfPOPDataStats}
            percent={selectedPOP}
          />
        </>
      ) : (
        <ErrorCard />
      )}
    </section>
  );
};

export default AllPOPStats;
