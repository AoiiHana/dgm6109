"use strict"

/* Configuration variables for svg; changed to 800 width + 600 height, margin kept the same for readability */
let svgWidth = 800;
let svgHeight = 600;
let margin = 25;

/* Resizes div to match width of visualizatio (no change from example) */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Creates drawing canvas (no change from example_*/
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draws canvas border (no change from example) */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draws margin border (no change from example) */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/*Dataset is strictly time spent online in hours compared to number of words written, both per day */
let dataset = [{
    timeOnline: 13.71,
    wordsWritten: 0
}, {
    timeOnline: 12.08,
    wordsWritten: 0
},{
    timeOnline: 11.18,
    wordsWritten: 0
},{
    timeOnline: 12.88,
    wordsWritten: 0
},{
    timeOnline: 11.55,
    wordsWritten: 0
},{
    timeOnline: 11.45,
    wordsWritten: 0
},{
    timeOnline: 13.18,
    wordsWritten: 0
},{
    timeOnline: 12.42,
    wordsWritten: 0,
},{
    timeOnline: 3.55,
    wordsWritten: 0,
},{
    timeOnline: 11.13,
    wordsWritten: 222,
},{
    timeOnline: 6.23,
    wordsWritten: 0,
},{
    timeOnline: 15.4,
    wordsWritten: 10,
},{
    timeOnline: 10.95,
    wordsWritten: 106,
},{
    timeOnline: 12.66,
    wordsWritten: 99,
},{
    timeOnline: 8.2,
    wordsWritten: 0,
}, {
    timeOnline: 14.35,
    wordsWritten: 0,
}, {
    timeOnline: 11.45,
    wordsWritten: 0,
},{
    timeOnline: 13.1,
    wordsWritten: 87,
},{
    timeOnline: 11.33,
    wordsWritten: 300,
},{
    timeOnline: 12.52,
    wordsWritten: 408
}];

let xScale = d3.scaleLinear()
    .domain([0, 0])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 0])
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
/*sets X value to reflect timeOnline parameter from array dataset, each param multiplied by 50 to fill the whole scale of the plot */
    .attr("cx", function (dataset) {
        return dataset.timeOnline * 50;
    })
/*sets Y value to reflect wordsWritten parameter from array dataset
    to properly display the data points (since svg draws from the top of the page rather than the bottom) and properly align w/axes, wordsWritten params must be subtracted from the base axis value (in this case svgHeight - margin) */
    .attr("cy", function (dataset) {
        return ((svgHeight - margin) - dataset.wordsWritten);
    })
/*makes the points of data more visible since several of them closely overlap at default size */
    .attr("opacity", 0.7)

/* labels the axes (only change was to text labels*/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Time spent browsing the internet (hrs/dy)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Words written per day")
    .attr("transform", "rotate(-90)");

/* labels key graph coordinates (first one unchanged)
    second & third one are based on first, with labels anchored according to instructions
    x + y values for labels placed based on trial & error, this form seems to have allowed them to display in proper positions
    text in labels is based on the original, unmodified scale from array dataset, with some consideration given to how the margins change the potential max values displayed*/
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("0,0");

let xScaleLabel = svg.append("text")
    .attr("x", svgWidth - margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("15.5")

let yScaleLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", margin)
    .attr("text-anchor", "end")
    .text("550")
