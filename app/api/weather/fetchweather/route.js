import { NextResponse } from "next/server";
import NodeCache from "node-cache";
import { fetchWeatherDataWithRetry } from "@/util/fetchWeather";
import filterAndMapItems from "@/util/filterItems";
import { CAPITAL_LOCATION } from "@/util/locations";

// 캐시 객체 생성 (TTL: 600초, 즉 10분)
const cache = new NodeCache({ stdTTL: 600 });

// export const dynamic = "force-dynamic";
export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const convertedX = searchParams.get("convertedX");
  const convertedY = searchParams.get("convertedY");
  const administrativeArea = searchParams.get("administrativeArea");

  if (administrativeArea === "totalOfAllArea") {
    return NextResponse.json({
      message: "totalOfAllArea has no weather data",
    });
  }
  if (!administrativeArea) {
    throw new Error("Administrative area is missing.");
  }

  // 캐시 키 생성 (예: "Seoul")
  const cacheKey = `weather_${administrativeArea}_${convertedX}_${convertedY}`;

  // 캐시에서 데이터 검색
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  let locationData;
  if (!convertedX || !convertedY) {
    locationData = CAPITAL_LOCATION.find(
      (capital) => capital.administrativeArea === administrativeArea
    );
  } else {
    locationData = {
      convertedX,
      convertedY,
      administrativeArea,
    };
  }

  const currentWeatherData = await fetchWeatherDataWithRetry(
    !convertedX || !convertedY ? "DB" : "client",
    "currentData",
    locationData,
    2000
  );
  const pastWeatherData = await fetchWeatherDataWithRetry(
    !convertedX || !convertedY ? "DB" : "client",
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
}
