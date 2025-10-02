"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;
/*all non-black colours in this assignment were found using Photoshop eye dropper tool */

/*here are the starting variables as outlined in the assignment description
    the origin point is based on the very leftmost point of the duck's body shape as surveyed in the grid*/
function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    /*passes value of select menu "species" to var "choice"*/
    choice = document.getElementById("species").value
    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);


let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

function drawImage() {
/* this draws the body of the duck*/
    let duckX = xInput;
    let duckY = yInput;
/*changes the output based on user input*/
    if (choice == "swan"){
        let duckBody = drawing.append("polyline")
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
        let duckBill = drawing.append("polyline")
            .attr("points", closedPolygon(duckX+195,duckY+5,
                                  duckX+195,duckY+49, 
                                  duckX+245,duckY+45))
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
            .attr("points", closedPolygon(duckX+50,duckY+115,
                                  duckX+145,duckY+145,
                                  duckX+95,duckY+100,
                                  duckX+55,duckY-3))
            .attr("fill","#ffffff")
            .attr("stroke","#d0d0d0ff")

/*this draws the eye
    i wanted to figure out how to rotate it to make it slanted and more "graceful" 
    but i couldn't get the code to work
    so that feature went unimplemented*/
        let duckEye = drawing.append("ellipse")
                .attr("cx",duckX+175)
                .attr("cy",duckY+22.5)
                .attr("rx",5)
                .attr("ry",15)
                .attr("fill", "black");
}

else if (choice == "goose") {
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
        .attr("fill","#ffffff")
        .attr("stroke","#000000") 


    let duckBill = drawing.append("polyline")
        .attr("points", closedPolygon(duckX+195,duckY+5,
                                  duckX+195,duckY+69, //lol
                                  duckX+245,duckY+65))
        .attr("fill","#f0975b")


    let duckPond = drawing.append("rect")
        .attr("x",duckX-30)
        .attr("y",duckY+137.5)
        .attr("width",250)
        .attr("height",17.5)
        .attr("fill","#55bcbe")

    let duckWing = drawing.append("polyline")
        .attr("points", closedPolygon(duckX+15,duckY+85,
                                  duckX+125,duckY+145,
                                  duckX+100,duckY+55))
        .attr("fill","#d8d8cfff")
        .attr("stroke","#000000")
    
/*circle code courtesy of https://d3-graph-gallery.com/graph/shape.html*/
    let duckEye = drawing.append("circle")
                .attr("cx",duckX+175)
                .attr("cy",duckY+22.5)
                .attr("r",5)
                .attr("fill", "black")
}

else {
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


    let duckBill = drawing.append("polyline")
        .attr("points", closedPolygon(duckX+195,duckY+5,
                                  duckX+195,duckY+69, //lol
                                  duckX+245,duckY+65))
        .attr("fill","#f0975b")


    let duckPond = drawing.append("rect")
        .attr("x",duckX-30)
        .attr("y",duckY+137.5)
        .attr("width",250)
        .attr("height",17.5)
        .attr("fill","#55bcbe")

    let duckWing = drawing.append("polyline")
            .attr("points", closedPolygon(duckX+35,duckY+105,
                                  duckX+125,duckY+145,
                                  duckX+100,duckY+55))
            .attr("fill","#99764d")
    
/*eye code courtesy of https://d3-graph-gallery.com/graph/shape.html*/
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
}

/*i'm not sure why the variables say they're unused, the code seemingly works fine in chrome but IDK if it'll work with the tests.
    do you have any idea what i should try to debug?
    sorry this is like a couple hours late btw orz*/
    
}

