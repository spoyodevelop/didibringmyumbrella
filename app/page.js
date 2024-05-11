"use client";
import GeocodeComponent from "@/components/GeocodeComponent";
import CurrentLocation from "@/components/currentlocation/CurrentLocation";
import DidItRain from "@/components/DiditRain/DidItRain";
import { useWeatherStore } from "@/app/store/weather-store";
import Notification from "@/components/ui/Notification";

import DBSelection from "@/components/dbselection/DBSelectionDetails";
import POPdata from "@/components/POPData";
import Accordion from "@/components/Accordion";
import Header from "@/components/Header";
import { useState } from "react";
import { useRef } from "react";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { systemMessage, currentPlaceData, weatherData } = useWeatherStore();
  const accordionRef = useRef(null);
  return (
    <>
      <Header />
      {/* <div className="w-4/5 p-6 mb-4 rounded-lg shadow-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 align-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Current Place:</h2>
        <p className="text-gray-200">{JSON.stringify(currentPlaceData)}</p>
        <h2 className="mt-4 text-2xl font-bold text-white">System Message:</h2>
        <p className="text-gray-200">{JSON.stringify(systemMessage)}</p>
        <h2 className="mt-4 text-2xl font-bold text-white">Weather Data:</h2>
        <p className="text-gray-200">{JSON.stringify(weatherData)}</p>
      </div> */}
      <p>
        <button
          href="#accordion"
          onClick={() => {
            setActiveAccordion("accordion-2");
            accordionRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {" "}
          to go to the second accordion{" "}
        </button>
      </p>
      <div className="flex flex-col items-center w-full mb-48">
        <div className="flex flex-col justify-between w-11/12 md:flex-row">
          <div className="flex items-center justify-center gap-4 mb-4">
            <GeocodeComponent />
            <CurrentLocation />
          </div>
          <DBSelection className="flex flex-col items-center justify-center gap-4 mb-4 md:flex-row" />
        </div>

        <DidItRain className="flex flex-col items-center w-11/12 gap-6 p-5 m-12 md:w-11/12 justify-evenly rounded-xl lg:flex-row md:flex-col md:justify-evenly lg:justify-evenly bg-slate-200" />
        <div className="w-11/12 h-64 shadow-md bg-slate-100 rounded-xl">
          <POPdata />
        </div>
      </div>
      <div
        ref={accordionRef}
        className="w-3/5 mb-48 shadow-md h-96 bg-slate-100 rounded-xl"
        id="accordion"
      >
        <Accordion
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
        />
      </div>

      <Notification />
    </>
  );
}
