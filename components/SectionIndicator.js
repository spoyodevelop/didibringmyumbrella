import React, { useState, useEffect } from "react";

const SectionIndicator = ({ sectionIds }) => {
  const [currentSection, setCurrentSection] = useState("인트로");

  useEffect(() => {
    const checkSection = () => {
      const scrollPos = window.pageYOffset;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      // 스크롤이 최하단보다 200px 위에 도달했는지 확인
      const isNearBottom = docHeight - scrollPos <= 1200;

      let activeSection = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (
          section &&
          (activeSection === "" || section.offsetTop <= scrollPos)
        ) {
          activeSection = id;
        }
      });

      // 스크롤이 최하단보다 200px 위에 도달했다면 "QnA"로 설정
      if (isNearBottom) {
        setCurrentSection("QnA");
      } else {
        setCurrentSection(activeSection || "");
      }
    };

    window.addEventListener("scroll", checkSection);
    return () => window.removeEventListener("scroll", checkSection);
  }, [sectionIds]);

  return <p className="[writing-mode:vertical-rl]">{currentSection}</p>;
};

export default SectionIndicator;
