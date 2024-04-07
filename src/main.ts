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

    let char = await Character.fromJSON(
        //"http://localhost:8080/assets/catset/spritesheets/cat01.json",
        "http://localhost:8080/assets/default_stickman/default_stickman.json",
        CharacterStates.Idle
    );

    char.animationSpeed = 0.1666;
    char.play();
    char.anchor.set(0.5, 0.5);
    char.scale = 1;
    char.rotation = 0;
    char.x = app.screen.width / 2;
    char.y = app.screen.height / 2;
    app.stage.addChild(char);

    //#endregion

    app.ticker.add((t) => {
        console.log(controller.keys);
        let s = char.State;

        if (
            s === CharacterStates.Jumping &&
            char.FramesRemainingInAnimation >= 0
        ) {
            console.log("STILL JUMPING");
            return;
        }

        // Update character's state based on the controller's input.
        if (controller.keys.left.pressed || controller.keys.right.pressed)
            char.State = CharacterStates.Walking;
        else if (
            controller.keys.left.doubleTap ||
            controller.keys.right.doubleTap
        )
            char.State = CharacterStates.Running;
        else if (controller.keys.space.pressed)
            char.State = CharacterStates.Jumping;
        else char.State = CharacterStates.Idle;

        console.log(char.State);

        if (s != char.State) {
            console.log("STATE CHANGE");
            //cat.textures = cat.Animations[cat.State];
            char.SetAnimation(char.State);
            char.play();
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

// Calculates the results of a collision, allowing us to give an impulse that
// shoves objects apart
function collisionResponse<T extends Container>(object1: T, object2: T) {
    // if (!object1 || !object2) {
    //     return new Point(0);
    // }
    // const vCollision = new Point(object2.x - object1.x, object2.y - object1.y);
    // const distance = Math.sqrt(
    //     (object2.x - object1.x) * (object2.x - object1.x) +
    //         (object2.y - object1.y) * (object2.y - object1.y)
    // );
    // const vCollisionNorm = new Point(
    //     vCollision.x / distance,
    //     vCollision.y / distance
    // );
    // const vRelativeVelocity = new Point(
    //     object1.acceleration.x - object2.acceleration.x,
    //     object1.acceleration.y - object2.acceleration.y
    // );
    // const speed =
    //     vRelativeVelocity.x * vCollisionNorm.x +
    //     vRelativeVelocity.y * vCollisionNorm.y;
    // const impulse = (impulsePower * speed) / (object1.mass + object2.mass);
    // return new Point(impulse * vCollisionNorm.x, impulse * vCollisionNorm.y);
}

// Calculate the distance between two given points
function distanceBetweenTwoPoints<T extends { x: number; y: number }>(
    p1: T,
    p2: T
) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}
