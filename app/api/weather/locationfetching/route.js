import { NextResponse } from "next/server";
import { fetchWeatherDataWithRetry } from "@/util/fetchWeather";
import { fetchClientLocationData } from "@/util/reverseGeolocation";

import filterAndMapItems from "@/util/filterItems";

// export const dynamic = "force-dynamic";
export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  let locationData;

  try {
    locationData = await fetchClientLocationData({ latitude, longitude });

    //기본값으로 서울을 받아오게 할까? fallback 로직이 있어야 하는데...
  } catch (error) {
    console.error("Error in fetchClientLocationData:", error);
    throw error;
  }

  return NextResponse.json({
    latitude,
    longitude,
    ...locationData,
  });
}
