import { NextResponse } from "next/server";
import { fetchWeatherDataWithRetry } from "@/util/fetchWeather";
import filterAndMapItems from "@/util/filterItems";
import { CAPITAL_LOCATION } from "@/util/locations";

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const convertedX = searchParams.get("convertedX");
  const convertedY = searchParams.get("convertedY");
  const administrativeArea = searchParams.get("administrativeArea");
  console.log(convertedX, convertedY, administrativeArea);
  if (administrativeArea === "totalOfAllArea") {
    return NextResponse.json({
      message: "totalOfAllArea has no weather data",
    });
  }
  if (!administrativeArea) {
    throw new Error("Administrative area is missing.");
  }

  if (!convertedX || !convertedY) {
    const locationData = CAPITAL_LOCATION.find(
      (capital) => capital.administrativeArea === administrativeArea
    );

    const currentWeatherData = await fetchWeatherDataWithRetry(
      "DB",
      "currentData",
      locationData,
      2000
    );
    const pastWeatherData = await fetchWeatherDataWithRetry(
      "DB",
      "pastData",
      locationData,
      2000
    );
    const RN1 = filterAndMapItems(currentWeatherData, "RN1");
    const PTY = filterAndMapItems(currentWeatherData, "PTY");
    const POP = filterAndMapItems(pastWeatherData, "POP");
    const didItRain = PTY.PTY.obsrValue > 0;
    return NextResponse.json({ didItRain, RN1, PTY, POP });
  }

  const locationData = {
    convertedX,
    convertedY,
    administrativeArea,
  };

  const currentWeatherData = await fetchWeatherDataWithRetry(
    "client",
    "currentData",
    locationData,
    2000
  );
  const pastWeatherData = await fetchWeatherDataWithRetry(
    "client",
    "pastData",
    locationData,
    2000
  );

  const RN1 = filterAndMapItems(currentWeatherData, "RN1");
  const PTY = filterAndMapItems(currentWeatherData, "PTY");
  const POP = filterAndMapItems(pastWeatherData, "POP");
  const didItRain = PTY.PTY.obsrValue > 0;

  return NextResponse.json({ didItRain, RN1, PTY, POP });
}
