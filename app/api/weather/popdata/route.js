import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import NodeCache from "node-cache";

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

// 캐시 객체 생성 (TTL: 600초, 즉 10분)
const cache = new NodeCache({ stdTTL: 600 });

async function connectToDatabase() {
  const DBurl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority&appName=WeatherCluster`;
  const client = new MongoClient(DBurl, {});
  await client.connect();
  const db = client.db("POPdata");
  const collection = db.collection("weathers");
  console.log("Database connection established");
  return { client, collection };
}

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const administrativeArea = searchParams.get("administrativeArea");

  if (!administrativeArea) {
    throw new Error("Administrative area is missing.");
  }

  // 캐시 키 생성
  const cacheKey = `weather_POPdata_${administrativeArea}`;

  // 캐시에서 데이터 검색
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    const { collection, client } = await connectToDatabase();

    const query = { administrativeArea };
    const options = { sort: { newDate: -1 } };
    const DBData = await collection.findOne(query, options);

    await client.close();

    const responseData = { DBData };

    // 응답 데이터를 캐시에 저장
    cache.set(cacheKey, responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error processing request:", error);
    throw new Error("Failed to process request");
  }
}
