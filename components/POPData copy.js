const { useEffect, useState } = require("react");
import { useWeatherStore } from "@/app/store/weather-store";
import MyBarChart from "./NivoBar";
import Loading from "./ui/Loading";

const POPdata = () => {
  const {
    place,
    placeData,
    popData,
    updatePopData,
    currentPlaceData,
    updateSystemMessage,
    updatePopDataForNivo,
    popDataForNivo,
    updatePastPOPData,
    updateAllOfPOPData,
    allOfPOPData,
  } = useWeatherStore();

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

  async function fetchPOPData(administrativeArea) {
    if (!administrativeArea) {
      return;
    }
    const response = await fetch(
      `/api/weather/popdata?administrativeArea=${administrativeArea}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      updateSystemMessage({
        status: "error",
        message: `강수확률정보를 가져오는데 에러가 발생했어요.`,
      });
    } else {
      const data = await response.json();
      updateSystemMessage({
        status: "success",
        message: `강수확률정보를 가져왔어요.`,
      });
      return data;
    }
  }
  useEffect(() => {
    if (place === "currentLocation") {
      if (!currentPlaceData) {
        fetchPOPData("Seoul")
          .then((data) => {
            updatePopData(data);
          })
          .catch((error) => {
            updateSystemMessage({
              status: "error",
              message: `현재 위치의 강수확률정보를 가져오는데 에러가 발생했어요.`,
            });
          });
      } else {
        fetchPOPData(placeData.administrativeArea)
          .then((data) => {
            updatePopData(data);
          })
          .catch((error) => {
            updateSystemMessage({
              status: "error",
              message: `현재 위치의 강수확률정보를 가져오는데 에러가 발생했어요.`,
            });
          });
      }
    } else if (place) {
      fetchPOPData(place)
        .then((data) => {
          updatePopData(data);
        })
        .catch((error) => {
          updateSystemMessage({
            status: "error",
            message: `현재 위치의 강수확률정보를 가져오는데 에러가 발생했어요.`,
          });
        });
    } else if (placeData) {
      fetchPOPData(placeData.administrativeArea)
        .then((data) => {
          updatePopData(data);
        })
        .catch((error) => {
          updateSystemMessage({
            status: "error",
            message: `현재 위치의 강수확률정보를 가져오는데 에러가 발생했어요.`,
          });
        });
    }
  }, [placeData]);
  useEffect(() => {
    fetchPOPData("totalOfAllArea").then((data) => {
      if (data.DBData) {
        const transformedData = transformDataForNivoChart(data.DBData);
        console.log(transformedData);
        updateAllOfPOPData({ popDataForNivo: transformedData });
      }
    });
  }, []);
  useEffect(() => {
    if (!popData) return;
    else if (popData.DBData) {
      const transformedData = transformDataForNivoChart(popData.DBData);
      updatePastPOPData({ popDataForNivo: transformedData });
      updatePopDataForNivo({ popDataForNivo: transformedData });
    }
  }, [popData]);

  return (
    <>
      {popDataForNivo?.popDataForNivo ? (
        <MyBarChart data={popDataForNivo.popDataForNivo} />
      ) : (
        <Loading size="lg" />
      )}
    </>
  );
};
export default POPdata;