import "@pixi/gif";
import { Application, Container } from "pixi.js";
import { Character, CharacterStates } from "./character";
import { Controller } from "./controller";

(async () => {
    const app = new Application();

    await app.init({
        background: "#660044",
        resizeTo: document.getElementsByTagName("body")[0],
    });

    document.body.appendChild(app.canvas);

    //#region load character

    const controller = new Controller();

    let cat = await Character.fromJSON(
        "/assets/catset/spritesheets/cat01.json"
    );

    cat.animationSpeed = 0.1666;
    cat.play();
    cat.anchor.set(0.5, 0.5);
    cat.scale = 1;
    cat.rotation = 0;
    cat.x = app.screen.width / 2;
    cat.y = app.screen.height / 2;
    app.stage.addChild(cat);

    //#endregion

    app.ticker.add((t) => {
        console.log(controller.keys);
        let s = cat.State;

        // Update character's state based on the controller's input.
        if (controller.keys.left.pressed || controller.keys.right.pressed)
            cat.State = CharacterStates.Walking;
        else if (
            controller.keys.left.doubleTap ||
            controller.keys.right.doubleTap
        )
            cat.State = CharacterStates.Running;
        else if (controller.keys.space.pressed)
            cat.State = CharacterStates.Jumping;
        else cat.State = CharacterStates.Idle;

        console.log(cat.State);

        if (s != cat.State) {
            console.log("STATE CHANGE");
            cat.textures = cat.Animations[cat.State];
            cat.play();
        }
    });
})();

// Test For Hit
// A basic AABB check between two different squares
function testForAABB<T extends Container>(object1: T, object2: T) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y < bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y
    );
}
