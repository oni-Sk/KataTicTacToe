import chai from "https://cdn.skypack.dev/chai@4.3.4?dts";
import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";

import { Game, Player } from "../main/game.ts"

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
            expect(game.getCurrentPlayer()).to.equal(Player.P1);
        });

    });

});

Rhum.run();