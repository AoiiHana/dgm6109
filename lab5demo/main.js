"use strict"

/*all non-black colours in this assignment were found using Photoshop eye dropper tool */


document.getElementById("action").addEventListener("click", processForm);

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);


let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*here are the starting variables as outlined in the assignment description
    the origin point is based on the very leftmost point of the duck's body shape as surveyed in the grid*/
let xInput, yInput, choice;

/* ************ function processForm () *****
this takes user inputs as starting variable arguments, clears the drawing area, and then passes inputted arguments to the parameters of duck()

REQUIREMENTS (same as in template):
* d3.js v3 or higher
* Form fields to provide required data
* SVG canvas wrapped by d3

PARAMETERS:
nothing for now

RETURNS:
also nothing
****************************************************************** */
function processForm() {
    /* this gets the necessary variables from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    /*passes value of select menu "species" to var "choice"*/
    choice = document.getElementById("species").value
    drawing.selectAll('svg>*').remove(); //honestly IDK why this keeps clearing the border but it seems to be intentional so i'm still not changing it ig
    duck(drawing, xInput, yInput, true, choice);
}


