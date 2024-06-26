import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const MyBarChart = ({ data, layout = "vertical" }) => (
  <ResponsiveBar
    layout={layout}
    data={data}
    keys={["실강수"]}
    indexBy="id"
    margin={{ top: 50, right: 80, bottom: 50, left: 60 }}
    padding={0.35}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "paired" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "POP30",
        },
        id: "dots",
      },
      {
        match: {
          id: "POP60",
        },
        id: "dots",
      },
      {
        match: {
          id: "POP70",
        },
        id: "dots",
      },
      {
        match: {
          id: "POP80",
        },
        id: "dots",
      },
    ]}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "강수확률(%)",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "실강수확률(%)",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 80,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 60,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 10,
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
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
);

export default MyBarChart;
