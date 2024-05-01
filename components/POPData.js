const { useEffect } = require("react");
import { useWeatherStore } from "@/app/store/weather-store";

async function fetchPOPData(administrativeArea) {
  const response = await fetch(
    `/api/weather/popdata?administrativeArea=${administrativeArea}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    console.log(`Failed to fetch data: ${response.status}`);
  } else {
    const data = await response.json();
    return data;
  }
}

const POPdata = () => {
  const { place, placeData, popData, updatePopData } = useWeatherStore();
  useEffect(() => {
    if (place === "currentLocation") {
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
