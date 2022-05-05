"use strict";

/**
 * Calls the function buildLevel once the page is loaded
 */
window.addEventListener("load", function (event) {
    buildLevel(3);
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
 * Renvoie la position du joueur
 * @returns la position du joueur
 */
function getPlayerPosition() {
    pos.x = $(".player").index();
    pos.y = $(".player").parent()
        .index();
    return pos;
}
/**
 * Renvoie la case de la page web qui se trouve à
 * la position donnée en argument
 * @param {pos} position position du joueur.
 * @returns la case de la page web qui se trouve à
 * la position donnée en argument
 */
function getSquareAt(position) {
    return $("#world").children() //l'enfant de l'ID world
        .eq(position.y) //la valeur de la ligne (y) qui se trouve dans pos
        .children() //l'enfant de de l'enfant de l'ID world
        .eq(position.x); //la valeur de la colonne (x) qui se trouve dans pos
}

/**
 * Déplacement du joueur en utilisants les touches directionelles
 * @param {KeyboardEvent} events la touche pour déplacer le joueur
 * @returns
 */
function move(events) {
    const currentPosPlayer = getPlayerPosition();
    let newX = 0;
    let newY = 0;
    const oldX = currentPosPlayer.x;
    const oldY = currentPosPlayer.y;
    let nextToPlayerX = 0;
    let nextToPlayerY = 0;
    switch (events.key) {
    case "ArrowDown":
        newX = currentPosPlayer.x;
        newY = currentPosPlayer.y + 1;
        nextToPlayerX = currentPosPlayer.x;
        nextToPlayerY = currentPosPlayer.y + 2;
        deplacement(oldX, oldY, newX, newY, nextToPlayerX, nextToPlayerY);
        break;
    case "ArrowUp":
        newX = currentPosPlayer.x;
        newY = currentPosPlayer.y - 1;
        nextToPlayerX = currentPosPlayer.x;
        nextToPlayerY = currentPosPlayer.y - 2;
        deplacement(oldX, oldY, newX, newY, nextToPlayerX, nextToPlayerY);
        break;
    case "ArrowRight":
        newX = currentPosPlayer.x + 1;
        newY = currentPosPlayer.y;
        nextToPlayerX = currentPosPlayer.x + 2;
        nextToPlayerY = currentPosPlayer.y;
        deplacement(oldX, oldY, newX, newY, nextToPlayerX, nextToPlayerY);
        break;
    case "ArrowLeft":
        newX = currentPosPlayer.x - 1;
        newY = currentPosPlayer.y;
        nextToPlayerX = currentPosPlayer.x - 2;
        nextToPlayerY = currentPosPlayer.y;
        deplacement(oldX, oldY, newX, newY, nextToPlayerX, nextToPlayerY);
        break;
    }
}

/**
 * Deplacement de l'ancienne position a la nouvelle position.
 * @param {Number} oldX l'ancienne position (x)
 * @param {Number} oldY l'ancienne position (y)
 * @param {Number} newX la nouvelle position (x)
 * @param {Number} newY la nouvelle position (y)
 * @param {number} nextToPlayerX la position qui suit la nouvelle position (x)
 * @param {number} nextToPlayerY la position qui suit la nouvelle position (y)
 */
function deplacement(oldX, oldY, newX, newY, nextToPlayerX, nextToPlayerY) {
    const oldPos = getSquareAt({
        x: oldX,
        y: oldY,
    });

    const newPos = getSquareAt({
        x: newX,
        y: newY,
    });

    const nextToPlayer = getSquareAt({
        x: nextToPlayerX,
        y: nextToPlayerY,
    });

    if (!$(newPos).hasClass("wall")) {
        if (!(($(newPos).hasClass("box") || $(newPos).hasClass("boxOnTarget")) && ($(nextToPlayer).hasClass("box") || $(nextToPlayer).hasClass("boxOnTarget") || $(nextToPlayer).hasClass("wall")))) {
            $(oldPos).removeClass("player");

            if (!$(oldPos).hasClass("target")) {
                $(oldPos).addClass("floor");
            }

            $(newPos).addClass("player");
            $(newPos).removeClass("floor");

            if ($(newPos).hasClass("box") || $(newPos).hasClass("boxOnTarget")) {
                $(newPos).removeClass("box");

                if ($(newPos).hasClass("boxOnTarget")) {
                    $(newPos).addClass("target");
                }

                $(newPos).removeClass("boxOnTarget");

                if ($(nextToPlayer).hasClass("target")) {
                    $(nextToPlayer).addClass("boxOnTarget");
                } else {
                    $(nextToPlayer).addClass("box");
                }
            }

            incrMoves();
        }
    }
}

let moves = 0;

/**
 * Incrémente le nombre de mouvements et l'affiche sur la page web
 */
function incrMoves() {
    $("#cpt").text(++moves);
}
