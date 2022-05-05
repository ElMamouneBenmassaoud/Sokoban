"use strict";

class State {

    /**
     * @param {{x:number,y:number}} playerPosition position du joueur
     * @param {{x:number,y:number} | undefined} boxPosition position de la boite
     */
    constructor(playerPosition, boxPosition = undefined) {
        /** @private */
        this._playerPosition = playerPosition;
        /** @private */
        this._boxPosition = boxPosition;
    }

    /**
     * Renvoie la position du joueur.
     * @returns la position du joueur
     */
    getPlayerPosition() {
        return {...this._playerPosition};
    }

    /**
     * Renvoie la position de la box
     * @returns position de la box
     */
    get boxPosition() {
        if (this.boxPosition === undefined) {
            return undefined;
        } else {
            return {...this._boxPosition};
        }
    }
}
const s = new State({x: 1, y: 2});
const position = s.getPlayerPosition();
position.x = 20;
console.log(s.getPlayerPosition()); // réponse correcte { x: 1, y: 2 }
position.y = 50;
console.log(s.getPlayerPosition()); // réponse correcte { x: 1, y: 2 }
