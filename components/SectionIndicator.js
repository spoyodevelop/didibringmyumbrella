import { divider } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

const SectionIndicator = ({ sectionIds }) => {
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const checkSection = () => {
      const scrollPos = window.pageYOffset;
      let activeSection = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section.offsetTop <= scrollPos) {
          activeSection = id;
        }
      });

      setCurrentSection(activeSection || "");
    };

    window.addEventListener("scroll", checkSection);
    return () => window.removeEventListener("scroll", checkSection);
  }, [sectionIds]);

  return <p class="[writing-mode:vertical-rl]">{currentSection}</p>;
};

export default SectionIndicator;
