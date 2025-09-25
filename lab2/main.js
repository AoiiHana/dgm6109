"use strict"

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);


let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");
/*all non-black colours in this assignment were found using Photoshop eye dropper tool */

/* this draws the body of the duck*/
let duckBody = drawing.append("polyline")
    .attr("points", closedPolygon(55,45,
                                  75,125,
                                  112,182.5,
                                  252.5,182.5,
                                  232.5,130,
                                  232.5,113.5,
                                  250,112.5,
                                  250,60,
                                  215,25,
                                  200,50,
                                  180,100,
                                  110,100))
    .attr("fill","#ffffc6") 

/*now this one draws the bill*/
let duckBill = drawing.append("polyline")
    .attr("points", closedPolygon(250,60,
                                  250,114,
                                  300,110))
    .attr("fill","#f0975b")

/*this draws the water under the duck*/
let duckPond = drawing.append("rect")
    .attr("x",25)
    .attr("y",182.5)
    .attr("width",250)
    .attr("height",17.5)
    .attr("fill","#55bcbe")

/*this is for the wings*/
let duckWing = drawing.append("polyline")
    .attr("points", closedPolygon(90,150,
                                  180,190,
                                  155,100))
    .attr("fill","#99764d")

/*now let's draw the eye, code courtesy of https://d3-graph-gallery.com/graph/shape.html*/
let duckEye = drawing.append("circle")
    .attr("cx",230)
    .attr("cy",67.5)
    .attr("r",5)
    .attr("fill", "black")

/*and last but not least these 3 variables are the 3 little hairs? feathers? whatever at the top of the duck's head*/

/*these two variables are for the starting point of each "hair"*/
let hairStartX = 215
let hairStartY = 25

/*hair 1*/
let duckHair1 = drawing.append("line")
    .attr("x1", hairStartX)
    .attr("y1", hairStartY)
    .attr("x2", 200)
    .attr("y2", 12.5)
    .attr("stroke", "black")
    .attr("stroke-width", "2")

/*hair 2*/
let duckHair2 = drawing.append("line")
    .attr("x1", hairStartX)
    .attr("y1", hairStartY)
    .attr("x2", 204)
    .attr("y2", 9)
    .attr("stroke", "black")
    .attr("stroke-width", "2")

/*hair 3*/
let duckHair3 = drawing.append("line")
    .attr("x1", hairStartX)
    .attr("y1", hairStartY)
    .attr("x2", 207)
    .attr("y2", 5)
    .attr("stroke", "black")
    .attr("stroke-width", "2")

/*i stayed up very late to get this done on time
  and counted each individual graph line to make sure everything was lined up
  i'm very tired
  please appreciate my efforts T_T*/