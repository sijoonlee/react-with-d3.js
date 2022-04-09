import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function VerticalBarChart({ width, height, data, padding, barWidth, className }){
    const title = "This is title";
    const subTitle = "This is sub-title";
    const paddingLeft = padding?.left ?? width / 40
    const paddingRight = padding?.right ?? width / 40
    const paddingTop = padding?.top ?? height / 40
    const paddingBottom = padding?.bottom ?? height / 40
    const _barWidth = barWidth ?? ( width * 0.8 - paddingLeft - paddingRight ) / data.length
    const maxBarWidth = (width - paddingLeft - paddingRight) / data.length;

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

    // https://stackoverflow.com/questions/29031659/calculate-width-of-text-before-drawing-the-text
    var BrowserText = (function () {
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');
        /**
         * Measures the rendered width of arbitrary text given the font size and font face
         * @param {string} text The text to measure
         * @param {number} fontSize The font size in pixels
         * @param {string} fontFace The font face ("Arial", "Helvetica", etc.)
         * @returns {number} The width of the text
         **/
        function getWidth(text, fontSize, fontFace) {
            context.font = fontSize + 'px ' + fontFace;
            return context.measureText(text).width;
        }
        return {
            getWidth: getWidth
        };
    })();

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
            .range([0, height - paddingTop - paddingBottom]);

        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height)

        const getColor = d3.scaleSequential()
            .domain([d3.min(data.map(d => d.y))*0.8,d3.max(data.map(d => d.y))*1.2])
            .interpolator(d3.interpolateMagma)
                // https://observablehq.com/@d3/working-with-color
                // d3.interpolateRgb("red", "blue"))
                // d3.interpolateCool
                // d3.interpolateWarm
                // d3.interpolateMagma
                // d3.interpolateInferno
                // d3.interpolateRainbow
                // d3.interpolateSpectral
                // d3.interpolatePRGn
                // d3.interpolateViridis
                // d3.interpolateCubehelixDefault

        // const getColor = d3.scaleLinear()
        //     .domain([0, 5, 10])
        //     .range(['red', '#ddd', 'blue']);

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => maxBarWidth/2 * (2*i + 1) - _barWidth/2 + paddingLeft)
            .attr("y", (d) => height - paddingTop)
            .attr("width", _barWidth)
            .attr("height", (d) => 0)
            .attr("fill", (d) => getColor(d.y))//"orange")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .transition().duration(300)
                .attr("height", (d) => yScale(d.y))
                .attr("y", (d) => height - yScale(d.y) - paddingTop)

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("width", _barWidth/2)
            .attr("x", (d, i) => maxBarWidth/2 * (2*i + 1) + paddingLeft - BrowserText.getWidth(JSON.stringify(d), 16, 'Ubuntu')/2)
            .attr("y", (d, i) => height - yScale(d.y) - paddingTop)
            .text((d, i) => JSON.stringify(d))
        
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()
    }

    const style = {
        position: 'relative',
        width,
        height
    }
    return (
        <div style={style} className={className}>
            <div ref={ref}>
            </div>
        </div>
    )

}

export default VerticalBarChart;

