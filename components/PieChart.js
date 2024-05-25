import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // 데이터를 원형 데이터로 변환
    const pieData = data.map((d) => ({
      label: d.label,
      value: d.value,
    }));

    // 스케일 설정
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // 원형 차트 생성
    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    // 데이터를 원형 차트에 추가
    const g = svg
      .selectAll(".arc")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d) => colorScale(d.label));

    g.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .text((d) => d.label);
  }, []);

  return <svg ref={ref} width="300" height="300"></svg>;
};

export default PieChart;
