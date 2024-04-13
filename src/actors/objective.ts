import {
    Actor,
    CollisionType,
    Color,
    ImageSource,
    PostCollisionEvent,
    Vector,
    vec,
} from "excalibur";
import { Player } from "./player";

export default class Objective extends Actor {
    private image: ImageSource;
    public name: string;

    constructor(name: string, x: number, y: number, image: ImageSource) {
        super({
            name: name,
            scale: new Vector(1.5, 1.5),
            pos: vec(x, y),
            width: 46,
            height: 42,
            color: new Color(255, 255, 255),
            collisionType: CollisionType.Passive,
        });
        this.image = image;
        this.name = name;
    }

    onInitialize() {
        this.graphics.use(this.image.toSprite());

        //setup collisions
        this.on("precollision", this.onPostCollision);
    }

    public onPostCollision(event: PostCollisionEvent) {
        if (!(event.other instanceof Player)) return;

        event.other.CrossedObjective(event.target.name);
    }
}
