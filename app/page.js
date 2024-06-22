"use client";

import { useState, useRef, Suspense, lazy } from "react";
import { useWeatherStore } from "@/app/store/weather-store";
import ScrollIndicator from "@/components/ScrollIndicator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Notification from "@/components/ui/Notification";
import Loading from "@/components/Loading"; // Import the Loading component

// Lazy load components
const GeocodeComponent = lazy(() => import("@/components/GeocodeComponent"));
const CurrentLocation = lazy(() =>
  import("@/components/currentlocation/CurrentLocation")
);
const DidItRain = lazy(() => import("@/components/DiditRain/DidItRain"));
const POPExplanation = lazy(() => import("@/components/POPExplanation"));
const DBSelection = lazy(() =>
  import("@/components/dbselection/DBSelectionDetails")
);
const POPdata = lazy(() => import("@/components/POPData"));
const Accordion = lazy(() => import("@/components/Accordion"));
const QuestionIcon = lazy(() => import("@/components/icons/QuestionButton"));
const Question = lazy(() => import("@/components/Question"));
const HowToUse = lazy(() => import("@/components/HowToUse"));
const HowItMade = lazy(() => import("@/components/HowItMade"));
const WhyItMade = lazy(() => import("@/components/WhyItMade"));
const AllPOPStats = lazy(() => import("@/components/AllPOPStats"));
const SquallMeter = lazy(() => import("@/components/SquallMeter"));
const InfographicRain = lazy(() => import("@/components/InfographicRain"));
const InfographicWhy = lazy(() => import("@/components/InfographicWhy"));
const RainOutOfBlue = lazy(() => import("@/components/RainOutOfBlue"));

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const accordionRef = useRef(null);
  const { allOfPOPDataStats } = useWeatherStore();

  return (
    <>
      <ScrollIndicator />
      <Navbar />

      <div className="flex flex-col items-center w-full mb-48">
        <div className="flex flex-col items-center w-full" id="만든이유">
          <Suspense fallback={<Loading />}>
            <WhyItMade className="flex flex-col-reverse items-center justify-center w-11/12 gap-8 p-4 mt-0 mb-24 md:mb-64 md:mt-24 rounded-xl md:flex-row" />

            <HowItMade className="flex flex-col items-center justify-center w-11/12 p-4 mt-0 mb-24 md:mb-64 md:mt-24 lg:w-4/5 rounded-xl md:flex-col bg-slate-200" />
            <Question className="flex flex-col items-center justify-center w-11/12 gap-8 mt-0 mb-24 md:mb-64 md:mt-24 rounded-xl md:flex-row" />
            <HowToUse className="flex flex-col items-center justify-center w-11/12 gap-2 mt-0 mb-24 md:mb-64 md:mt-24 lg:w-4/5 rounded-xl md:flex-row" />
          </Suspense>
        </div>

        <div
          className="flex flex-col items-center justify-center w-full py-8 mt-24 shadow-xl lg:w-full rounded-xl"
          id="날씨보기"
        >
          <div className="flex flex-col justify-between w-11/12 gap-4 p-4 md:flex-row">
            <div className="flex flex-row items-center justify-center w-auto gap-4">
              <Suspense fallback={<Loading />}>
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
              </Suspense>
            </div>

            <Suspense fallback={<Loading />}>
              <DBSelection className="flex flex-col items-center justify-center gap-4 md:flex-row" />
            </Suspense>
          </div>

          <Suspense fallback={<Loading />}>
            <DidItRain
              className="flex flex-col items-center w-11/12 p-5 m-12 md:w-11/12 justify-evenly rounded-xl xl:flex-row md:justify-evenly lg:justify-evenly bg-slate-200"
              onClick={() => {
                setActiveAccordion("accordion-1");
                accordionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </Suspense>

          <div className="flex flex-col items-center justify-center w-11/12 gap-4 p-8 mb-4 shadow-md lg:flex-row bg-slate-200 rounded-xl">
            <Suspense fallback={<Loading />}>
              <POPExplanation
                className="flex flex-col items-center gap-4 mb-4 card"
                onClick={() => {
                  setActiveAccordion("accordion-3");
                  accordionRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </Suspense>

            <div className="flex items-center justify-center w-full shadow-xl md:w-full lg:w-3/5 h-96 rounded-xl">
              <Suspense fallback={<Loading />}>
                <POPdata />
              </Suspense>
            </div>
          </div>
        </div>

        <Suspense fallback={<Loading />}>
          <AllPOPStats className="flex flex-col items-center justify-center w-11/12 gap-4 p-4 mt-24 mb-10 shadow-md md:p-8 bg-slate-200 rounded-xl" />
          <SquallMeter className="flex flex-col items-center justify-center w-11/12 gap-4 p-4 mb-24 shadow-md md:p-8 bg-slate-200 rounded-xl" />
          <RainOutOfBlue
            data={allOfPOPDataStats}
            className="w-11/12 gap-4 p-8 mb-48 shadow-md md:p-8 bg-slate-200 rounded-xl "
          />
          <InfographicRain className="flex flex-col items-center justify-center w-11/12 gap-4 p-0 mb-12 shadow-md md:p-8 md:w-4/5 bg-none sm:bg-slate-200 rounded-xl" />
          <InfographicWhy className="flex flex-col items-center justify-center w-11/12 gap-4 p-0 mb-64 shadow-md md:p-8 md:w-4/5 bg-none sm:bg-slate-200 rounded-xl" />
        </Suspense>

        <div
          ref={accordionRef}
          className="w-11/12 p-4 shadow-md lg:w-3/5 bg-slate-200 rounded-xl"
          id="QnA"
        >
          <Suspense fallback={<Loading />}>
            <Accordion
              activeAccordion={activeAccordion}
              setActiveAccordion={setActiveAccordion}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
      <Notification />
    </>
  );
}
