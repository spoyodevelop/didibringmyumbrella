const { useEffect, useState } = require("react");
import { useWeatherStore } from "@/app/store/weather-store";
import MyBarChart from "./NivoBar";

const POPdata = () => {
  const {
    place,
    placeData,
    popData,
    updatePopData,
    currentPlaceData,
    updateSystemMessage,
  } = useWeatherStore();

  const [popDataForNivo, setPopDataForNivo] = useState({});
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

    return transformedData;
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
        fetchPOPData("Seoul").then((data) => {
          updatePopData(data);
          return;
        });
      }
      fetchPOPData(placeData.administrativeArea).then((data) => {
        updatePopData(data);
      });
    } else if (place) {
      fetchPOPData(place).then((data) => {
        updatePopData(data);
      });
    } else if (placeData) {
      fetchPOPData(placeData.administrativeArea).then((data) => {
        updatePopData(data);
      });
    }
  }, [placeData]);
  useEffect(() => {
    if (!popData) return;
    else if (popData.DBData) {
      console.log(popData.DBData);
      const transformedData = transformDataForNivoChart(popData.DBData);
      console.log(transformedData);

      setPopDataForNivo(transformedData);
    }
  }, [popData]);
  return (
    <>
      {/* <p>{JSON.stringify(popDataForNivo)}</p>
      <p>place:{place}</p>
      <p>placeData:{placeData.administrativeArea}</p> */}
      <h1>POP Data</h1>
      
      {popDataForNivo.length > 0 && <MyBarChart data={popDataForNivo} />}
    </>
  );
};
export default POPdata;
