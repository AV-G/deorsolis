import { CST } from "../CST.js"
import { Tile } from "../classes/Tile.js";
import { MenuScene } from './MenuScene.js';


export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    init() {
    }

    preload() {
        this.load.image('demoTile', 'dist/assets/environment/dungeon/Tile.png', {frameWidth: 16, frameHeight: 16});

    }

    create() {
        this.scene.start(CST.SCENES.STAGE);
        this.add.image(0,0, "arrow").setDepth(2);


    }

}