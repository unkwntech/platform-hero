import { DisplayMode, Engine, Loader, SolverStrategy, vec } from "excalibur";
import { Player } from "./actors/player";
import { Resources } from "./resources";
import { LevelOne } from "./scenes/level-one/level-one";

/**
 * Managed game class
 */
class Game extends Engine {
    public player: Player;
    private levelOne: LevelOne;

    constructor() {
        super({
            displayMode: DisplayMode.FitScreen,
            physics: {
                enabled: true,
                gravity: vec(0, 500),
                solver: SolverStrategy.Arcade,
            },
        });
    }

    /*
    scenes
        *Main Menu
            *Map Maker
                ?Asset Managment
            *Map Selector
                *Map
                *Results
        ?Settings
    */

    public start() {
        // Create new scene with a player
        this.levelOne = new LevelOne();

        game.add("levelOne", this.levelOne);

        // Automatically load all default resources
        const loader = new Loader(Object.values(Resources));

        return super.start(loader);
    }
}

const game = new Game();
game.start().then(() => {
    game.goToScene("levelOne");
});
