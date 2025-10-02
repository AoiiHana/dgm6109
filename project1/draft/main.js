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

/*here are the starting variables as outlined in the assignment description*/
let duckX = 55
let duckY = 45

/* this draws the body of the duck*/
let duckBody = drawing.append("polyline")
    .attr("points", closedPolygon(duckX,duckY,
                                  duckX+20,duckY+80,
                                  duckX+57,duckY+137.5,
                                  duckX+197.5,duckY+137.5,
                                  duckX+177.5,duckY+85,
                                  duckX+177.5,duckY+68.5,
                                  duckX+195,duckY+67.5,
                                  duckX+195,duckY+5,
                                  duckX+160,duckY-25,
                                  duckX+145,duckY+5,
                                  duckX+125,duckY+55,
                                  duckX+55,duckY+55))
    .attr("fill","#ffffc6") 

/*now this one draws the bill*/
let duckBill = drawing.append("polyline")
    .attr("points", closedPolygon(duckX+195,duckY+5,
                                  duckX+195,duckY+69, //lol
                                  duckX+245,duckY+65))
    .attr("fill","#f0975b")

/*this draws the water under the duck*/
let duckPond = drawing.append("rect")
    .attr("x",duckX-30)
    .attr("y",duckY+137.5)
    .attr("width",250)
    .attr("height",17.5)
    .attr("fill","#55bcbe")

/*this is for the wings*/
let duckWing = drawing.append("polyline")
    .attr("points", closedPolygon(duckX+35,duckY+105,
                                  duckX+125,duckY+145,
                                  duckX+100,duckY+55))
    .attr("fill","#99764d")

/*now let's draw the eye, code courtesy of https://d3-graph-gallery.com/graph/shape.html*/
let duckEye = drawing.append("circle")
    .attr("cx",duckX+175)
    .attr("cy",duckY+22.5)
    .attr("r",5)
    .attr("fill", "black")

/*and last but not least these 3 variables are the 3 little hairs? feathers? whatever at the top of the duck's head*/

/*these two variables are for the starting point of each "hair"*/
let hairStartX = duckX + 160;
let hairStartY = duckY - 20;

/*hair 1*/
let duckHair1 = drawing.append("line")
    .attr("x1", hairStartX)
    .attr("y1", hairStartY)
    .attr("x2", hairStartX-15)
    .attr("y2", hairStartY-12.5)
    .attr("stroke", "black")
    .attr("stroke-width", "2")

/*hair 2*/
let duckHair2 = drawing.append("line")
    .attr("x1", hairStartX)
    .attr("y1", hairStartY)
    .attr("x2", hairStartX-11)
    .attr("y2", hairStartY-16)
    .attr("stroke", "black")
    .attr("stroke-width", "2")

/*hair 3*/
let duckHair3 = drawing.append("line")
    .attr("x1", hairStartX)
    .attr("y1", hairStartY)
    .attr("x2", hairStartX-8)
    .attr("y2", hairStartY-20)
    .attr("stroke", "black")
    .attr("stroke-width", "2")

/*i stayed up very late to get this done on time
  and counted each individual graph line to make sure everything was lined up
  i'm very tired
  please pay me overtime T_T*/