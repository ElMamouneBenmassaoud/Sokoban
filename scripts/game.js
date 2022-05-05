"use strict";

/**
 * Calls the function buildLevel once the page is loaded
 */
window.addEventListener("load", function(event) {
    buildLevel(0);
    window.addEventListener("keydown", function (events) {
        move(events);
    });
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

const pos = {
    x: 0,
    y: 0,
};

/**
 * La position du joueur
 * @returns la position du joueur
 */
function getPlayerPosition() {
    pos.x = $(".player").index();
    pos.y = $(".player").parent()
        .index();
    return pos;
}
/**
 * Renvoie la case la case de la page web qui se trouve à
 * la position donnée en argument
 * @param {pos} position position du joueur.
 * @returns la case la case de la page web qui se trouve à
 * la position donnée en argument
 */
function getSquareAt(position) {
    return $("#world").children() //l'enfant de l'ID world
        .eq(position.y) //la valeur de la ligne (x) qui se trouve dans pos
        .children() //l'enfant de de l'enfant de l'ID world
        .eq(position.x); //la valeur de la colonne (y) qui se trouve dans pos
}

/**
 * Déplacement du joueur
 * @param {KeyboardEvent} events la touche pour le déplacer
 * @returns
 */
function move(events) {
    const currentPosPlayer = getPlayerPosition();
    let newX = 0;
    let newY = 0;
    const oldX = currentPosPlayer.x;
    const oldY = currentPosPlayer.y;
    switch (events.key) {
    case "ArrowDown":
        console.log("down");
        newY = ++currentPosPlayer.y;
        newX = currentPosPlayer.x;
        deplacement(oldX, oldY, newX, newY);
        break;
    case "ArrowUp":
        console.log("up");
        newY = --currentPosPlayer.y;
        newX = currentPosPlayer.x;
        deplacement(oldX, oldY, newX, newY);
        break;
    case "ArrowRight":
        console.log("right");
        newX = ++currentPosPlayer.x;
        newY = currentPosPlayer.y;
        deplacement(oldX, oldY, newX, newY);
        break;
    case "ArrowLeft":
        console.log("left");
        newX = --currentPosPlayer.x;
        newY = currentPosPlayer.y;
        deplacement(oldX, oldY, newX, newY);
        break;
    }
}

/**
 * Deplacement de l'ancienne position a la nouvelle position.
 * @param {Number} oldX l'ancienne position (x)
 * @param {Number} oldY l'ancienne position (y)
 * @param {Number} newX la nouvelle position (x)
 * @param {Number} newY la nouvelle position (y)
 */
function deplacement(oldX, oldY, newX, newY) {
    const oldPos = getSquareAt({
        x: oldX,
        y: oldY,
    });

    const newPos = getSquareAt({
        x: newX,
        y: newY,
    });

    if (!$(newPos).hasClass("wall")) {
        $(oldPos).removeClass("player")
            .addClass("floor");

        $(newPos).addClass("player");
    }
}
