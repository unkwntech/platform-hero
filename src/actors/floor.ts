import { Resources } from "@/resources";
import { TileMap, vec } from "excalibur";

export class Floor extends TileMap {
    public OnGround = false;
    public Jumped = false;
    public HP = 10;

    constructor(x: number, y: number, columns: number, rows: number) {
        const sprite = Resources.Floor.toSprite();
        super({
            name: "floor",
            pos: vec(x, y),
            tileWidth: 64,
            tileHeight: 64,
            columns: columns,
            rows: rows,
        });
        for (let tile of this.tiles) {
            tile.addGraphic(sprite);
            tile.solid = true;
        }
    }
}
