"use strict"

document.getElementById("submit").addEventListener("click", function(){
    let fahrenheit = document.getElementById("inputF").value; //this is the average for October of last year in Medellin, Colombia, according to TuTiempo.net
    let celsius = (fahrenheit - 32) * 5 / 9 
    let kelvin = (Number(fahrenheit) + 459.67) * 5 / 9

    output("User Temperature(°F): " + fahrenheit)
    output("User Temperature(°C): " + celsius)
    output("User Temperature(K): " + kelvin)

});


