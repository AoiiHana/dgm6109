"use strict"

/*this adds the library needed to draw sheet music using javascript from the script named in the HTML file
    in this case i'm using VexFlow, though i briefly tried an alternative that turned out to not really be as versatile as i had hoped */
const VexFlow = Vex.Flow

/* kept it simple, no change from the originals*/

let svgWidth = 1200
let svgHeight = 900


let margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 80
}

/* VexFlow provides its own methods to draw to svg, so basically all of this code got commented out. i might use it to draw the key, so i'm leaving it here for the time being */

/*let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")*/

/* let viz = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

viz.append("rect")
    .attr("width", svgWidth - (margin.left + margin.right))
    .attr("height", svgHeight - (margin.top + margin.bottom))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5,5") */

/* dataset ended up being the only global variable i needed for this project, so all the others were removed
    honestly i probably could've jut defined it within async but i figured it was better not to risk any code breaking*/


let dataset


(async function () {
    dataset = await d3.json("data.json").then(buildVisualization)
    console.log("here")
})();

/**** function buildVisualization(dataset) *****
* this is the main function that builds the visualization by calling all the other helper functions
* we first call getPitch and getLength to process the dataset and extract the necessary pitch and length data for each note
* then we call drawVisualization to actually draw the sheet music using vexflow based on the processed data
* finally we return the original dataset  
* 
* parameters: dataset - the JSON dataset loaded at the start of the program
* returns: dataset - the original dataset (not modified)
*****/

function buildVisualization(dataset) {
    let renderPitch = getPitch(dataset);
    let renderLength = getLength(dataset);
    drawVisualization(renderPitch, renderLength);
    return dataset;
}

/*w/my version of the project i ended up not needing buildScales at all, so i deleted it*/

/**** function getPitch(dataset) *****
 * this is used to set the necessary pitches for each note in the score based on timeOnline in the dataset
 * it first declares an empty array notePitch to store the pitches as strings, which is the format vexflow uses to set pitch for each note on the staff
 * then it loops through the dataset and uses if/else statements to assign the appropriate pitch based on the timeOnline value for each entry before passing the pitches to notePitch
 * finally it returns notePitch filled with all the necessary data
 * 
 * parameters: dataset - the JSON dataset loaded at the start of the program
 * returns: notePitch - an array of strings representing the pitch for each note in the score
*****/
function getPitch(dataset) {
    let notePitch = [];
    for (let i = 0; i < dataset.length; i++) {
        /*originally i thought about going with a switch statement, but since switch isn't necessarily suitable for handling ranges i went with if/else instead
            this is probably less efficient but it's just to stay on the safe side
            maybe someday i'll try and see if this can be done w/switch, but that day is not today*/
        if (dataset[i].timeOnline < 4) {
            notePitch[i] = "c/4";
        }
        else if (dataset[i].timeOnline >= 4 && dataset[i].timeOnline < 5) {
            notePitch[i] = "c#/4";
        }
        else if (dataset[i].timeOnline >= 5 && dataset[i].timeOnline < 6) {
            notePitch[i] = "d/4";
        }
        else if (dataset[i].timeOnline >= 6 && dataset[i].timeOnline < 7) {
            notePitch[i] = "d#/4";
        }
        else if (dataset[i].timeOnline >= 7 && dataset[i].timeOnline < 8) {
            notePitch[i] = "e/4";
        }
        else if (dataset[i].timeOnline >= 8 && dataset[i].timeOnline < 9) {
            notePitch[i] = "f/4";
        }
        else if (dataset[i].timeOnline >= 9 && dataset[i].timeOnline < 10) {
            notePitch[i] = "f#/4";
        }
        else if (dataset[i].timeOnline >= 10 && dataset[i].timeOnline < 11) {
            notePitch[i] = "g/4";
        }
        else if (dataset[i].timeOnline >= 11 && dataset[i].timeOnline < 12) {
            notePitch[i] = "g#/4";
        }
        else if (dataset[i].timeOnline >= 12 && dataset[i].timeOnline < 13) {
            notePitch[i] = "a/4";
        }
        else if (dataset[i].timeOnline >= 13 && dataset[i].timeOnline < 14) {
            notePitch[i] = "a#/4";
        }
        else if (dataset[i].timeOnline >= 14 && dataset[i].timeOnline < 15) {
            notePitch[i] = "b/4";
        }
        else if (dataset[i].timeOnline >= 15) {
            notePitch[i] = "c/5";
        }
    }

    return notePitch;
}
/**** function getLength(dataset) *****
 * this is used to set the necessary lengths for each note in the score based on wordsWritten in the dataset
 * it works identically to getPitch, but instead of setting the pitch values for each note it sets the length 
 * length is also stored as strings in array noteLengths since that's the format vexflow uses to draw the right notes on the staff
 * 
 * parameters: dataset - the JSON dataset loaded at the start of the program
 * returns: noteLengths - an array of strings representing the length for each note in the score
*****/
function getLength(dataset) {
    let noteLengths = [];
    for (let i = 0; i < dataset.length; i++) {
        //same as getPitch, originally thought about using switch but decided if/else was better for this use case
        if (dataset[i].wordsWritten >= 0 && dataset[i].wordsWritten <= 50) {
                noteLengths[i] = "16";
            }
        else if (dataset[i].wordsWritten > 50 && dataset[i].wordsWritten <= 200) {
                noteLengths[i] = "8";
            }
        else if (dataset[i].wordsWritten > 200 && dataset[i].wordsWritten <= 350) {
                noteLengths[i] = "q";
            }
        else if (dataset[i].wordsWritten > 350 && dataset[i].wordsWritten <= 500) {
                noteLengths[i] = "h";
            }
        else if (dataset[i].wordsWritten > 500) {
                noteLengths[i] = "w";
            }
    }
    return noteLengths;
}

