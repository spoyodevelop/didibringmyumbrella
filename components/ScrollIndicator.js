import React, { useEffect, useState } from "react";
import SectionIndicator from "./SectionIndicator";
const sections = ["만든이유", "날씨보기", "어느때우산", "인포그래피", "QnA"];
const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollPercentage(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const numberOfLines = 20;
  const groupSize = 3; // Only 3 lines grow at a time
  const activeStart = Math.floor(
    (scrollPercentage / 100) * (numberOfLines - groupSize)
  );

  return (
    <div className="fixed inset-y-0 top-0 items-center justify-center hidden my-auto transition duration-500 transform shadow-xl left-2 h-96 xl:left-4 bg-stone-200 rounded-xl opacity-80 hover:opacity-100 xl:flex">
      <div className="flex flex-col items-center justify-center w-12 gap-4 lg:left-4">
        <SectionIndicator sectionIds={sections} />
        <div className="flex flex-col items-center">
          {Array.from({ length: numberOfLines }).map((_, idx) => {
            let scaleFactor = 1;
            let opacity = 0.3;
            let lineLength = "w-4"; // Default shorter line

            if (scrollPercentage === 0 && (idx === 0 || idx === 1)) {
              // At the very beginning, highlight the first two lines
              scaleFactor = 1.4;
              opacity = 1;
              lineLength = idx === 0 ? "w-6" : "w-4"; // Long line for the first line, short line for the second
            } else if (
              scrollPercentage === 100 &&
              (idx === numberOfLines - 1 || idx === numberOfLines - 2)
            ) {
              // At the very end, highlight the last two lines
              scaleFactor = 1.4;
              opacity = 1;
              lineLength = idx === numberOfLines - 1 ? "w-6" : "w-4"; // Long line for the last line, short line for the second to last
            } else if (idx >= activeStart && idx < activeStart + groupSize) {
              // Middle of the scroll, handle active lines
              scaleFactor = 1.4;
              opacity = 1;
              if ((idx - activeStart) % groupSize === 1) {
                lineLength = "w-6"; // Long line for the middle active line
              }
            }

            return (
              <div
                key={idx}
                style={{
                  transform: `scaleX(${scaleFactor})`,
                  opacity: opacity,
                  transition: "transform 0.3s, opacity 0.3s",
                }}
                className={`h-1 ${lineLength} mb-1 bg-gray-400`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
