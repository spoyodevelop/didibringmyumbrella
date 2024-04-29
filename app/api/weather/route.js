import { NextResponse } from "next/server";
import { fetchWeatherDataWithRetry } from "@/util/fetchWeather";
import { fetchClientLocationData } from "@/util/reverseGeolocation";
import { MongoClient } from "mongodb";

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const locationData = await fetchClientLocationData({ latitude, longitude });

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
