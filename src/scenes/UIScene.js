import { CST } from "../CST.js";

export class UIScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.UI
        })
    }

    init(data) {
        console.log(data);
    }

    preload() {
        this.load.plugin('rexlineprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlineprogressplugin.min.js', true);
    
    }

    create() {
        this.lineProgress = this.add.rexLineProgress(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 325, 500, 20, 0x7b5e57, 0.5, {    
            trackColor: "white",
            trackStrokeColor: "white",
            trackStrokeThickness: 5,
        
            skewX:0,
            rtl: false,
        
            easeValue: {
                duration: 0,
                ease: 'Linear'
            },
            valuechangeCallback: function(newValue, oldValue, lineProgress) {
            },
        });
        this.lineProgress.depth = 1;
    }

    update() {
    }

}