import { LoadScene } from "./scenes/LoadScene.js";
import { StageScene } from "./scenes/StageScene.js";


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [ LoadScene, StageScene ]
};



const game = new Phaser.Game(config);