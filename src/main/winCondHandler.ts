import { Game, Player } from "./game.ts"

export class WinCondHandler {

    protected nextHandler : WinCondHandler | void;

    constructor(nextHandler : WinCondHandler | void) {
        this.nextHandler = nextHandler;
    }

    handle(game : Game) : boolean {
        if(this.nextHandler)
            return this.nextHandler.handle(game);
        return false;
    }
}

export class DrawHandler extends WinCondHandler {

    handle(game : Game) : boolean {
        if(this.isDraw(game))
            return true;
        return super.handle(game);
    }

    private isDraw(game : Game) {
        return !game.fields.includes(0);
    }

}

export class WinHandler extends WinCondHandler {

    handle(game : Game) : boolean {
        if(this.onePlayerWins(game))
            return true;
        return super.handle(game);
    }

    private onePlayerWins(game : Game) {
        return this.p1winsOnColumn1(game) || this.p2winsOnColumn1(game);
    }

    private p1winsOnColumn1(game : Game) {
        return game.getField(1, 1) === Player.P1
          && game.getField(2, 1) === Player.P1
          && game.getField(3, 1) === Player.P1;
    }

    private p2winsOnColumn1(game : Game) {
        return game.getField(1, 1) === Player.P2
          && game.getField(2, 1) === Player.P2
          && game.getField(3, 1) === Player.P2;
    }

}