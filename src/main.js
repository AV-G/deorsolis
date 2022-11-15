import { LoadScene } from "./scenes/LoadScene.js";
import { StageScene } from "./scenes/StageScene.js";
import { Tile } from "./classes/Tile.js";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // you can find another types in Phaser.Scale.ScaleModeType: RESIZE | FIT | ENVELOP ...
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ LoadScene, StageScene ]
};



const game = new Phaser.Game(config);
