import React from "react";

import Steps from "./Steps";

const HowItWorks = ({ className }) => {
  return (
    <section className={className}>
      <div className="w-full shadow-xl lg:w-3/4 bg-slate-200 rounded-xl">
        <section className="flex flex-col p-2 py-8 md:p-8">
          <h1 className="text-xl text-center text-black text-bold lg:text-2xl md:text-start">
            사용방법은 간단합니다.
          </h1>
          <Steps className={className} />
        </section>
      </div>
    </section>
  );
};
export default HowItWorks;
