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
    for (let i = 0; i < levels[level].map.length; i++) {
        const line = levels[level].map[i];
        // Creates the div representing a line
        const lineDiv = document.createElement("div");
        // Adds the class "line" to the line div
        $(lineDiv).addClass("line");
        // Appends the line div to the #world div
        $("#world").append(lineDiv);
        // Loop over all the symbols in the line
        for (const symbol of line) {
            // Creates the div representing a square
            const squareDiv = document.createElement("div");
            // Adds the "square" class to the square div
            $(squareDiv).addClass("square");

            // Adds the correct class depending on the symbol
            switch (symbol) {
            case " ":
                $(squareDiv).addClass("floor");
                break;
            case "x":
                $(squareDiv).addClass("target");
                break;
            case "🧍":
                $(squareDiv).addClass("player");
                break;
            case "#":
                $(squareDiv).addClass("box");
                break;
            case "@":
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

/**
 * @typedef {object} pos est une position à l'ordonnée y et à l'abcisse x
 * @property {number} x est la ligne de la position.
 * @property {number} y est la colonne de la position .
 * @returns la position du joueur
 */
function getPlayerPosition() {
    const col = $(".player").index();
    const line = $(".player").parent()
        .index();
    return {x: line, y: col};
}
/**
 * renvoie la case la case de la page web qui se trouve à
 * la position donnée en argument
 * @property {number} x est la ligne de la position.
 * @property {number} y est la colonne de la position .
 * @param {pos} position position du joueur.
 * @returns la case la case de la page web qui se trouve à
 * la position donnée en argument
 */
function getSquareAt(position) {
    return $("#world").children() //l'enfant de l'ID world
        .eq(position.x) //la valeur de la ligne (x) qui se trouve dans pos
        .children() //l'enfant de de l'enfant de l'ID world
        .eq(position.y); //la valeur de la colonne (y) qui se trouve dans pos
}
