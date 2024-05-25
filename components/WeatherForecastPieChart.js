import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";

const WeatherForecastPieChart = ({ data }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dynamicMargins = {
    top: windowSize.height > 600 ? 40 : 10,
    right: windowSize.width > 800 ? 20 : 20,
    bottom: windowSize.width > 800 ? 80 : 60,
    left: windowSize.width > 800 ? 40 : 10,
  };

  return (
    <ResponsivePie
      arcLinkLabelsOffset={-5}
      data={data}
      innerRadius={0.7}
      padAngle={0.7}
      cornerRadius={12}
      activeOuterRadius={0.85}
      activeInnerRadius={0.75}
      startAngle={200}
      endAngle={90}
      theme={{
        annotations: {
          text: {
            fontSize: 20, // Adjusted font size for better visibility
          },
        },
        legends: {
          text: {
            fontSize: 14, // Adjusted legend text font size for better visibility
          },
        },
      }}
      margin={dynamicMargins}
      borderWidth={0.7}
      borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      enableSlicesLabels={true}
      slicesLabelsSkipAngle={10}
      labelTextColor={{ from: "color", modifiers: [["darker", 0.1]] }}
      label="id"
      labelPosition="insideStart"
      labelRotation={0}
      labelColor={{ from: "color", modifiers: [["darker", 0.1]] }}
      labelFontSize={12}
      labelFontWeight={"normal"}
      labelLine={{
        opacity: 0.3,
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 10,
          translateY: 56,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default WeatherForecastPieChart;
