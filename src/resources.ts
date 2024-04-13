import { ImageSource } from "excalibur";
import finishLine from "../assets/default_stickman/FinishLine.png";
import startLine from "../assets/default_stickman/StartLine.png";
import idleStickman from "../assets/default_stickman/default_stickman_idle.png";
import walkSitckman from "../assets/default_stickman/default_stickman_walk.png";
import floor from "../assets/default_stickman/floor.png";
import sword from "./images/sword.png";

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */

const Resources = {
    Sword: new ImageSource(sword),
    IdleCharacter: new ImageSource(idleStickman),
    WalkCharacter: new ImageSource(walkSitckman),
    Floor: new ImageSource(floor),
    StartLine: new ImageSource(startLine),
    FinishLine: new ImageSource(finishLine),
    //Damage: new Sound('/assets/default_stickman/sounds/damage.wav')
};

export { Resources };
