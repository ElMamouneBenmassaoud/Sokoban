"use strict";

class State {
    #playerPosition;
    #boxPosition;

    /**
     * @param {{x:Number, y:Number}} playerPosition position du joueur avant déplacement
     * @param {{x:Number, y:Number} | undefined} boxPosition position éventuelle de la boite après déplacement
     */
    constructor(playerPosition, boxPosition = undefined) {
        /** @private */
        this.#playerPosition = playerPosition;
        /** @private */
        this.#boxPosition = boxPosition;
    }

    /**
     * Renvoie la position du joueur.
     * @returns la position du joueur
     */
    get playerPosition() {
        return { ...this.#playerPosition };
    }

    /**
     * Renvoie la position de la box
     * @returns position de la box
     */
    get boxPosition() {
        if (this.#boxPosition === undefined) {
            return undefined;
        } else {
            return { ...this.#boxPosition };
        }
    }
}


