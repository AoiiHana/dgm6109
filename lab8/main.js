"use strict"

/* Configuration variables for svg; changed to 800 width + 600 height, margin kept the same for readability */
let svgWidth = 900;
let svgHeight = 675;
let sideMargin = 75;
let bottomMargin = 25;
let topMargin = 50;

/*there used to be variables named maxTime and minTime on here, but d3.min/max rendered them redundant so i got rid of them
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

/* Draws margin border (no change from example, commented out as requested) 
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", sideMargin)
    .attr("y", topMargin)
    .attr("width", svgWidth - (sideMargin * 2))
    .attr("height", (svgHeight - topMargin) - bottomMargin);

/*dataset is time spent online in hours compared to number of words written, both per day——now time spent on classwork is tracked as well, as the data point radius*/
let dataset = [{
    timeOnline: 13.1,
    wordsWritten: 87,
    timeOnClasswork: 3.33,
    timeOffline: 10.9
}, {
    timeOnline: 9.87,
    wordsWritten: 289,
    timeOnClasswork: 2.67,
    timeOffline: 14.13
}, {
    timeOnline: 13.18,
    wordsWritten: 0,
    timeOnClasswork: 2.37,
    timeOffline: 10.82
}, {
    timeOnline: 12.52,
    wordsWritten: 408,
    timeOnClasswork: 2,
    timeOffline: 11.48
}, {
    timeOnline: 15.4,
    wordsWritten: 10,
    timeOnClasswork: 1.85,
    timeOffline: 8.6
}, {
    timeOnline: 11.13,
    wordsWritten: 222,
    timeOnClasswork: 1.55,
    timeOffline: 12.87
}, {
    timeOnline: 11.45,
    wordsWritten: 0,
    timeOnClasswork: 1.5,
    timeOffline: 12.55
}, {
    timeOnline: 12.66,
    wordsWritten: 99,
    timeOnClasswork: 1.32,
    timeOffline: 11.33
}, {
    timeOnline: 11.55,
    wordsWritten: 0,
    timeOnClasswork:1.16,
    timeOffline: 12.45
}, {
    timeOnline: 11.33,
    wordsWritten: 300,
    timeOnClasswork: 1.09,
    timeOffline: 12.66
}, {
    timeOnline: 13.72,
    wordsWritten: 0,
    timeOnClasswork: 1.08,
    timeOffline: 10.28
}, {
    timeOnline: 11.45,
    wordsWritten: 0,
    timeOnClasswork: 1.02,
    timeOffline: 12.55
}, {
    timeOnline: 12.88,
    wordsWritten: 0,
    timeOnClasswork: 1,
    timeOffline: 11.12
}, {
    timeOnline: 12.42,
    wordsWritten: 0,
    timeOnClasswork:0.27,
    timeOffline: 11.58
}, {
    timeOnline: 6.23,
    wordsWritten: 0,
    timeOnClasswork: 0.27,
    timeOffline: 17.77
}, {
    timeOnline: 15.13,
    wordsWritten: 0,
    timeOnClasswork: 0.07,
    timeOffline: 8.87
}, {
    timeOnline: 12.08,
    wordsWritten: 0,
    timeOnClasswork: 0,
    timeOffline: 11.92
}, {
    timeOnline: 11.18,
    wordsWritten: 0,
    timeOnClasswork: 0,
    timeOffline: 12.82
}, {
    timeOnline: 3.55,
    wordsWritten: 0,
    timeOnClasswork: 0,
    timeOffline: 20.45
}, {
    timeOnline: 10.95,
    wordsWritten: 106,
    timeOnClasswork: 0,
    timeOffline: 13.05
}, {
    timeOnline: 8.2,
    wordsWritten: 0,
    timeOnClasswork: 0,
    timeOffline: 15.8
}, {
    timeOnline: 14.35,
    wordsWritten: 0,
    timeOnClasswork: 0,
    timeOffline: 9.65
}, {
    timeOnline: 11.38,
    wordsWritten: 0,
    timeOnClasswork: 0,
    timeOffline: 12.62
}, {
    timeOnline: 13.4,
    wordsWritten: 0,
    timeOnClasswork: 0,
    timeOffline: 10.6
}];

/*sorts the dataset so the circles draw properly upon one another*/
dataset.sort(function(a,b){
    if (a <= b){
        return 1;
    }
    return -1;
})

/*these two functions allowed for significant simplification of the code*/
let minTimeOnline = d3.min(dataset, function(value){
    return value.timeOnline;
});

let maxTimeOnline = d3.max(dataset, function(value){
    return value.timeOnline;
})

let xScale = d3.scaleLinear()
    .domain([0, 3.33])
    .range([sideMargin, svgWidth - sideMargin]);

let yScale = d3.scaleLinear()
    .domain([0, 550])
    .range([svgHeight - bottomMargin, topMargin]);

let xLine = svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(3.33))
    .attr("y2", yScale(0))
    .attr("stroke", "black")

let yLine = svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(0))
    .attr("y2", yScale(550))
    .attr("stroke", "black")

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
/*sets X value to reflect timeOnline parameter from array dataset, each param multiplied by 50 to fill the whole scale of the plot */
    .attr("cx", function (dataset) {
        return (sideMargin + (dataset.timeOnClasswork * 200));
    })
/*sets Y value to reflect wordsWritten parameter from array dataset
    to properly display the data points (since svg draws from the top of the page rather than the bottom) and properly align w/axes, wordsWritten params must be subtracted from the base axis value (in this case svgHeight - margin) */
    .attr("cy", function (dataset) {
        return ((svgHeight - bottomMargin) - dataset.wordsWritten);
    })
    .attr("opacity", 1) //since we now use colour to differentiate the circles based on time offline, opacity was no longer needed, i'm still going to need to figure out how to differentiate circles that overlap tho
    .attr("fill", function(dataset){
        if (dataset.timeOffline >= 12){
            return "green";
        }
        else {
            return "red";
        }
    })

