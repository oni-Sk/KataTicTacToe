import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";
import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";

import { Game, Field, Turn } from "../main/game.ts"

Rhum.testPlan("game.test.ts", () => {

    const expect = chai.expect;

    Rhum.testSuite("Game initialized should", () => {

        const game = new Game();

        Rhum.testCase("contain 9 fields", () => {
            expect(game.getFields()).to.have.lengthOf(9);
        });
        
        Rhum.testCase("not be over", () => {
            expect(game.isNotOver()).to.equal(true);
        });

        Rhum.testCase("have player 1 as first player", () => {
            expect(game.getCurrentPlayer()).to.equal(Turn.PLAYER1);
        });

    });

    Rhum.testSuite("Game is over when", () => {

        Rhum.testCase("all fields are taken", () => {

            const stubbedGame = Rhum.stubbed(new Game());
            stubbedGame.stub("fields", new Array(9).fill(Field.PLAYER1));

            expect(stubbedGame.isNotOver()).to.equal(false);
        
        });

    });

});

Rhum.run();