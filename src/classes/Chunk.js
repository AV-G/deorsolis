import { Tile } from "./Tile.js";
export class Chunk {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.tiles = this.scene.add.group()
        this.isLoaded = false;
    }

    unload() {
        if (this.isLoaded) {
            this.tiles.clear(true, true);
            this.isLoaded = false;
        }
    }

    load() {
        if (!this.isLoaded) {
            for (var x = 0; x < this.scene.chunkSize; x++) {
                for (var y = 0; y < this.scene.chunkSize; y++) {
                    var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                    var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

                    var perlinValue = noise.perlin2(tileX / 100, tileY / 100);
                    var key = "";
                    if (perlinValue < 0.2) {
                        this.tiles.add(new Tile(this.scene, tileX, tileY, "grassTile1"));
                    }
                    else if (perlinValue >= 0.2 && perlinValue < 0.3) {
                        this.tiles.add(new Tile(this.scene, tileX, tileY, "grassTile2"));
                    }
                    else if (perlinValue >= 0.3) {
                        this.tiles.add(new Tile(this.scene, tileX, tileY, "dirtOnGrassTile"));
                    }

                    this.isLoaded = true;
                }
            }
        }
    }


}