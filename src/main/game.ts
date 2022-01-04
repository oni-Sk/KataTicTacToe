export enum Field {NOT_TAKEN, PLAYER1, PLAYER2}
export enum Turn {PLAYER1, PLAYER2}

export class Game {

    fields : number[];
    currentPlayer : number;

    constructor() {

        this.fields = new Array(9);
        this.fields.fill(Field.NOT_TAKEN);

        this.currentPlayer = Turn.PLAYER1;

    }
    
    getFields() : Field[] {
        return this.fields;
    }

    getCurrentPlayer() : Turn {
        return this.currentPlayer;
    }

    isNotOver() : boolean {

        if( ! this.fields.includes(0) )
            return false;
        return true;

    }

}