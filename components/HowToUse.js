import React from "react";

import Steps from "./Steps";

const HowToUse = ({ className }) => {
  return (
    <section className={className}>
      <div className="w-full shadow-xl lg:w-3/4 bg-slate-200 rounded-xl">
        <section className="flex flex-col p-2 py-8 md:p-8">
          <Steps className="flex flex-col justify-around w-full gap-4 p-2" />
        </section>
      </div>
    </section>
  );
};
export default HowToUse;
