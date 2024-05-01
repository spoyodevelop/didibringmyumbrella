"use client";
import GeocodeComponent from "@/components/GeocodeComponent";
import CurrentLocation from "@/components/CurrentLocation";
import DidItRain from "@/components/DidItRain";
import { useWeatherStore } from "@/app/store/weather-store";

import DBSelection from "@/components/dbselection/DBSelectionDetails";
import POPdata from "@/components/POPData";

export default function Home() {
  const { placeData } = useWeatherStore();
  return (
    <>
      <GeocodeComponent />
      <CurrentLocation />
      {placeData && JSON.stringify(placeData)}
      <DidItRain />

      <DBSelection />
      <POPdata />
    </>
  );
}
