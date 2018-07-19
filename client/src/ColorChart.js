import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import { easeCubicInOut } from "d3-ease";

import animator from "./util/animator";

const svgWidth = 960,
  svgHeight = 500;

const margin = { top: 20, right: 20, bottom: 30, left: 40 },
  width = svgWidth - margin.left - margin.right,
  height = svgHeight - margin.top - margin.bottom;

const x = scaleBand()
    .rangeRound([0, width])
    .padding(0.1),
  y = scaleLinear().rangeRound([height, 0]);

const makeAnimatedChart = originalData => {
  x.domain(originalData.map(d => +d.id));
  y.domain([0, max(originalData, d => +d.id)]);

  const Bar = ({ data }) => (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g
          className="axis axis--x"
          transform={`translate(0, ${height})`}
          ref={node => select(node).call(axisBottom(x))}
        />
        <g className="axis axis--y">
          <g ref={node => select(node).call(axisLeft(y).ticks(10, "%"))} />
          <text transform="rotate(-90)" y="6" dy="0.71em" textAnchor="end">
            colorssss
          </text>
        </g>
        {data.map(d => (
          <rect
            key={+d.id}
            className="bar"
            x={x(d.hex)}
            y={y(+d.id)}
            width={x.bandwidth()}
            height={height - y(+d.id)}
          />
        ))}
      </g>
    </svg>
  );

  const easeData = (data, t) => {
    return data.map(x => ({
      name: x.name,
      frequency: +x.id * easeCubicInOut(t)
    }));
  };

  const animatedChart = animator(Bar, {
    easeData,
    duration: 500,
    delay: 500,
    interval: 10,
    data: originalData
  });
  console.log("what am I returning", animatedChart);
  return animatedChart;
};
export default makeAnimatedChart;
