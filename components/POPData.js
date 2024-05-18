const { useEffect, useState } = require("react");
import useSWR from "swr";
import { useWeatherStore } from "@/app/store/weather-store";
import Loading from "./ui/Loading";
import MyBarChart from "./NivoBar";
import ErrorCard from "./ui/ErrorCard";
const POPdata = () => {
  const {
    place,
    placeData,
    updatePopData,
    currentPlaceData,
    updateSystemMessage,
    updatePopDataForNivo,
    popDataForNivo,
    updatePastPOPData,
    updateAllOfPOPData,
  } = useWeatherStore();

  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      updateSystemMessage({
        status: "error",
        message: `An error occurred while fetching the data. ${response.statusText}`,
      });

      throw new Error("An error occurred while fetching the data.");
    }
    const data = await response.json();
    updatePopData(data);
    return data;
  };

  const {
    data: popData,
    error: popDataError,
    isLoading: popDataLoading,
  } = useSWR(() => {
    if (place === "currentLocation") {
      if (!currentPlaceData) {
        return `/api/weather/popdata?administrativeArea=Seoul`;
      } else {
        return `/api/weather/popdata?administrativeArea=${placeData.administrativeArea}`;
      }
    } else if (place) {
      //god knows why this is happens.
      if (!place) return;
      return `/api/weather/popdata?administrativeArea=${place}`;
    } else if (placeData) {
      if (!placeData.administrativeArea) return;
      return `/api/weather/popdata?administrativeArea=${placeData.administrativeArea}`;
    }
  }, fetcher);

  const {
    data: allOfPOPData,
    error: allOfPOPDataError,
    isLoading: allofPOPdataLoading,
  } = useSWR("/api/weather/popdata?administrativeArea=totalOfAllArea", fetcher);

  useEffect(() => {
    if (allOfPOPData) {
      const transformedData = transformDataForNivoChart(allOfPOPData.DBData);
      updateAllOfPOPData({ popDataForNivo: transformedData });
    }
  }, [allOfPOPData]);

  useEffect(() => {
    if (popData) {
      const transformedData = transformDataForNivoChart(popData.DBData);
      updatePastPOPData({ popDataForNivo: transformedData });
      updatePopDataForNivo({ popDataForNivo: transformedData });
    }
  }, [popData]);

  function transformDataForNivoChart(data) {
    // Initialize the array to store the transformed data
    const transformedData = [];
    // Iterate over the keys of the data object
    Object.keys(data).forEach((key) => {
      // Check if the key starts with "POP"
      if (key.startsWith("POP")) {
        // Ensure the data object has the required properties and they are numbers
        if (
          typeof data[key].didItRainCount === "number" &&
          typeof data[key].arrayLength === "number"
        ) {
          let percentage = 0;
          // Calculate the percentage
          if (data[key].arrayLength !== 0 && data[key].didItRainCount === 0) {
            percentage = 0;
          } else {
            percentage =
              (data[key].didItRainCount / data[key].arrayLength) * 100;
            percentage = Math.round(percentage);
          }
          // Check if the percentage is NaN
          if (!isNaN(percentage)) {
            // Create a transformed data object
            const transformedItem = {
              id: key, // POP category name
              value: percentage, // Percentage value
            };
            // Add the transformed item to the array
            transformedData.push(transformedItem);
          }
        }
      }
    });
    const newData = transformedData.map((item) => {
      // id 필드의 값에서 'POP' 부분을 제거하고, '%' 문자를 추가합니다.
      const newId = item.id.replace("POP", "") + "%";
      // 실강수% 필드를 추가합니다.
      return {
        id: newId,
        실강수: item.value,
      };
    });
    return newData;
  }

  return (
    <>
      {allOfPOPData && popData ? (
        <MyBarChart data={popDataForNivo.popDataForNivo} />
      ) : popDataError || allOfPOPDataError ? (
        // Assuming you have an ErrorComponent defined somewhere in your project
        <>
          <ErrorCard className="flex items-center justify-center" />
        </>
      ) : (
        <Loading size="lg" />
      )}
    </>
  );
};

export default POPdata;
