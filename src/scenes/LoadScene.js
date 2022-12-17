import { CST } from "../CST.js"

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    init() {
    }

    preload() {
        this.load.image('demoTile', '/assets/environments/dungeon/Tile.png', {frameWidth: 16, frameHeight: 16});

    }

    create() {
        this.scene.start(CST.SCENES.STAGE);
        this.add.image(0,0, "arrow").setDepth(2);
    }

}