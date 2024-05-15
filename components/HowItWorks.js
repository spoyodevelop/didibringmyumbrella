import React from "react";
import Image from "next/image";
import ConfusedSVG from "./icons/Confused";
import FrownFace from "./icons/FrownFace";
import SmilingFace from "./icons/SmilingFace";
import Steps from "./Steps";

const HowItWorks = ({ className }) => {
  return (
    <section className={className}>
      <div className="w-full shadow-xl lg:w-3/4 bg-slate-200 rounded-xl">
        <section className="flex flex-col p-8">
          <h1 className="text-xl lg:text-2xl">
            실제 강수확률과 비교해보세요. 사용방법은 간단합니다.
          </h1>
          <Steps className={className} />
        </section>
      </div>
    </section>
  );
};
export default HowItWorks;
