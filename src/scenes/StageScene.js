import { CST } from "../CST.js";
import { Chunk } from "../classes/Chunk.js";
import { UIScene } from "./UIScene.js";
//import { Spawner } from "../classes/Spawner.js"


export class StageScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.STAGE
        })
    }

    init() {
        
    }

    preload () 
    {
        this.load.spritesheet('playerRun', '/assets/heroes/knight/Run-Sheet.png', { frameWidth: 64, frameHeight: 32 });
        this.load.spritesheet('playerIdle', '/assets/heroes/knight/Idle-Sheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerWeapon', '/assets/weapons/Hands.png', { frameWidth: 16, frameHeight: 16});
        this.load.image('floor', '/assets/environments/dungeon/Tiles.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('demoTile', '/assets/environments/dungeon/Tile.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('orcRun', '/assets/enemies/orc/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonRun', '/assets/enemies/skeleton/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonRogueRun', '/assets/enemies/skeleton_rogue/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('chicken', '/assets/items/chicken.png', {frameWidth: 16, frameHeight: 16});
        this.load.audio('pickup', '../assets/sounds/effects/powerUp.wav');
        this.load.spritesheet('radialAttack', '/assets/effects/radius_spritesheet.png', { frameWidth: 100, frameHeight: 100});
        this.load.image('xpGem', '/assets/items/xp_gem.png');
        this.load.image('model', '/assets/items/suzanne.obj')
    }
    
    create () 
    {

        this.model = this.add.sprite(0, 0, 'model');
        this.model.depth = 1;

        this.chunkSize = 16;
        this.tileSize = 16;
        this.chunks = [];
        this.xpVisibility = true;
        this.chickenVisibility = true;
        
        this.chicken = this.add.image(64, 64, 'chicken');
        this.chicken.depth = 1;
        this.chicken.x = 64;
        this.chicken.y = 64;
        this.chicken.visible = true;
        this.chicken.setOrigin(0.5, 0.5);

        this.xpGem = this.add.image(64, 64, 'xpGem');
        this.xpGem.depth = 1;
        this.xpGem.x = 32;
        this.xpGem.y = 32;
        this.xpGem.setOrigin(0.5, 0.5);

        let radialSprite = {
            key: 'radialSprite',
            frames: this.anims.generateFrameNumbers('radialAttack', {start: 0, end: 81}),
            frameRate: 60,
            repeat: -1,
        };

        this.anims.create(radialSprite);
        
        this.radial = this.add.sprite(radialSprite);
        this.radial.anims.play("radialSprite");
        this.radial.depth = 1;

        // var mapData = [];

        // for (var y = 0; y < mapHeight; y++)
        // {
        //     var row = [];


        //     for (var x = 0; x < mapWidth; x++)
        //     {
        //         var tileIndex = Phaser.Math.RND.weightedPick(tiles);
        //         row.push(tileIndex);
        //     }

        //     mapData.push(row);
        // }

        // map = this.make.tilemap({ data: mapData, tileWidth: 16, tileHeight: 16 });
        //this.cameras.main.setBounds(0, 0, 800, 600);
        // this.cameras.main.setBounds(0, 0, 999999, 999999);
        //this.bg = this.add.tileSprite(64, 0, 16, 16, 'floor');

        const idleConfig = {
            key: 'idle',
            frames: this.anims.generateFrameNames('playerIdle'),
            frameRate: 4,
            repeat: -1
        };

        this.anims.create(idleConfig);

        const runConfig = {
            key: 'run',
            frames: this.anims.generateFrameNames('playerRun'),
            frameRate: 6,
            repeat: -1
        };

        this.anims.create(runConfig);

        const orcRunConfig = {
            key: 'orcRun',
            frames: this.anims.generateFrameNames('orcRun'),
            frameRate: 6,
            repeat: -1
        };

        this.anims.create(orcRunConfig);

        // var tileset = map.addTilesetImage('floor');
        // var layer = map.createLayer(0, tileset, 0, 0);
        // map.createLayer()
        // console.log(layer);
    
        this.cursors = this.input.keyboard.createCursorKeys();

        this.orc = this.add.sprite(0, 0);
        this.orc.anims.play('orcRun');
        this.orc.depth = 1;
        this.orc.visible = true;

        this.orc2 = this.add.sprite(200, 200);
        this.orc2.anims.play('orcRun');
        this.orc2.depth = 1;
        this.orc2.visible = true;

        this.orc3 = this.add.sprite(200, 200);
        this.orc3.anims.play('orcRun');
        this.orc3.depth = 1;
        this.orc3.visible = true;

        this.orc4 = this.add.sprite(400, 500);
        this.orc4.anims.play('orcRun');
        this.orc4.depth = 1;
        this.orc4.visible = true;

        this.orc5 = this.add.sprite(300, 100);
        this.orc5.anims.play('orcRun');
        this.orc5.depth = 1;
        this.orc5.visible = true;

        
        this.player = this.physics.add.sprite(0, 0);
        this.player.anims.play('idle');
        // this.ship = this.add.image(400, 100, 'ship').setAngle(90);
    
        // this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.player);

        this.followPoint = new Phaser.Math.Vector2(
            this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
            this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
        );
        this.player.depth = 1;
        //this.player.setOrigin(0.5, 0.5);
        //this.physics.world.enable(this.player);
        //this.physics.add.collider(this.player, this.chicken);
        
        //this.time = new Phaser.Time.Clock(this);

    }

    getChunk(x, y) {
        var chunk = null;
        for (var i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].x == x && this.chunks[i].y == y) {
                chunk = this.chunks[i];
            }
        }
        return chunk;
    }

    update () 
    {
        this.radial.x = this.player.x;
        this.radial.y = this.player.y;
        //console.log(this.clock.now);
        this.followPoint = new Phaser.Math.Vector2(
            this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
            this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
        );

        var snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
        var snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

        snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
        snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

        for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
            for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
                var existingChunk = this.getChunk(x, y);
        
                if (existingChunk == null) {
                    var newChunk = new Chunk(this, x, y);
                    this.chunks.push(newChunk);
                }
            }
        }

        for (var i = 0; i < this.chunks.length; i++) {
            var chunk = this.chunks[i];
        
            if (Phaser.Math.Distance.Between(
                snappedChunkX,
                snappedChunkY,
                chunk.x,
                chunk.y
            ) < 3) {
                if (chunk !== null) {
                    chunk.load();
                }
            }
            else {
                if (chunk !== null) {
                    chunk.unload();
                }
            }
        }
        //this.orc.x += 0.06;
        if (this.player.x > this.orc.x && this.player.y < this.orc.y) {
            this.orc.x += 1;
            this.orc.y -= 1;
            this.orc.flipX = false;
        }
        else if (this.player.x < this.orc.x && this.player.y < this.orc.y) {
            this.orc.x -= 1;
            this.orc.y -= 1;
            this.orc.flipX = true;

        }
        else if (this.player.x > this.orc.x && this.player.y > this.orc.y) {
            this.orc.x += 1;
            this.orc.y += 1;
            this.orc.flipX = false;
        }
        else if (this.player.x < this.orc.x && this.player.y > this.orc.y) {
            this.orc.x -= 1;
            this.orc.y += 1;
            this.orc.flipX = true;

        }
        else if(this.player.x > this.orc.x && this.player.y == this.orc.y) {
            this.orc.x += 1;
            this.orc.flipX = false;
        }
        else if (this.player.x < this.orc.x && this.player.y == this.orc.y) {
            this.orc.x -= 1;
            this.orc.flipX = true;

        }
        else if(this.player.x == this.orc.x && this.player.y < this.orc.y) {
            this.orc.y -= 1;
        }
        else if (this.player.x == this.orc.x && this.player.y > this.orc.y) {
            this.orc.y += 1;

        }



        if (this.player.x > this.orc2.x && this.player.y < this.orc2.y) {
            this.orc2.x += 1;
            this.orc2.y -= 1;
            this.orc2.flipX = false;
        }
        else if (this.player.x < this.orc2.x && this.player.y < this.orc2.y) {
            this.orc2.x -= 1;
            this.orc2.y -= 1;
            this.orc2.flipX = true;

        }
        else if (this.player.x > this.orc2.x && this.player.y > this.orc2.y) {
            this.orc2.x += 1;
            this.orc2.y += 1;
            this.orc2.flipX = false;
        }
        else if (this.player.x < this.orc2.x && this.player.y > this.orc2.y) {
            this.orc2.x -= 1;
            this.orc2.y += 1;
            this.orc2.flipX = true;

        }
        else if(this.player.x > this.orc2.x && this.player.y == this.orc2.y) {
            this.orc2.x += 1;
            this.orc2.flipX = false;
        }
        else if (this.player.x < this.orc2.x && this.player.y == this.orc2.y) {
            this.orc2.x -= 1;
            this.orc2.flipX = true;

        }
        else if(this.player.x == this.orc2.x && this.player.y < this.orc2.y) {
            this.orc2.y -= 1;
        }
        else if (this.player.x == this.orc2.x && this.player.y > this.orc2.y) {
            this.orc2.y += 1;

        }

        if (this.player.x > this.orc3.x && this.player.y < this.orc3.y) {
            this.orc3.x += 1;
            this.orc3.y -= 1;
            this.orc3.flipX = false;
        }
        else if (this.player.x < this.orc3.x && this.player.y < this.orc3.y) {
            this.orc3.x -= 1;
            this.orc3.y -= 1;
            this.orc3.flipX = true;

        }
        else if (this.player.x > this.orc3.x && this.player.y > this.orc3.y) {
            this.orc3.x += 1;
            this.orc3.y += 1;
            this.orc3.flipX = false;
        }
        else if (this.player.x < this.orc3.x && this.player.y > this.orc3.y) {
            this.orc3.x -= 1;
            this.orc3.y += 1;
            this.orc3.flipX = true;

        }
        else if(this.player.x > this.orc3.x && this.player.y == this.orc3.y) {
            this.orc3.x += 1;
            this.orc3.flipX = false;
        }
        else if (this.player.x < this.orc3.x && this.player.y == this.orc3.y) {
            this.orc3.x -= 1;
            this.orc3.flipX = true;

        }
        else if(this.player.x == this.orc3.x && this.player.y < this.orc3.y) {
            this.orc3.y -= 1;
        }
        else if (this.player.x == this.orc3.x && this.player.y > this.orc3.y) {
            this.orc3.y += 1;

        }

        if (this.player.x > this.orc4.x && this.player.y < this.orc4.y) {
            this.orc4.x += 1;
            this.orc4.y -= 1;
            this.orc4.flipX = false;
        }
        else if (this.player.x < this.orc4.x && this.player.y < this.orc4.y) {
            this.orc4.x -= 1;
            this.orc4.y -= 1;
            this.orc4.flipX = true;

        }
        else if (this.player.x > this.orc4.x && this.player.y > this.orc4.y) {
            this.orc4.x += 1;
            this.orc4.y += 1;
            this.orc4.flipX = false;
        }
        else if (this.player.x < this.orc4.x && this.player.y > this.orc4.y) {
            this.orc4.x -= 1;
            this.orc4.y += 1;
            this.orc4.flipX = true;

        }
        else if(this.player.x > this.orc4.x && this.player.y == this.orc4.y) {
            this.orc4.x += 1;
            this.orc4.flipX = false;
        }
        else if (this.player.x < this.orc4.x && this.player.y == this.orc4.y) {
            this.orc4.x -= 1;
            this.orc4.flipX = true;

        }
        else if(this.player.x == this.orc4.x && this.player.y < this.orc4.y) {
            this.orc4.y -= 1;
        }
        else if (this.player.x == this.orc4.x && this.player.y > this.orc4.y) {
            this.orc4.y += 1;

        }

        if (this.player.x > this.orc5.x && this.player.y < this.orc5.y) {
            this.orc5.x += 1;
            this.orc5.y -= 1;
            this.orc5.flipX = false;
        }
        else if (this.player.x < this.orc5.x && this.player.y < this.orc5.y) {
            this.orc5.x -= 1;
            this.orc5.y -= 1;
            this.orc5.flipX = true;

        }
        else if (this.player.x > this.orc5.x && this.player.y > this.orc5.y) {
            this.orc5.x += 1;
            this.orc5.y += 1;
            this.orc5.flipX = false;
        }
        else if (this.player.x < this.orc5.x && this.player.y > this.orc5.y) {
            this.orc5.x -= 1;
            this.orc5.y += 1;
            this.orc5.flipX = true;

        }
        else if(this.player.x > this.orc5.x && this.player.y == this.orc5.y) {
            this.orc5.x += 1;
            this.orc5.flipX = false;
        }
        else if (this.player.x < this.orc5.x && this.player.y == this.orc5.y) {
            this.orc5.x -= 1;
            this.orc5.flipX = true;

        }
        else if(this.player.x == this.orc5.x && this.player.y < this.orc5.y) {
            this.orc5.y -= 1;
        }
        else if (this.player.x == this.orc5.x && this.player.y > this.orc5.y) {
            this.orc5.y += 1;

        }
        


        // sx += 4;

        // if (sx === 16)
        // {
        //     //  Reset and create new strip
    
        //     var tile;
        //     var prev;
    
        //     for (var y = 0; y < mapHeight; y++)
        //     {
        //         for (var x = 1; x < mapWidth; x++)
        //         {
        //             tile = map.getTileAt(x, y);
        //             prev = map.getTileAt(x - 1, y);
    
        //             prev.index = tile.index;
    
        //             if (x === mapWidth - 1)
        //             {
        //                 tile.index = Phaser.Math.RND.weightedPick(tiles);
        //             }
        //         }
        //     }
    
        //     sx = 0;
        // }



        // Player running animations
        // if (this.clock.now >= 1000 && this.clock.now <= 2000) {
        //     this.chicken.visible = true;
        // }
        if (this.cursors.left.isDown)
        {
            if (this.player.anims.currentAnim.key == 'idle') {
                this.player.play('run');
            }
            this.player.flipX = true;
            this.player.x -= 2.5;
        }
        else if (this.cursors.right.isDown)
        {
            if (this.player.anims.currentAnim.key == 'idle') {
                this.player.play('run');
            }
            this.player.flipX = false;

            this.player.x += 2.5;
        }
    
        if (this.cursors.up.isDown)
        {
            if (this.player.anims.currentAnim.key == 'idle') {
                this.player.play('run');
            }
            this.player.y -= 2.5;
        }
        else if (this.cursors.down.isDown)
        {
            if (this.player.anims.currentAnim.key == 'idle') {
                this.player.play('run');
            }
            this.player.y += 2.5;

        }

        if (this.player.anims.currentAnim.key != 'idle' && !this.cursors.up.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.player.play('idle');
        }

        if (this.chickenVisibility === true && (this.player.x >= this.chicken.x - 10 && this.player.x <= this.chicken.x + 10) && (this.player.y >= this.chicken.y - 10 && this.player.y <= this.chicken.y + 10)) {
            this.chicken.visible = false;
            this.chickenVisibility = false;
            this.sound.play('pickup', { volume: 0.5, loop: false });
            console.log(this.game.scene.getScene("UI").healthBar.addValue(0.1));
        }

        if (this.xpVisibility === true && (this.player.x >= this.xpGem.x - 10 && this.player.x <= this.xpGem.x + 10) && (this.player.y >= this.xpGem.y - 10 && this.player.y <= this.xpGem.y + 10)) {
            this.xpGem.visible = false;
            this.xpVisibility = false;
            this.sound.play('pickup', { volume: 0.5, loop: false });
            console.log(this.game.scene.getScene("UI").xpBar.addValue(1));
        } 
        
    }
}

var map;
var text;
var sx = 0;
var mapWidth = 51;
var mapHeight = 37;
var distance = 0;
var tiles = [20];