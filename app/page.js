"use client";
import GeocodeComponent from "@/components/GeocodeComponent";
import CurrentLocation from "@/components/CurrentLocation";
import DidItRain from "@/components/DidItRain";
import { useWeatherStore } from "@/app/store/weather-store";

import DBSelection from "@/components/dbselection/DBSelectionDetails";
import POPdata from "@/components/POPData";

export default function Home() {
  return (
    <>
      <GeocodeComponent />
      <CurrentLocation />

      <DidItRain />

      <DBSelection />
      <POPdata />
    </>
  );
}
