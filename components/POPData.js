const { useEffect } = require("react");
import { useWeatherStore } from "@/app/store/weather-store";

const POPdata = () => {
  const {
    place,
    placeData,
    popData,
    updatePopData,
    currentPlaceData,
    updateSystemMessage,
  } = useWeatherStore();
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
  return (
    <div>
      <p>place:{place}</p>
      <p>placeData:{placeData.administrativeArea}</p>
      <h1>POP Data</h1>
      <p>Weather Data: {JSON.stringify(popData)}</p>
    </div>
  );
};
export default POPdata;
