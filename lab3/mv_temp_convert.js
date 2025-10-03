"use strict"

document.getElementById("submit").addEventListener("click", function(){
    let fahrenheit = document.getElementById("inputF").value; 
    let conversionType = document.getElementById("unitChoice").value
    let celsius = (fahrenheit - 32) * 5 / 9 
    let kelvin = (Number(fahrenheit) + 459.67) * 5 / 9

    output("User Temperature(°F): " + fahrenheit)
    if (conversionType == "c"){
        output("User Temperature(°C): " + celsius)
    }
    else{
        output("User Temperature(K): " + kelvin)
    }
    /* 
        if (conversionType == "c"){
            output("User Temperature(°C): " + celsius)
        }
            
        if (conversionType == "k"){
            output("User Temperature(K): " + kelvin)
        }
        
        i honestly had to go back and write the "two if statements" version in after committing this to github because i've already become really used to writing "if-else" in my previous attempts at coding
        in general i prefer "if-else" because IMO it's more elegant and efficient(?) than discrete if-statements
        honestly my general ethos of code is very KISS (keep it simple, silly): 
        whatever is the most lightweight, efficient, streamlined way of doing it that I can come up with, that's how I wanna do it
    */

});


