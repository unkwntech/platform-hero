import axios, { AxiosResponse } from "axios";
import { AnimatedSprite, Assets, Texture } from "pixi.js";

export class Character extends AnimatedSprite {
    public State: CharacterStates = CharacterStates.Idle;
    public Animations: { [key: string]: Texture[] } = {};

    private currentAnimationName: CharacterStates = CharacterStates.None;
    private _framesSinceLastAnimationChange: number = 0;
    private _framesRemainingInAnimation: number = 0;

    public constructor(
        state: CharacterStates = CharacterStates.None,
        animations: { [key: string]: Texture[] },
        autoUpdate: boolean = true
    ) {
        super(animations[state], autoUpdate);
        this.Animations = animations;
        //this.textures = animations[state];

        this.onFrameChange = (currentFrame: number) => {
            this._framesSinceLastAnimationChange++;
            this._framesRemainingInAnimation--;
        };
    }

    public static async fromJSON(
        texture: string,
        initialState: CharacterStates
    ): Promise<Character> {
        //const json = require(texture);
        return await axios.get(texture).then(async (results: AxiosResponse) => {
            const json = results.data;
            const animations: { [key: string]: Texture[] } = { none: [] };

            for (let [key, path] of Object.entries(json)) {
                animations[key] = Object.values(
                    (await Assets.load(path as string)).textures
                ) as Texture[];
            }

            return new Character(initialState, animations);
        });
    }

    public get FramesRemainingInAnimation() {
        return this._framesRemainingInAnimation;
    }

    public SetAnimation(name: CharacterStates) {
        if (!this.Animations[name] || this.Animations[name].length < 1) {
            //how to fail gracefully?
            console.error(`INVALID STATE, NO ANIMATION PRESENT FOR ${name}`);
            return;
        }

        this.currentAnimationName = name;
        this._framesSinceLastAnimationChange = 0;
        this._framesRemainingInAnimation = this.Animations[name].length;
        this.textures = this.Animations[name];
    }
}

export enum CharacterStates {
    Walking = "walking",
    Running = "running",
    Jumping = "jumping",
    Idle = "idle",
    Death = "death",
    Falling = "falling",
    None = "none",
}
