import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart({ width, height }){
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, []);

    const draw = () => {
        const data = [{ x:10, y:10}, {x:20, y:1}, {x:30, y:2}]
        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").data([{ x:10, y:10}, {x:20, y:1}, {x:30, y:2}]);

        var xScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d.x))])
            .range([0, width-100]);

        const xPadding = 25;
        const barWidth = 40;
        const maxBarWidth = (width - xPadding*2) / data.length;

        var yScale = d3.scaleLinear()
                            .domain([0, d3.max(data.map(d => d.y))])
                            .range([0, height-100]);

        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => maxBarWidth/2 * (2*i + 1) - barWidth/2 + xPadding)
            .attr("y", (d) => height)
            .attr("width", barWidth)
            .attr("height", (d) => 0)
            .attr("fill", "orange")
            .transition().duration(300)
                .attr("height", (d) => yScale(d.y))
                .attr("y", (d) => height - yScale(d.y))
        
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;
