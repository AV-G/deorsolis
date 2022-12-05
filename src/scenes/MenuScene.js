import { CST } from "../CST.js";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }

    init(data) {
        console.log(data);
    }

    preload() {
        this.load.image('arrow', 'assets/ui/arrow.png');
    }

    create() {
        this.scene.start(CST.SCENES.MENU, "LoadScene");
    }

}