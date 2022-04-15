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
    for (let i=0; i<levels[level].map.length; i++) {
        console.log(levels[level].map[i]);
    }
    
}