"use strict"

/* Configuration variables for svg; changed to 800 width + 600 height, margin kept the same for readability */
let svgWidth = 800;
let svgHeight = 600;
let margin = 25;

let maxTime = 15.5; //this is the maximum number of hours measured in this plot
/*there used to be a variable named minTime right on this line
    but it turned out to be redundant and the solution i was looking for was more easily achieved by other means
    see rScale.range for a longer explanation*/

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

/*Dataset is time spent online in hours compared to number of words written, both per day——now time spent on classwork is tracked as well, as the data point radius*/
let dataset = [{
    timeOnline: 13.1,
    wordsWritten: 87,
    timeOnClasswork: 3.33
}, {
    timeOnline: 9.87,
    wordsWritten: 289,
    timeOnClasswork: 2.67
}, {
    timeOnline: 13.18,
    wordsWritten: 0,
    timeOnClasswork: 2.37
}, {
    timeOnline: 12.52,
    wordsWritten: 408,
    timeOnClasswork: 2
}, {
    timeOnline: 15.4,
    wordsWritten: 10,
    timeOnClasswork: 1.85
}, {
    timeOnline: 11.13,
    wordsWritten: 222,
    timeOnClasswork: 1.55
}, {
    timeOnline: 11.45,
    wordsWritten: 0,
    timeOnClasswork: 1.5
}, {
    timeOnline: 12.66,
    wordsWritten: 99,
    timeOnClasswork: 1.32
}, {
    timeOnline: 11.55,
    wordsWritten: 0,
    timeOnClasswork:1.16
}, {
    timeOnline: 11.33,
    wordsWritten: 300,
    timeOnClasswork: 1.09
}, {
    timeOnline: 13.71,
    wordsWritten: 0,
    timeOnClasswork: 1.08
}, {
    timeOnline: 11.45,
    wordsWritten: 0,
    timeOnClasswork: 1.02
}, {
    timeOnline: 12.88,
    wordsWritten: 0,
    timeOnClasswork: 1
}, {
    timeOnline: 12.42,
    wordsWritten: 0,
    timeOnClasswork:0.27
}, {
    timeOnline: 6.23,
    wordsWritten: 0,
    timeOnClasswork: 0.27
}, {
    timeOnline: 15.13,
    wordsWritten: 0,
    timeOnClasswork: 0.07
}, {
    timeOnline: 12.08,
    wordsWritten: 0,
    timeOnClasswork: 0
}, {
    timeOnline: 11.18,
    wordsWritten: 0,
    timeOnClasswork: 0
}, {
    timeOnline: 3.55,
    wordsWritten: 0,
    timeOnClasswork: 0
}, {
    timeOnline: 10.95,
    wordsWritten: 106,
    timeOnClasswork: 0
}, {
    timeOnline: 8.2,
    wordsWritten: 0,
    timeOnClasswork: 0
}, {
    timeOnline: 14.35,
    wordsWritten: 0,
    timeOnClasswork: 0
}, {
    timeOnline: 11.38,
    wordsWritten: 0,
    timeOnClasswork: 0
}, {
    timeOnline: 13.4,
    wordsWritten: 0,
    timeOnClasswork: 0
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
/*makes the points of data more visible since several of them closely overlap*/
    .attr("opacity", 0.41)

let rScale = d3.scaleLinear()
    .domain([0, maxTime])
    .range([5, 100]) //while i was debugging keyCircles i found out that setting a min range above 0 would make my circles more visible on my scatterplot, so i tried it and, lo and behold, i didn't need a minTime variable anymore

circles.attr("r", function(dataset){
    return rScale(dataset.timeOnClasswork);
})

/*these two variables are refs for the x + y coords of the key circles */
let keyXCoord = margin * 3;
let keyYCoord = (svgHeight - (margin * 5));

//this are the actual params for the key circles, rValue sets the radius of each one
let keyData = [{
    xValue: keyXCoord,
    yValue: keyYCoord,
    rValue: 3.33
}, {
    xValue: keyXCoord,
    yValue: (keyYCoord - (margin * 2)),
    rValue: 1.67
}, {
    xValue: keyXCoord,
    yValue: (keyYCoord - (margin * 3.5)),
    rValue: 0
}];

let rKeyScale = d3.scaleLinear()
    .domain([0,maxTime])
    .range([5,100])

/*so when i tried to declare this with svg.append("circle"), it just didn't work
    after running it through claude, i found out that svg.append only appends the one data point
    however, i had tried selectAll earlier and it pretty much meant only one circle set or the other would draw
    apparently if i wrote svg.selectAll("circle") this would cause conflict between the two sets of circle variables
    claude's first suggestion was to write selectAll(".key-circle"), which didn't work when i first tried it
    it hadn't mentioned this at first, but that was because there was no class created under that name
    however its other suggestion selectAll("null") did work, and as it explained to me that was a "cleaner" solution b/c it didn't require declaring a nonce class + explicitly signalled this was supposed to be an empty selection*/
let keyCircles = svg.selectAll("null") 
    .data(keyData)
    .join("circle");

keyCircles.attr("cx", function(keyData){
        return (keyData.xValue);
    })
    .attr("cy", function(keyData){
        return ((svgHeight - (margin * 2)) - keyData.yValue);
    })
    .attr("r", function(keyData){
        return rKeyScale(keyData.rValue);
    })

/* labels the axes (only change was to text labels) */
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

//labels the key of circles
let keyFullLabel = svg.append("text")
    .attr("x", margin * 2)
    .attr("y", ((margin * 2) - 5))
    .attr("text-anchor", "center")
    .text("Time spent on coursework")

let keyCirclesLabel = [] //this variable is for labelling each circle in the key

for (let i = 0; i < 3; i++){ //adds params to keyLabel and draws them on the canvas using the equivalent indexes in keyData as refs
    keyCirclesLabel[i] = svg.append("text")
        .attr("x", (keyData[i].xValue + margin + 10))
        .attr("y", ((svgHeight - (margin * 2)) - keyData[i].yValue))
        .attr("text-anchor", "start")
        .text(String(keyData[i].rValue) + " hrs")
}
