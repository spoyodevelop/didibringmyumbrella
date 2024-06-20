import { NextResponse } from "next/server";
import cache from "@/lib/cache";

// API 라우트 핸들러
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const key = searchParams.get("key");

  let response = {};

  if (action === "show") {
    if (key) {
      // 특정 키에 대한 캐시 데이터를 반환
      const cachedData = cache.get(key);
      if (cachedData) {
        response = { key, data: cachedData };
      } else {
        response = { message: "No cached data for the given key." };
      }
    } else {
      // 모든 캐시 데이터를 반환
      const keys = cache.keys();
      const allCachedData = keys.map((key) => ({
        key,
        data: cache.get(key),
      }));
      response = allCachedData;
    }
  } else if (action === "invalidate" && key) {
    // 특정 키에 대한 캐시 데이터를 무효화
    cache.del(key);
    response = { message: `Cache invalidated for key: ${key}` };
  } else if (action === "invalidateAll") {
    // 모든 캐시 데이터를 무효화
    cache.flushAll();
    response = { message: "All cache invalidated" };
  } else {
    response = {
      message: "Invalid action. Use 'show', 'invalidate', or 'invalidateAll'",
    };
  }

  return NextResponse.json(response);
}
