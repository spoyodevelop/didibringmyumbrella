import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

async function connectToDatabase() {
  const DBurl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority&appName=WeatherCluster`;
  const client = new MongoClient(DBurl, {});
  await client.connect();
  const db = client.db("POPdata");
  const collection = db.collection("weathers");
  console.log("omg they are calling db");
  return { client, collection };
}

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const administrativeArea = searchParams.get("administrativeArea");

  if (!administrativeArea) {
    return NextResponse.json({
      message: "Please provide an administrative area.",
    });
  }

  const { collection, client } = await connectToDatabase();
  const query = { administrativeArea };
  const options = { sort: { newDate: -1 } };
  const DBData = await collection.findOne(query, options);
  await client.close();

  return NextResponse.json({ DBData });
}
