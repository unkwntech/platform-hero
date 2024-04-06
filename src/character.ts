import { AnimatedSprite, Assets, FrameObject, Texture } from "pixi.js";

export class Character extends AnimatedSprite {
    public State: CharacterStates = CharacterStates.Idle;
    public Animations: { [key: string]: Texture[] } = {};

    private currentAnimationName: string = "";

    public constructor(
        textures: Texture[] | FrameObject[],
        autoUpdate: boolean = true
    ) {
        super(textures, autoUpdate);
    }

    public static async fromJSON(texture: string): Promise<Character> {
        const json = require("/assets/catset/spritesheets/cat01.json");

        const idle = await Assets.load(json.idle);

        const char = new Character(Object.values(idle.textures) as Texture[]);

        for (let [key, path] of Object.entries(json)) {
            char.Animations[key] = Object.values(
                (await Assets.load(path as string)).textures
            ) as Texture[];
        }

        return char;
    }
    // // Play the spine animation.
    // playAnimation(state: CharacterStates, loop = false) {
    //     // Skip if the animation is already playing.
    //     if (this.currentAnimationName === state) return;
    //     debugger;
    //     // Play the animation on main track instantly.
    //     this.textures = this.Animations[state];

    //     // Apply the animation's time scale (speed).
    //     //trackEntry.timeScale = 1;
    // }
    // public update() {
    //     if (this.State == CharacterStates.Running)
    //         this.textures = this.Animations[CharacterStates.Running];

    //     this.playAnimation(this.State);
    // }
}

export enum CharacterStates {
    Walking = "walking",
    Running = "running",
    Jumping = "jumping",
    Idle = "idle",
    Death = "death",
    Falling = "falling",
}
