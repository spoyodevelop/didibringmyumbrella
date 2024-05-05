"use client";
import GeocodeComponent from "@/components/GeocodeComponent";
import CurrentLocation from "@/components/currentlocation/CurrentLocation";
import DidItRain from "@/components/DidItRain";
import { useWeatherStore } from "@/app/store/weather-store";
import Notification from "@/components/ui/Notification";

import DBSelection from "@/components/dbselection/DBSelectionDetails";
import POPdata from "@/components/POPData";

export default function Home() {
  const { systemMessage, currentPlaceData } = useWeatherStore();
  return (
    <>
      <div className="w-4/5 p-6 mb-4 rounded-lg shadow-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 align-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Current Place:</h2>
        <p className="text-gray-200">{JSON.stringify(currentPlaceData)}</p>
        <h2 className="mt-4 text-2xl font-bold text-white">System Message:</h2>
        <p className="text-gray-200">{JSON.stringify(systemMessage)}</p>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-3">
          <div className="flex w-auto px-3 md:w-1/2">
            <div className="flex flex-col items-center gap-4 p-6 text-center bg-white rounded-lg shadow-md">
              <GeocodeComponent />
              <CurrentLocation />
            </div>
          </div>
        </div>
      </div>
      <DBSelection />
      <div className="mt-10">
        <DidItRain />
        <POPdata />
        <Notification />
      </div>
    </>
  );
}
