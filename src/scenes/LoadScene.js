import { CST } from "../CST.js"

let clock;
export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    init() {
    }

    preload() {
    }

    create() {
        // this.scene.start(CST.SCENES.STAGE);
        // this.scene.start(CST.SCENES.UI);
        this.scene.start(CST.SCENES.MENU);
    }

}