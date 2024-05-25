import React from "react";
import Image from "next/image";

import { useEffect } from "react";

import WhyArticle from "./WhyArticle";

const Infographic = ({ className }) => {
  // Your component logic here

  return (
    <section className={` ${className}`}>
      <WhyArticle />
    </section>
  );
};

export default Infographic;
