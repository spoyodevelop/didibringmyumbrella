import React from "react";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "슈퍼컴퓨터",
    label: "슈퍼컴퓨터",
    value: 40,
    color: "hsl(30, 70%, 50%)",
  },
  {
    id: "관측 자료",
    label: "관측 자료",
    value: 32,
    color: "hsl(56, 70%, 50%)",
  },
  { id: "예보관", label: "예보관", value: 28, color: "hsl(103, 70%, 50%)" },
];

const MyPieChart = () => (
  <ResponsivePie
    data={data}
    margin={{ top: 20, bottom: 20 }}
    innerRadius={0.7}
    outerRadius={0.9}
    padAngle={0.7}
    cornerRadius={5}
    colors={{ scheme: "nivo" }}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
    motionStiffness={90}
    motionDamping={15}
  />
);

export default MyPieChart;
