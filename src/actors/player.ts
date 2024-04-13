import { Resources } from "@/resources";
import {
    Actor,
    Animation,
    CollisionType,
    Color,
    Engine,
    Keys,
    PostCollisionEvent,
    Side,
    SpriteSheet,
    Vector,
    range,
    vec,
} from "excalibur";

export class Player extends Actor {
    public OnGround = false;
    public Jumped = false;
    public HP = 1000;

    public startTime: number;
    public isStarted: boolean;
    public isCompelted: boolean;

    constructor(x: number, y: number) {
        super({
            name: "player",
            scale: new Vector(1.5, 1.5),
            pos: vec(x, y),
            width: 12,
            height: 32,
            color: new Color(255, 255, 255),
            collisionType: CollisionType.Active,
        });
    }

    public CrossedObjective(source: string) {
        if (!this.isStarted && source === "StartLine") {
            this.startTime = Date.now();
            this.isStarted = true;
        } else if (!this.isCompelted && source === "FinishLine") {
            //display time
            this.isCompelted = true;
            console.log(
                `COMPLETED IN ${(Date.now() - this.startTime) / 1000} SECONDS`
            );
        }
    }

    public onInitialize() {
        //setup graphics
        const idle = Animation.fromSpriteSheet(
            SpriteSheet.fromImageSource({
                image: Resources.IdleCharacter,
                grid: {
                    rows: 1,
                    columns: 4,
                    spriteHeight: 32,
                    spriteWidth: 32,
                },
            }),
            range(0, 3),
            200
        );
        const walking = Animation.fromSpriteSheet(
            SpriteSheet.fromImageSource({
                image: Resources.WalkCharacter,
                grid: {
                    rows: 1,
                    columns: 4,
                    spriteHeight: 32,
                    spriteWidth: 32,
                },
            }),
            range(0, 3),
            200
        );

        this.graphics.add("idle", idle);
        this.graphics.add("walking", walking);

        this.graphics.use("idle");

        //setup collisions
        this.on("postcollision", this.onPostCollision);
    }

    private onPostCollision(event: PostCollisionEvent) {
        // Bot has collided with it's Top of another collider
        if (event.side === Side.Bottom && event.other.name === "floor") {
            (event.target as Player).OnGround = true;
        }

        //this.graphics.use("idle");

        // // Bot has collided on the side, display hurt animation
        // if (
        //     event.side === Side.Left ||
        //     event.side === Side.Right // &&
        //     //event.other instanceof Baddie
        // ) {
        //     if (this.vel.x < 0) {
        //         this.graphics.use("hurtleft");
        //     }
        //     if (this.vel.x >= 0) {
        //         this.graphics.use("hurtright");
        //     }
        //     //Resources.hit.play(0.1);
        // }
    }

    public onPreUpdate(engine: Engine, delta: number) {
        this.vel.x = 0;
        if (
            (engine.input.keyboard.isHeld(Keys.Up) ||
                engine.input.keyboard.isHeld(Keys.Space)) &&
            this.OnGround
        ) {
            this.vel.y = -250;
            this.OnGround = false;
            this.graphics.use("walking");
        }

        if (
            engine.input.keyboard.isHeld(Keys.Right) ||
            engine.input.keyboard.isHeld(Keys.D)
        ) {
            this.vel.x = 150;
            this.graphics.use("walking");
            return;
        } else if (
            engine.input.keyboard.isHeld(Keys.Left) ||
            engine.input.keyboard.isHeld(Keys.A)
        ) {
            this.vel.x = -150;
            this.graphics.use("walking");
            return;
        }

        this.graphics.use("idle");
    }
}
