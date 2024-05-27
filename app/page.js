"use client";
import GeocodeComponent from "@/components/GeocodeComponent";
import CurrentLocation from "@/components/currentlocation/CurrentLocation";
import DidItRain from "@/components/DiditRain/DidItRain";
import Notification from "@/components/ui/Notification";
import POPExplanation from "@/components/POPExplanation";
import DBSelection from "@/components/dbselection/DBSelectionDetails";
import POPdata from "@/components/POPData";
import Accordion from "@/components/Accordion";

import { useState, useRef } from "react";

import { useWeatherStore } from "@/app/store/weather-store";
import QuestionIcon from "@/components/icons/QuestionButton";
import Question from "@/components/Question";
import HowToUse from "@/components/HowToUse";

import HowItMade from "@/components/HowItMade";
import WhyItMade from "@/components/WhyItMade";

import AllPOPStats from "@/components/AllPOPStats";
import SquallMeter from "@/components/SquallMeter";

import InfographicRain from "@/components/InfographicRain";
import InfographicWhy from "@/components/InfographicWhy";

import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { systemMessage, currentPlaceData, weatherData } = useWeatherStore();
  const accordionRef = useRef(null);

  return (
    <>
      <ScrollIndicator />

      <div className="content">
        {/* <div className="w-4/5 p-6 mb-4 rounded-lg shadow-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 align-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Current Place:</h2>
        <p className="text-gray-200">{JSON.stringify(currentPlaceData)}</p>
        <h2 className="mt-4 text-2xl font-bold text-white">System Message:</h2>
        <p className="text-gray-200">{JSON.stringify(systemMessage)}</p>
        <h2 className="mt-4 text-2xl font-bold text-white">Weather Data:</h2>
        <p className="text-gray-200">{JSON.stringify(weatherData)}</p>
      </div> */}

        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="text-xl btn btn-ghost">아맞다 우산</a>
          </div>
          {/* <ScrollIndicatorHori /> */}
        </div>

        <div className="flex flex-col items-center w-full mb-48">
          <WhyItMade className="flex flex-col-reverse items-center justify-center gap-8 p-4 mb-6 rounded-xl md:flex-row" />
          <Question className="flex flex-col items-center justify-center w-11/12 gap-8 mb-8 rounded-xl md:flex-row" />
          <HowItMade className="flex flex-col items-center justify-center w-11/12 p-4 mb-12 lg:w-4/5 rounded-xl md:flex-col bg-slate-200" />

          <HowToUse className="flex flex-col items-center justify-center w-11/12 gap-2 lg:w-4/5 rounded-xl md:flex-row" />
          <div className="flex flex-col items-center justify-center w-full py-8 mt-12 shadow-xl lg:w-full rounded-xl">
            <div className="flex flex-col justify-between w-11/12 gap-4 p-4 md:flex-row">
              <div
                className="flex flex-row items-center justify-center w-auto gap-4"
                id="made"
              >
                <GeocodeComponent />
                <CurrentLocation />
                <QuestionIcon
                  onClick={() => {
                    setActiveAccordion("accordion-2");
                    accordionRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  buttonSize="xs"
                />
              </div>

              <DBSelection className="flex flex-col items-center justify-center gap-4 md:flex-row" />
            </div>
            <DidItRain
              className="flex flex-col items-center w-11/12 p-5 m-12 md:w-11/12 justify-evenly rounded-xl xl:flex-row md:justify-evenly lg:justify-evenly bg-slate-200"
              onClick={() => {
                setActiveAccordion("accordion-1");
                accordionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <div className="flex flex-col items-center justify-center w-11/12 gap-4 p-8 mb-4 shadow-md lg:flex-row bg-slate-200 rounded-xl">
              <POPExplanation
                className="flex flex-col items-center gap-4 mb-4 card"
                onClick={() => {
                  setActiveAccordion("accordion-3");
                  accordionRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              />

              <div className="flex items-center justify-center w-full shadow-xl md:w-full lg:w-3/5 h-96 rounded-xl">
                <POPdata />
              </div>
            </div>
          </div>
          <AllPOPStats className="flex flex-col items-center justify-center w-11/12 gap-4 p-4 mb-10 shadow-md md:p-8 bg-slate-200 rounded-xl" />
          <SquallMeter className="flex flex-col items-center justify-center w-11/12 gap-4 p-8 mb-20 shadow-md md:p-8 bg-slate-200 rounded-xl" />
          <InfographicRain className="flex flex-col items-center justify-center w-11/12 gap-4 p-0 mb-12 shadow-md md:p-8 md:w-4/5 bg-none sm:bg-slate-200 rounded-xl" />
          <InfographicWhy className="flex flex-col items-center justify-center w-11/12 gap-4 p-0 mb-48 shadow-md md:p-8 md:w-4/5 bg-none sm:bg-slate-200 rounded-xl" />
          <div
            ref={accordionRef}
            className="w-11/12 h-auto p-4 mb-48 shadow-md lg:w-3/5 bg-slate-200 rounded-xl"
            id="accordion"
          >
            <Accordion
              activeAccordion={activeAccordion}
              setActiveAccordion={setActiveAccordion}
            />
          </div>
        </div>
      </div>

      <Notification />
    </>
  );
}
