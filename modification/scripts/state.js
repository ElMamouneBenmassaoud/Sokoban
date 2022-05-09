"use strict";

class State {
    #playerPosition;
    #direction;
    #boxPosition;

    /**
     * @param {{x:Number, y:Number}} playerPosition position du joueur avant déplacement
     * @param {String} direction direction du joueur avant déplacement
     * @param {{x:Number, y:Number} | undefined} boxPosition position éventuelle de la boite après déplacement
     */
    constructor(playerPosition, direction, boxPosition = undefined) {
        /** @private */
        this.#playerPosition = playerPosition;
        /** @private */
        this.#direction = direction;
        /** @private */
        this.#boxPosition = boxPosition;
    }

    /**
     * Renvoie la position du joueur avant le déplacement.
     * @returns la position du joueur avant le déplacement
     */
    get playerPosition() {
        return { ...this.#playerPosition };
    }

    /**
     * Renvoie la direction du joueur avant le déplacement.
     * @returns la direction du joueur avant le déplacement
     */
     get direction() {
        return this.#direction;
    }

    /**
     * Renvoie la position de la box après le déplacement
     * @returns position de la box après le déplacement
     */
    get boxPosition() {
        if (this.#boxPosition === undefined) {
            return undefined;
        } else {
            return { ...this.#boxPosition };
        }
    }
}


