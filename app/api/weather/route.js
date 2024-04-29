import { NextResponse } from "next/server";
import { fetchWeatherDataWithRetry } from "@/util/fetchWeather";
import { fetchClientLocationData } from "@/util/reverseGeolocation";
import { MongoClient } from "mongodb";

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const currentTime = new Date().toLocaleTimeString();

  console.log("Current time:", currentTime);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  let locationData;
  let fetchingDataType = "client";
  try {
    locationData = await fetchClientLocationData({ latitude, longitude });
    console.log(locationData);
    //기본값으로 서울을 받아오게 할까? fallback 로직이 있어야 하는데...
  } catch (error) {
    console.error("Error in fetchClientLocationData:", error);
    throw error;
  }
  if (locationData.error) {
    fetchingDataType = "DB";
  }

  const currentWeatherData = await fetchWeatherDataWithRetry(
    fetchingDataType,
    "currentData",
    locationData,
    2000
  );
  const pastWeatherData = await fetchWeatherDataWithRetry(
    fetchingDataType,
    "pastData",
    locationData,
    2000
  );
  const DBurl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority&appName=WeatherCluster`;
  console.log(DBurl);
  const client = new MongoClient(DBurl, {});
  await client.connect();
  const db = client.db("POPdata");
  const collection = db.collection("weathers");

  const query = { administrativeArea: locationData.administrativeArea };
  const options = { sort: { newDate: -1 } };
  const DBData = await collection.findOne(query, options);
  await client.close();

  return NextResponse.json({
    latitude,
    longitude,
    locationData,
    currentWeatherData,
    pastWeatherData,
    DBData,
  });
}
