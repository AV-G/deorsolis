export class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, number) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0);
    }
}