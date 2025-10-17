"use strict"

/* ************ function duck(canvas, xInput, yInput, orIsVisible, choice) *****
JM Velez Drawing #8: Duck
this draws a duck in svg as outlined in project 1 and the lab 5 description

REQUIREMENTS:
d3.js v3 or higher

PARAMETERS:
canvas:     an SVG group or canvas wrapped by d3 (default: 500x500)
xInput:     Number, starting horizontal position for drawing based on user input
yInput:     Number, starting vertical position for drawing based on user input
orIsVisible: this determines whether or not the origin point will be visible (default is false)
choice:     determines whether a duck, goose or swan will be drawn based on user input in the select menu (default: duck)

RETURNS:
canvas:     drawing as placed upon initial canvas defined in function call
****************************************************************** */

function duck(canvas = d3.select.append("svg").attr("width", 500).attr("height", 500), xInput, yInput, orIsVisible = false, choice = "duck") {

    let duckX = xInput;
    let duckY = yInput;

    if (orIsVisible == true){
        let originPoint = canvas.append("circle")
            .attr("cx", duckX)
            .attr("cy", duckY)
            .attr("r", 3)
            .attr("fill", "#ff1493")
    }

    /*compared to the base "duck" drawing, this significantly changes the shape of the eye, beak, body and wings as well as the overall colour scheme.*/
    if (choice == "swan"){
        //all instances of "duckBody" draw the body of the selected waterfowl
        let duckBody = canvas.append("polyline")
            .attr("points", closedPolygon(duckX,duckY,
                                  duckX+20,duckY+80,
                                  duckX+57,duckY+137.5,
                                  duckX+197.5,duckY+137.5,
                                  duckX+177.5,duckY+85,
                                  duckX+177.5,duckY+50,
                                  duckX+195,duckY+48,
                                  duckX+195,duckY+5,
                                  duckX+160,duckY-25,
                                  duckX+135,duckY+5,
                                  duckX+150,duckY+55,
                                  duckX+55,duckY+55))
            .attr("fill","#ffffff")
            .attr("stroke","#d0d0d0ff") 

/*now this one draws the bill*/
        let duckBill = canvas.append("polyline")
            .attr("points", closedPolygon(duckX+195,duckY+5,
                                  duckX+195,duckY+49, 
                                  duckX+245,duckY+45))
            .attr("fill","#f0975b")

/*this draws the water under the duck*/
        let duckPond = canvas.append("rect")
            .attr("x",duckX-30)
            .attr("y",duckY+137.5)
            .attr("width",250)
            .attr("height",17.5)
            .attr("fill","#55bcbe")

/*this is for the wings*/
        let duckWing = canvas.append("polyline")
            .attr("points", closedPolygon(duckX+50,duckY+115,
                                  duckX+145,duckY+145,
                                  duckX+95,duckY+100,
                                  duckX+55,duckY-3))
            .attr("fill","#ffffff")
            .attr("stroke","#d0d0d0ff")

/*this draws the eye of the duck/swan/etc.
    in this instance it's an ellipse, in others it's a circle
    i wanted to figure out how to rotate it to make it slanted and more "graceful" 
    but i couldn't get the code to work
    so that feature went unimplemented*/
        let duckEye = canvas.append("ellipse")
                .attr("cx",duckX+175)
                .attr("cy",duckY+22.5)
                .attr("rx",5)
                .attr("ry",15)
                .attr("fill", "black");
    }

    else if (choice == "goose") {
    /*this mostly changes the colour of the drawing relative 2 original, but also slightly changes the size and shape of the wings */
        let duckBody = canvas.append("polyline")
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
            .attr("fill","#ffffff")
            .attr("stroke","#000000") 


        let duckBill = canvas.append("polyline")
            .attr("points", closedPolygon(duckX+195,duckY+5,
                                  duckX+195,duckY+69, //lol
                                  duckX+245,duckY+65))
            .attr("fill","#f0975b")


        let duckPond = canvas.append("rect")
            .attr("x",duckX-30)
            .attr("y",duckY+137.5)
            .attr("width",250)
            .attr("height",17.5)
            .attr("fill","#55bcbe")

        let duckWing = canvas.append("polyline")
            .attr("points", closedPolygon(duckX+15,duckY+85,
                                  duckX+125,duckY+145,
                                  duckX+100,duckY+55))
            .attr("fill","#d8d8cfff")
            .attr("stroke","#000000")
    
/*circle code courtesy of https://d3-graph-gallery.com/graph/shape.html*/
        let duckEye = canvas.append("circle")
            .attr("cx",duckX+175)
            .attr("cy",duckY+22.5)
            .attr("r",5)
            .attr("fill", "black")
    }

    else {
        let duckBody = canvas.append("polyline")
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


        let duckBill = canvas.append("polyline")
            .attr("points", closedPolygon(duckX+195,duckY+5,
                                  duckX+195,duckY+69, //lol
                                  duckX+245,duckY+65))
            .attr("fill","#f0975b")


        let duckPond = canvas.append("rect")
            .attr("x",duckX-30)
            .attr("y",duckY+137.5)
            .attr("width",250)
            .attr("height",17.5)
            .attr("fill","#55bcbe")

        let duckWing = canvas.append("polyline")
            .attr("points", closedPolygon(duckX+35,duckY+105,
                                  duckX+125,duckY+145,
                                  duckX+100,duckY+55))
            .attr("fill","#99764d")
    
        let duckEye = canvas.append("circle")
                .attr("cx",duckX+175)
                .attr("cy",duckY+22.5)
                .attr("r",5)
                .attr("fill", "black")
/*and last but not least this set of variables draws the 3 little hairs? feathers? whatever at the top of the duck's head*/

/*these two variables are for the starting point of each "hair"*/
        let hairStartX = duckX + 160;
        let hairStartY = duckY - 20;

/*hair 1*/
        let duckHair1 = canvas.append("line")
            .attr("x1", hairStartX)
            .attr("y1", hairStartY)
            .attr("x2", hairStartX-15)
            .attr("y2", hairStartY-12.5)
            .attr("stroke", "black")
            .attr("stroke-width", "2")

/*hair 2*/
        let duckHair2 = canvas.append("line")
            .attr("x1", hairStartX)
            .attr("y1", hairStartY)
            .attr("x2", hairStartX-11)
            .attr("y2", hairStartY-16)
            .attr("stroke", "black")
            .attr("stroke-width", "2")

/*hair 3*/
        let duckHair3 = canvas.append("line")
            .attr("x1", hairStartX)
            .attr("y1", hairStartY)
            .attr("x2", hairStartX-8)
            .attr("y2", hairStartY-20)
            .attr("stroke", "black")
            .attr("stroke-width", "2")
    }
    return canvas;
/*i'm not sure why the variables for the drawing shapes say they're never read, the code has worked fine so far so it's probably just a quirk of javascript. should be fine to ignore, but double-check just in case*/
    
}