/*switching to d3.min/max allowed me to simplify the code to use just one rScale variable for the entire program*/
let rScale = d3.scaleSqrt()
    .domain([minTimeOnline, maxTimeOnline])
    .range([minTimeOnline, maxTimeOnline]) 

circles.attr("r", function(dataset){
    return rScale(dataset.timeOnline);
})

/*these two variables are refs for the x + y coords of the key circles */
let keyXCoord = (sideMargin * 2);
let keyYCoord = (topMargin * 2);

//this are the actual params for the key circles, rValue sets the radius of each one
let keyData = [{
    xValue: keyXCoord,
    yValue: keyYCoord,
    rValue: maxTimeOnline
}, {
    xValue: keyXCoord,
    yValue: (keyYCoord - (bottomMargin * 2)),
    rValue: ((minTimeOnline + maxTimeOnline) / 2)
}, {
    xValue: keyXCoord,
    yValue: (keyYCoord - (bottomMargin * 3.5)),
    rValue: minTimeOnline
}];

/*there was an additional scaleLinear call here for determining the sizes of the key circles. it ended up being redundant w/d3.min/max so it's gone now*/

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
        return (bottomMargin * 2 + keyData.yValue);
    })
    .attr("r", function(keyData){
        return rScale(keyData.rValue);
    })

/* labels the axes (only change was to text labels) */
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (bottomMargin / 2))
    .attr("text-anchor", "middle")
    .text("Time spent on coursework (hrs/dy)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", sideMargin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Words written per day")
    .attr("transform", "rotate(-90)");

/* labels key graph coordinates (first one unchanged)
    second & third one are based on first, with labels anchored according to instructions
    x + y values for labels placed based on trial & error, this form seems to have allowed them to display in proper positions
    text in labels is based on the original, unmodified scale from array dataset, with some consideration given to how the margins change the potential max values displayed*/
let originLabel = svg.append("text")
    .attr("x", sideMargin)
    .attr("y", svgHeight - (bottomMargin / 2))
    .attr("text-anchor", "middle")
    .text("0,0");

let xScaleLabel = svg.append("text")
    .attr("x", svgWidth - sideMargin)
    .attr("y", svgHeight - (bottomMargin / 2))
    .attr("text-anchor", "middle")
    .text("3.33")

let yScaleLabel = svg.append("text")
    .attr("x", sideMargin)
    .attr("y", topMargin)
    .attr("text-anchor", "end")
    .text("550")

//labels the key of circles
let keyFullLabel = svg.append("text")
    .attr("x", sideMargin * 2)
    .attr("y", topMargin - 5)
    .attr("text-anchor", "start")
    .text("Time spent online (hrs)")

let keyCirclesLabel = [] //this variable is for labelling each circle in the key

for (let i = 0; i < 3; i++){ //adds params to keyLabel and draws them on the canvas using the equivalent indexes in keyData as refs
    keyCirclesLabel[i] = svg.append("text")
        .attr("x", ((sideMargin * 2 ) + 20))
        .attr("y", ((bottomMargin * 2) + keyData[i].yValue))
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .text(String(keyData[i].rValue) + " hrs")
}

/*initially i declared both of these objects separately with svg.append, but i later realized that the same array + svg.selectAll method i used for the size key would work more efficiently for the color key as well */
let colorKey = [ {
    xValue: xScale(2.85),
    yValue: ((bottomMargin * 2) + 10),
    rValue: ((minTimeOnline + maxTimeOnline) / 2),
    color: "green"
}, {
    xValue: xScale(2.85),
    yValue: ((bottomMargin * 3) + 10),
    rValue: ((minTimeOnline + maxTimeOnline) / 2),
    color: "red"
}]

let colorCircles = svg.selectAll("null")
    .data(colorKey)
    .join("circle")
    .attr("cx", function(colorKey){
        return colorKey.xValue;
    })
    .attr("cy", function(colorKey){
        return colorKey.yValue
    })
    .attr("r", function(colorKey){
        return rScale(colorKey.rValue)
    })
    .attr("fill", function(colorKey){
        return colorKey.color
    })

let colorKeyLabel = svg.append("text")
    .attr("x", xScale(2.85))
    .attr("y", topMargin - 5)
    .attr("text-anchor", "start")
    .text("Time spent offline")

/*i had to declare and append each label separately because the loop method didn't allow me to properly append the contents of each text label*/
let greenLabel = svg.append("text")
    .attr("x", colorKey[0].xValue + 15)
    .attr("y", colorKey[0].yValue)
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .text("12 hours or less")

let redLabel = svg.append("text")
    .attr("x", colorKey[1].xValue + 15)
    .attr("y", colorKey[1].yValue)
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .text("More than 12 hours")

/*these are both the boxes for the keys, each one constructed in the same way*/
let sizeLabelBox = svg.append("rect")
    .attr("x", ((sideMargin * 2)- 20))
    .attr("y", (topMargin - 20))
    .attr("width", 180)
    .attr("height", 150)
    .attr("stroke", "black")
    .attr("fill", "transparent") //method for making fully transparent SVG elements found via Google Gemini

let colorLabelBox = svg.append("rect")
    .attr("x", ((xScale(2.85))- 20))
    .attr("y", (topMargin - 20))
    .attr("width", 180)
    .attr("height", 70)
    .attr("stroke", "black")
    .attr("fill", "transparent")

/*this was exhausting, please help me*/