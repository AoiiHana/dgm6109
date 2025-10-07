"use strict"

/* blah blah blah global variables you get the gist
    see comment in processForm for more info*/
let combo, amount, zipCode, comboChoice, comboName;




document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

function processForm() {

    /*all these variables take user input: combo (formerly "choice") and amount are based on the template code, but everything else was written by me.
        zipCode takes a string as an argument because i need it to properly calculate the zip length and the initial digit, otherwise i would need to do a whole bunch of dumb recursive shenanigans
        comboChoice and comboName are necessary in order for the name of the combo to properly print out. the specific structure of the arguments passed is courtesy of Claude Sonnet 4.5 by Anthropic
        i tried several solutions to get the combo names to display properly but they basically all failed until i asked claude. probably spent the better part of an hour on this*/
    combo = Number(document.getElementById("opt").value);
    amount = Number(document.getElementById("quant").value);
    zipCode = document.getElementById("zip").value;
    comboChoice = document.getElementById("opt");
    comboName = comboChoice.options[comboChoice.selectedIndex].text;


    /*as asked in the instructions i didn't touch any of this, but if i'm allowed to i'd like to modify validateData and evaluateAnswers to take args instead of just relying on the values declared w/in the function
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

/* this function checks to make sure the data the user inputs works properly and only returns true if all data was entered correctly, else it returns false.
    i kept it mostly the same as in the instructions but i chose to work w/early returns for the sake of simplicity + familiarity. it underwent a lot less change than evaluateAnswers (that one's basically entirely new). mostly i just added an additional else-if block to check for valid zip codes
    i moved the "return true" declaration to be inside the if-else statement as part of the initial debug process for the else-if part of the statement*/
function validateData() {
    if (amount < 1 || isNaN(amount)) {
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

/*this function gets the first digit of the user's zip code to check whether or not they're on the west coast. that way we can check for whether they can order the pizza & salad combo or not.
    this was modified from some code i got from google gemini trying to look up how to check the first digit of a number. it cited this source: https://bobbyhadz.com/blog/javascript-get-first-digit-of-number in full ai mode. kinda wish it hadn't popped up first thing in the search so i could've found the answer fully on my own but oh well
    the original code included an if-else statement to check if the zip code was negative, but since that's handled by validateData() i took it out as it was redundant
    in addition, it took an integer as an argument, my version takes a string as an argument because i already basically needed zipCode to be a string for the other stuff to work properly*/  
function getFirstDigit(zipCheck) {
    let zipStart = zipCheck[0];
    return Number(zipStart);
}


/*nested if-else wasn't my first choice but again i wanted to try and stick to what was asked for as closely as possible. i unfortunately wasn't able to think of a more efficient way to print out the discount 
    honestly if i'm allowed to i'll probably rewrite all of this as a switch statement, since nested if-else isn't really efficient or nice to read IMO*/
function evaluateAnswers() {
    let comboPrice; //i probably could have coded this globally but it didn't occur to me when i was writing this. whoops! (iirc you're not really supposed to globally declare vars anyway)
    
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
    
    if (!Number.isInteger(amount)) { 
        /*this is to make sure the user entered a whole amount of combo platters. kinda hard to make 2.38 hamburgers y'know?
        i found the isInteger method via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger*/
        output("Please enter a whole number of combo platters.");
        return false;
    }
    else if (getFirstDigit(zipCode) == 9 && combo == 1){
        /*if the user orders the pizza combo, this uses getFirstDigit() on zipCode to check whether or not they live on the west coast*/
        output("Sorry, due to an E. coli outbreak,  " + comboName + " is not available in your region. Please select a different combo.");
        return false;
    }
    else {
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

/*pro tip: never code on an empty stomach. you make way more errors that way*/
