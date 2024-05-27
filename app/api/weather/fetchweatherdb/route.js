import { NextResponse } from "next/server";
import { fetchWeatherDataWithRetry } from "@/util/fetchWeather";
import filterAndMapItems from "@/util/filterItems";
import { CAPITAL_LOCATION } from "@/util/locations";

export const dynamic = "force-dynamic";
export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const administrativeArea = searchParams.get("administrativeArea");

  if (!administrativeArea) {
    throw new Error("Administrative area is missing.");
  }
  function mergeLocationsData(capitalLocationData, administrativeArea) {
    const matchedPlace = capitalLocationData.filter(
      (capital) => capital.administrativeArea === administrativeArea
    );
    const matchedLocation = matchedPlace.length > 0 ? matchedPlace[0] : {};
    return {
      ...matchedLocation,
    };
  }

  const locationData = mergeLocationsData(CAPITAL_LOCATION, administrativeArea);

  const currentWeatherData = await fetchWeatherDataWithRetry(
    "DB",
    "currentData",
    locationData,
    2000
  ).catch((error) => {
    console.error("Error fetching current weather data:", error);
    throw new Error("Failed to fetch current weather data");
  });
  const pastWeatherData = await fetchWeatherDataWithRetry(
    "DB",
    "pastData",
    locationData,
    2000
  ).catch((error) => {
    console.error("Error fetching past weather data:", error);
    throw new Error("Failed to fetch past weather data");
  });

  const RN1 = filterAndMapItems(currentWeatherData, "RN1");
  const PTY = filterAndMapItems(currentWeatherData, "PTY");
  const POP = filterAndMapItems(pastWeatherData, "POP");
  const didItRain = PTY.PTY.obsrValue > 0;

  return NextResponse.json({ didItRain, RN1, PTY, POP });
}
