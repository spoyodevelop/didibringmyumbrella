import React from "react";

import HowItWorks from "./HowItWorks";
import HowItWorksDetail from "./HowItWorksDetail";

const HowItMade = ({ className, ID }) => {
  // Your component logic goes here

  return (
    // Your component JSX goes here
    <section className={className} id={ID}>
      <HowItWorks className="flex flex-col p-4" />
      <HowItWorksDetail className="flex flex-col items-center justify-center p-0 md:p-8 align-item bg-slate-200" />
    </section>
  );
};

export default HowItMade;
