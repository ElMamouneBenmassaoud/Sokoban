"use strict";

/**
 * Calls the function buildLevel once the page is loaded
 */
window.addEventListener("load", function(event) {
    buildLevel(0);
});

/**
* Output the level in the console
* @param {number} level The level's number
*/
function buildLevel(level) {
    // Loop over all lines of the level map
    for (let i=0; i<levels[level].map.length; i++) {
        let line = levels[level].map[i];
        // Creates the div representing a line
        let lineDiv = document.createElement("div");
        // Adds the class "line" to the line div
        $(lineDiv).addClass("line");
        // Appends the line div to the #world div
        $("#world").append(lineDiv);
        // Loop over all the symbols in the line
        for (const symbol of line) {
            // Creates the div representing a square
            let squareDiv = document.createElement("div");
            // Adds the "square" class to the square div
            $(squareDiv).addClass("square");

            // Adds the correct class depending on the symbol
            switch (symbol) {
                case ' ': 
                $(squareDiv).addClass("floor");
                break;
                case 'x': 
                $(squareDiv).addClass("target");
                break;
                case '🧍': 
                $(squareDiv).addClass("player");
                break;
                case '#': 
                $(squareDiv).addClass("box");
                break;
                case '@': 
                $(squareDiv).addClass("boxOnTarget");
                break;
                default: 
                $(squareDiv).addClass("wall");
                break;
            }

            //Appends the square div to the line div
            lineDiv.append(squareDiv);
        }
    }
    
}