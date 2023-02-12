import { LoadScene } from "./scenes/LoadScene.js";
import { StageScene } from "./scenes/StageScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { UIScene } from "./scenes/UIScene.js";


let clock;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 800,
    scene: [ LoadScene, StageScene, MenuScene, UIScene ],
    pixelArt: true,
    plugins: {
        scene: [{
          plugin: Phaser.Plugins.Input,
          key: 'input',
          mapping: 'input'
        }]
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // you can find another types in Phaser.Scale.ScaleModeType: RESIZE | FIT | ENVELOP ...
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
    
};

const game = new Phaser.Game(config);
