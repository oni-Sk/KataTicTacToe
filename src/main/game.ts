import { WinCondHandler, DrawHandler, WinHandler } from "./winCondHandler.ts"

export enum Player {NONE, P1, P2}

export class Game {

    fields: number[];
    currentPlayer: number;

    constructor() {

        this.fields = new Array(9);
        this.fields.fill(Player.NONE);

        this.currentPlayer = Player.P1;

    }
    
    getFields() : Player[] {
        return this.fields;
    }

    getField(row: number, column: number) : Player {
        return this.fields[gridCoordsToIndex(row, column)];

      function gridCoordsToIndex(row: number, column: number) : number {
        return (row - 1) * 3 + (column - 1);
      }
    }

    getCurrentPlayer() : Player {
        return this.currentPlayer;
    }

    isNotOver() : boolean {

        const winCondHandler = new WinHandler(
                                new DrawHandler(
                                new WinCondHandler()));
        
        return ! winCondHandler.handle(this);
    }

}