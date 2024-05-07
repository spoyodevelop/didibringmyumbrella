"use client";
import GeocodeComponent from "@/components/GeocodeComponent";
import CurrentLocation from "@/components/currentlocation/CurrentLocation";
import DidItRain from "@/components/DiditRain/DidItRain";
import { useWeatherStore } from "@/app/store/weather-store";
import Notification from "@/components/ui/Notification";

import DBSelection from "@/components/dbselection/DBSelectionDetails";
import POPdata from "@/components/POPData";

export default function Home() {
  const { systemMessage, currentPlaceData, weatherData } = useWeatherStore();
  return (
    <>
      <div className="mb-4 bg-black">
        <h1 className="text-4xl font-bold text-center text-white">
          아맞다 우산
        </h1>
        <p className="text-center text-white">
          실제 강수확률을 체크해보세요. <br />
          <span className="text-sm">
            아래 버튼을 눌러 현재 위치를 확인하세요.
          </span>
        </p>
      </div>
      {/* <div className="w-4/5 p-6 mb-4 rounded-lg shadow-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 align-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Current Place:</h2>
        <p className="text-gray-200">{JSON.stringify(currentPlaceData)}</p>
        <h2 className="mt-4 text-2xl font-bold text-white">System Message:</h2>
        <p className="text-gray-200">{JSON.stringify(systemMessage)}</p>
        <h2 className="mt-4 text-2xl font-bold text-white">Weather Data:</h2>
        <p className="text-gray-200">{JSON.stringify(weatherData)}</p>
      </div> */}

      <div className="px-4">
        <div className="flex items-center justify-center gap-4">
          <GeocodeComponent />
          <CurrentLocation />
        </div>
      </div>
      <DBSelection />

      <DidItRain className="flex flex-col items-center w-11/12 gap-4 p-5 rounded-xl lg:flex-row md:flex-col bg-slate-200 mb-11" />
      <div className="w-11/12 h-64 shadow-md bg-slate-100 rounded-xl">
        <POPdata />
      </div>
      <Notification />
    </>
  );
}
