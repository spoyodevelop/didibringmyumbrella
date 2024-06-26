import React from "react";
import Image from "next/image";

import { useEffect } from "react";

import AccuracyArticle from "./AccuracyArticle";

const InfographicRain = ({ className }) => {
  // Your component logic here

  return (
    <section className={` ${className}`} id="인포그래피">
      <AccuracyArticle />
    </section>
  );
};

export default InfographicRain;