/**** function drawVisualization(pitch, length) *****
 * this uses VexFlow to draw sheet music based on the pitch and length arrays provided as parameters
 * it uses the low-level api since the EasyScore api doesn't allow for incomplete measures, which is necessary for this project since the note lengths vary so much
 * it took a *lot* of debugging, some help from claude, and literal tears to figure this out 
 * writing everything about this function would make this comment way too long, so i'll just try to sum up the key parts + put the rest in individual comments throughout the function
 * first we start by calling the vexflow library + unpacking the necessary classes from it
 * then we create a renderer that draws to the canvas div in the html
 * after defining some config variables we loop through array pitch to populate the staffs w/notes based on parameters in pitch + length arrays
 * create an instrument to hold the notes + format it before drawing it to the staff
 * all info on vexflow methods courtesy of the official tutorial on github: https://github.com/0xfe/vexflow/wiki/Tutorial
 * 
 * parameters: pitch - an array of strings representing the pitch for each note in the score
 *             length - an array of strings representing the length for each note in the score
 * returns: none (but draws the sheet music to the svg in the html)
*****/
function drawVisualization(pitch, length) {
    const VexFlow = Vex.Flow; //calls the VexFlow library w/in the function
    
    const { Renderer, Stave, StaveNote, Formatter, Voice } = VexFlow; //unpacks necessary classes from VexFlow for use w/in the function
    
    //creates renderer object for drawing sheet music using standard syntax of VexFlow and sets it to draw to the canvas div in the html
    const renderer = new Renderer(
        document.getElementById('canvas'),
        Renderer.Backends.SVG
    );
    renderer.resize(svgWidth, svgHeight); //resizes the renderer to fit the svg dimensions defined above
    /*this creates an svg object to draw the actual sheet music in
        think of it like how d3 creates an svg element to draw visualizations in */
    const context = renderer.getContext(); 
    context.setFont("Cochin", 20).setBackgroundFillStyle("#ffffff"); //sets the font for comments + the background colour for the svg
    
    // config variables to split notes into multiple staves (lines) to make sure they all fit w/in svg
    let staffLength = 10; 
    let staffHeight = 100;
    let yPosition = margin.top;
    
    //loops through pitch and length arrays to create staffs and draw notes
    for (let i = 0; i < pitch.length; i += staffLength) {
        //creates a staff for each line
        let staff = new Stave(margin.left, yPosition, svgWidth - margin.left - margin.right);
        
        // adds treble clef to first staff only
        if (i === 0) {
            staff.addClef('treble');
        }
        
        staff.setContext(context).draw(); //this sets the drawing environment in which each staff will be drawn
        
        // config variable used to set the range of notes to draw per staff
        let endIndex = Math.min(i + staffLength, pitch.length);
        let notes = []; //creates empty array to store notes for each staff
        
        //for loop for iterating through range as defined by endIndex in pitch and length arrays
        for (let j = i; j < endIndex; j++) {
            //pushes a new note to notes array in the format of an object, allowing it to have both pitch and length defined
            notes.push(
                new StaveNote({
                    keys: [pitch[j]],
                    duration: length[j]
                })
            );
        }
        
        // creates an instrument in the sheet music to structure the staff and hold the notes; this is what actually gets drawn
        const voice = new Voice({
            num_beats: notes.length * 4,  // 
            beat_value: 4
        });
        /*this disables strict timing of measures in the voice
            without it the code kept breaking and nothing would draw b/c the measures weren't "complete" 
            turns out unless you disable strict timing vexflow expects each measure to have the same total length, which isn't possible here since note lengths vary so much
            here's the google groups thread where i found the answer to how to fix this (including the reason why i had to use the api instead of EasyScore): https://groups.google.com/g/vexflow/c/AXvBjT1XEhQ*/
        voice.setStrict(false); 
        voice.addTickables(notes);
        
        // formats the dimensions of the instrument before drawing it 
        new Formatter()
            .joinVoices([voice])
            .format([voice], staff.getWidth() - 20);
        
        voice.draw(context, staff); //draws the instrument to the staff 
        
        // moves down to draw the next staff
        yPosition += staffHeight;
    }

    /*config variables for drawing the visualization title 
        format for all of this was found via gemini which cited this medium article: https://medium.com/@bran.rowell/rendering-music-data-with-vexflow-4e742e32ba0c */
    let titleX = 250; //centers the title in the middle of the svg
    let titleY = margin.top; //positions the title at the bottom of the sheet music in the bottom margin
    context.fillText("Relationship between time online and number of words written", titleX, titleY, { align: "center" }); //draws the title to the svg
}