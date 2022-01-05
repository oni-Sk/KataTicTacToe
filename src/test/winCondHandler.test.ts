import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";
import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";

import { Game, Player } from "../main/game.ts"
import { WinCondHandler, DrawHandler, WinHandler } from "../main/winCondHandler.ts"

Rhum.testPlan("winCondHandler.test.ts", () => {

    const expect = chai.expect;

    Rhum.testSuite("GameNotOverHandler should", () => {
        Rhum.testCase("return false : game is not over", () => {
            const stubbedGame = Rhum.stubbed(new Game());
            const winCondHandler = new WinCondHandler();
            expect(winCondHandler.handle(stubbedGame)).to.equal(false);
        });
    });

    Rhum.testSuite("DrawHandler should", () => {

        const stubbedGame = Rhum.stubbed(new Game());

        const mock = Rhum.mock(WinCondHandler).create();
        const drawHandler = new DrawHandler(mock);

        Rhum.testCase("handle request when draw : all fields taken", () => {

            stubbedGame.stub("fields", new Array(9).fill(Player.P1));
            expect(drawHandler.handle(stubbedGame)).to.equal(true);
        
        });
        
        Rhum.testCase("delegate request to WinCondHandler if game is not draw", () => {
            
            stubbedGame.stub("fields", [
                Player.NONE, Player.NONE, Player.NONE,
                Player.NONE, Player.NONE, Player.NONE,
                Player.NONE, Player.NONE, Player.NONE
            ]);

            expect(mock.calls.handle).to.equal(0);
            drawHandler.handle(stubbedGame);
            expect(mock.calls.handle).to.equal(1);

        });

    });

    Rhum.testSuite("WinHandler should", () => {

        const stubbedGame = Rhum.stubbed(new Game());

        const mock = Rhum.mock(WinCondHandler).create();
        const winHandler = new WinHandler(mock);

        Rhum.testCase("handle request when game is won", () => {

            stubbedGame.stub("fields", [
                Player.P1, Player.NONE, Player.NONE,
                Player.P1, Player.NONE, Player.NONE,
                Player.P1, Player.NONE, Player.NONE
            ]);
            expect(winHandler.handle(stubbedGame)).to.equal(true);

            stubbedGame.stub("fields", [
                Player.P2, Player.NONE, Player.NONE,
                Player.P2, Player.NONE, Player.NONE,
                Player.P2, Player.NONE, Player.NONE
            ]);
            expect(winHandler.handle(stubbedGame)).to.equal(true);

        });
        
        Rhum.testCase("delegate request to WinCondHandler if game is not won by anybody", () => {
            
            stubbedGame.stub("fields", [
                Player.NONE, Player.NONE, Player.NONE,
                Player.NONE, Player.NONE, Player.NONE,
                Player.NONE, Player.NONE, Player.NONE
            ]);

            expect(mock.calls.handle).to.equal(0);
            winHandler.handle(stubbedGame);
            expect(mock.calls.handle).to.equal(1);

        });

    });

});

Rhum.run();