import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function ScatterPlot({data,onChange}) {
  const svgRef = useRef();

  useEffect(() => {

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d['Annual_Income'])])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d['Spending_Score_(1-100)'])])
      .range([height, 0]);

      svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('dx', '0.71em')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .text('Annual_Income');

    svg.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -height / 2)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .text('Spending_Score_(1-100)');


    // Color scale for different labels
    const colorScale = d3.scaleOrdinal()
      .domain(['0', '1', '2','3','4','5','6'])
      .range(['red', 'green', 'blue','yellow','black','orange','grey']);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d['Annual_Income']))
      .attr('cy', d => y(d['Spending_Score_(1-100)']))
      .attr('r', 5)
      .style('fill', d => colorScale(d.Cluster)).text("Test");
  }, []);

  return (
    <div className="justify-content-md-center">
        <svg ref={svgRef}></svg>
    </div>
  );
}

export default ScatterPlot;