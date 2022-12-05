class Menu extends Phaser.Scene {

    constructor() {
        super({key: 'Menu', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload() {

    }

    create() {
        this.text = this.add.text(this.CONFIG.centerX, this.CONFIG.centerY, 'Menu').setColor("#000000");
        this.text.setOrigin(0.5);
    }
}
