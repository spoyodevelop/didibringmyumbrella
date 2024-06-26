import { NextResponse } from "next/server";
import cache from "@/lib/cache";
import { fetchWeatherDataWithRetry } from "@/util/fetchWeather";
import filterAndMapItems from "@/util/filterItems";
import { CAPITAL_LOCATION } from "@/util/locations";

// 캐시 객체 생성 (TTL: 600초, 즉 10분)

// export const dynamic = "force-dynamic";
export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const administrativeArea = searchParams.get("administrativeArea");
  //get the administrativeArea from the query parameter

  if (!administrativeArea) {
    throw new Error("Administrative area is missing.");
  }
  //merge the administrativeArea with the capitalLocationData, and return the matched location data
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

  //cacheKey is the key to store the data in the cache
  const cacheKey = `weather_DB_${administrativeArea}`;

  //check if the data is already in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Cached data:", cachedData);
    return NextResponse.json(cachedData);
  } else {
    console.log("No cached data for key:", cacheKey);
  }

  try {
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

    const responseData = { didItRain, RN1, PTY, POP };

    // 응답 데이터를 캐시에 저장
    cache.set(cacheKey, responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}
