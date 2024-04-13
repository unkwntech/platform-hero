import { Floor } from "@/actors/floor";
import Objective from "@/actors/objective";
import { Player } from "@/actors/player";
import { Resources } from "@/resources";
import { Actor, Engine, Font, Scene, Text } from "excalibur";

/**
 * Managed scene
 */
export class LevelOne extends Scene {
    public player: Player;
    public time: Text;
    public onInitialize(engine: Engine) {
        //Create Floor
        this.player = new Player(15, 300);
        const floor = new Floor(0, 400, 6, 1);
        const platform = new Floor(64 * 6, 350, 7, 1);
        const startline = new Objective(
            "StartLine",
            75,
            368,
            Resources.StartLine
        );
        const finishLine = new Objective(
            "FinishLine",
            600,
            318,
            Resources.FinishLine
        );

        this.time = new Text({
            text: "Time: 0.000",
            font: new Font({
                size: 24,
            }),
        });
        const score = new Actor({
            x: engine.halfDrawWidth,
            y: 15,
            width: 130,
            height: this.time.height,
        });

        score.graphics.use(this.time);

        this.add(this.player);
        this.add(score);
        this.add(floor);
        this.add(platform);
        this.add(startline);
        this.add(finishLine);
    }
    public onPreUpdate(engine: Engine<any>, delta: number): void {
        if (this.player.isStarted && !this.player.isCompelted) {
            this.time.text = `Time: ${
                (Date.now() - this.player.startTime) / 1000
            }`;
        }
    }
    public onActivate() {}
    public onDeactivate() {}
}
