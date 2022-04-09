import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function VerticalBarChart({ width, height, data, padding, barWidth, className }){
    const xPadding = padding?.x ?? width / 20
    const yPadding = padding?.y ?? height / 20
    const _barWidth = barWidth ?? ( width * 0.8 - 2 * xPadding ) / data.length
    const maxBarWidth = (width - xPadding*2) / data.length;

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current).append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, []);

  
    const draw = () => {
        var Tooltip = d3.select(ref.current)
        .append("div")
        .style("opacity", 0)
        .style("position", "absolute")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("color", "black")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
    
        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(_, d) {
            Tooltip
            .style("opacity", 1)
            d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }
        var mousemove = function(event, d) {
            Tooltip
            .html("This cell is: " + d.y)
            .style("left", (d3.pointer(event, this)[0] + 20) + "px")
            .style("top", (d3.pointer(event, this)[1]) + "px")
        }
        var mouseleave = function(_, d) {
            Tooltip
            .style("opacity", 0)
            d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
        }

        const svg = d3.select(ref.current).select("svg");
        var selection = svg.selectAll("rect").data(data);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d.y))])
            .range([0, height - 2 * yPadding]);

        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d) + yPadding)

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => maxBarWidth/2 * (2*i + 1) - _barWidth/2 + xPadding)
            .attr("y", (d) => height - yPadding)
            .attr("width", _barWidth)
            .attr("height", (d) => 0)
            .attr("fill", "orange")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .transition().duration(300)
                .attr("height", (d) => yScale(d.y))
                .attr("y", (d) => height - yScale(d.y) - yPadding)
        
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()
    }

    return (
        <div className={className}>
            <div ref={ref}>
            </div>
        </div>
        
    )

}

export default VerticalBarChart;

