"use strict"

/* blah blah blah global variables you get the gist
    see comment in processForm for more info
    i wanted to code these w/in processForm or as its parameters b/c global vars aren't good coding practice but i also wasn't sure if that was allowed so i left this declaration as is*/
let combo, amount, zipCode, comboChoice, comboName;




document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

function processForm() {

    /*all these variables take user input: combo (formerly "choice") and amount are based on the template code, but everything else was written by me.
        combo and amount take the selected menu option (opt) and the number of platters ordered (quant), respectively.
        zipCode takes the zip code of the user as a string because i need it to properly calculate the zip length and the initial digit, i would need to do a whole bunch of dumb recursive shenanigans if it were a number
        comboChoice and comboName are necessary in order for the name of the combo to properly print out. the specific structure of the arguments passed is courtesy of Claude Sonnet 4.5 by Anthropic
        i tried several solutions to get the combo names to display properly but they basically all failed until i asked claude. probably spent the better part of an hour on this.*/
    combo = Number(document.getElementById("opt").value);
    amount = Number(document.getElementById("quant").value);
    zipCode = document.getElementById("zip").value;
    comboChoice = document.getElementById("opt");
    comboName = comboChoice.options[comboChoice.selectedIndex].text;


    /*as asked in the instructions i didn't touch any of this, but if i'm allowed to i'd like to modify validateData and evaluateAnswers to take params instead of just relying on the values declared w/in the function
        the default option just kinda feels kludge-y as is, and i'm all about that ~ elegance ~*/
    let evaluationCompleted = false;

    if (validateData()) {
        evaluationCompleted = evaluateAnswers();
    }

    if (evaluationCompleted) {
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    } else {
        rule();
    }
}

/* this function checks to make sure the data the user inputs works properly and only returns true if all data was entered correctly, else it outputs an error message and returns false.
    i kept it mostly the same as in the instructions but i chose to work w/early returns for the sake of simplicity + familiarity. it underwent a lot less change than evaluateAnswers (that one's basically entirely new). mostly i just added an additional else-if block to check for valid zip codes
    i moved the "return true" declaration to be inside the if-else statement as part of the initial debug process for the else-if part of the statement
    isInteger method found via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger*/
function validateData() {
    if (amount < 1 || isNaN(amount)||!Number.isInteger(amount)) {
        output("Please enter a valid number greater than zero for the amount you would like to order.");
        return false;
    }
    else if (Number(zipCode) < 1 || isNaN(Number(zipCode)) || Number(zipCode.length) != 5){ //it took me so goddamn long to figure out why this wasn't working properly, even when i wrote in a valid zip code it would give me the error message. turns out i forgot to pass zipCode.length to a number, fml
        output("Please enter a valid US zip code.");
        return false;
    }
    else {
        return true;
    }
}

/*so it turns out there was a way simpler way to do this LOL, bye bye function declaration*/  


/*this function evaluates the combo choice, number of combos ordered and zip code of the customer. 
    it returns true by default, but will return false and output an error message if the user tries to order pizza + salad with a west coast zip code. think of the if part of the second if-else block as kind of a try-catch type thing (except, y'know, not actually try-catch)
    nested if-else wasn't my first choice but again i wanted to try and stick to what was asked for as closely as possible, plus we aren't allowed to use switch just yet anyway. i unfortunately wasn't able to think of a more efficient way to print out the discount 
    i'm not refactoring this to nest any more if statements, sorry, i don't want my code to look like yandere sim LOL*/
function evaluateAnswers() {
    let comboPrice; //i probably could have coded this globally but it didn't occur to me when i was writing this. whoops! (iirc you're not really supposed to globally declare vars anyway)
    let zipStart = Number(zipCode.charAt(0)) //this was initially bugged until i realized i made the classic javascript mistake of entering the wrong index for the string. i hate programming sometimes. method from MDN docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
    /*a simple if-else statement to determine the price for later calculation. if i had more time i'd figure out a more efficient way to do it but i was in a hurry and also hungry*/
    if (combo == 1){
        comboPrice = 12.00;
    }
    else if (combo == 2){
        comboPrice = 8.00;
    }
    else {
        comboPrice = 10.00;
    }

    if (zipStart == 9 && combo == 1){
        /*if the user orders the pizza combo, this checks zipStart to see whether or not they live on the west coast*/
        output("Sorry, due to an E. coli outbreak,  " + comboName + " is not available in your region. Please select a different combo.");
        return false;
    }
    else {
        /*this if-else statement checks if the user qualifies for a discount based on the values of amount and combo*/
        if (amount >= 3 && combo != 3){
            comboPrice = comboPrice * 0.75;
            output("Congratulations! You qualify for a 25% discount on your order of " + amount + " " + comboName + " combos.");
            /*toFixed method found courtesy of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed. thank you mozzarella foundation */
            output("You have ordered " + amount + " " + comboName + " combos. Your order will be available for pickup at our store location in " + zipCode + ". Your total is $" + (comboPrice * amount).toFixed(2));
        }
        else{
            output("You have ordered " + amount + " " + comboName + " combos. Your order will be available for pickup at our store location in " + zipCode + ". Your total is $" + (comboPrice * amount).toFixed(2));
        }
    }
    return true;

}


 
