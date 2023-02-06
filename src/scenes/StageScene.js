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

        this.physics.world.setFPS(120);
        // Player animations
        this.load.spritesheet('playerRun', '/assets/heroes/knight/Run-Sheet-two.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerIdle', '/assets/heroes/knight/Idle-Sheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerWeapon', '/assets/weapons/Hands.png', { frameWidth: 16, frameHeight: 16});

        this.load.image('floor', '/assets/environments/dungeon/Tiles.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('demoTile', '/assets/environments/dungeon/Tile.png', {frameWidth: 16, frameHeight: 16});

        // Enemy animations
        this.load.spritesheet('orcNormalRun', '/assets/enemies/orc/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('orcShamanRun', '/assets/enemies/orc_rogue/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('orcWarriorRun', '/assets/enemies/orc_shaman/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonNormalRun', '/assets/enemies/skeleton/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonRogueRun', '/assets/enemies/skeleton_rogue/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonMageRun', '/assets/enemies/skeleton_mage/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonWarriorRun', '/assets/enemies/skeleton_warrior/Run-Sheet.png', {frameWidth: 64, frameHeight: 64});


        // Weapons
        this.load.spritesheet('radialAura', '/assets/effects/radius_spritesheet.png', { frameWidth: 100, frameHeight: 100});

        // Items
        this.load.image('chicken', '/assets/items/chicken.png', {frameWidth: 16, frameHeight: 16});
        this.load.audio('pickup', '../assets/sounds/effects/powerUp.wav');
        this.load.image('xpGem', '/assets/items/xp_gem.png');
        this.load.image('model', '/assets/items/suzanne.obj')
    }
    
    create () 
    {
        // List of all enemies
        this.enemies = this.add.group();

        // Chunk definitions
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

        

        let radialAuraSprite = {
            key: 'radialAura',
            frames: this.anims.generateFrameNumbers('radialAura', {start: 0, end: 81}),
            frameRate: 60,
            repeat: -1,
        }; this.anims.create(radialAuraSprite);
        
        this.radialAura = this.physics.add.sprite(0, 0, radialAuraSprite);
        this.radialAura.anims.play("radialAura");
        this.radialAura.depth = 1;
        this.radialAura.setSize(64, 64);



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


        // Sprite character animations

        const playerIdleAnimation = {
            key: 'playerIdle',
            frames: this.anims.generateFrameNames('playerIdle'),
            frameRate: 4,
            repeat: -1
        }; this.anims.create(playerIdleAnimation);

        const playerRunAnimation = {
            key: 'playerRun',
            frames: [
                { key: 'playerRun', frame: 0 },
                { key: 'playerRun', frame: 2 },
                { key: 'playerRun', frame: 4 },
                { key: 'playerRun', frame: 6 },
                { key: 'playerRun', frame: 8},
                { key: 'playerRun', frame: 10},
            ],
            frameRate: 6,
            repeat: -1
        }; this.anims.create(playerRunAnimation);

        const orcNormalRunAnimation = {
            key: 'orcNormalRun',
            frames: this.anims.generateFrameNames('orcNormalRun'),
            frameRate: 6,
            repeat: -1
        }; this.anims.create(orcNormalRunAnimation);

        // var tileset = map.addTilesetImage('floor');
        // var layer = map.createLayer(0, tileset, 0, 0);
        // map.createLayer()
        // console.log(layer);
    
        this.cursors = this.input.keyboard.createCursorKeys();

        // Generate enemies
        for (var i = 0; i < 250; i++) {
            // Spawn it randomly
            let enemy = this.physics.add.sprite(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000));

            // Boilerplate variables
            enemy.body.setVelocity(0);
            enemy.depth = 1;
            enemy.anims.play('orcNormalRun');
            enemy.body.setSize(16, 32);
            enemy.body.setOffset(24, 32);

            // Stats and functions
            enemy.health = 50;
            var net = this;
            enemy.takeDamage = function(damage) {
                this.health -= damage;
                
                var dat = this;
                net.tweens.add({
                    targets: this,
                    alpha: 0.5,
                    duration: 100,
                    onComplete: function () {
                    net.tweens.add({
                        targets: dat,
                        alpha: 1,
                        duration: 100
                    });
                    }
                });
            }
            enemy.die = function(enemies) {
                //this.spawnItem(this.x, this.y);
                this.destroy();
            }
            this.enemies.add(enemy);
        }


        this.orc = this.physics.add.sprite(0, 0);
        this.orc.body.setOffset(16, 32);
        this.orc.anims.play('orcNormalRun');
        this.orc.depth = 1;
        
        this.player = this.physics.add.sprite(0, 0);
        this.player.xp = 0;
        //this.player.setColliderWorldBounds(true);
        this.player.anims.play('playerIdle');
        //this.player.body.setOffset(this.player.width / 2, this.player.height / 2);
        //this.player.setOrigin(0.5, 0.5);
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
        var xpGemThis = this;

        var spawnItem = function(x, y) {
            var xpGem = xpGemThis.physics.add.image(64, 64, 'xpGem');
            xpGem.depth = 1;
            xpGem.x = x;
            xpGem.y = y;
            xpGem.setOrigin(0.5, 0.5);
            xpGemThis.physics.add.overlap(xpGem, xpGemThis.player, function(gem, player) {
                gem.destroy();
            })
        }

        this.physics.add.overlap(this.radialAura, this.enemies.getChildren(), function (aura, enemy) {
            console.log("epic");
            enemy.takeDamage(1)
            if (enemy.health <= 0) {
                enemy.die();
                spawnItem(enemy.x, enemy.y);
            }
        })
        var that = this.enemies;
        var aura = this.radialAura;
        var net = this;
        this.time.addEvent({
            delay: 1000,
            callback: function() {
                that.getChildren().forEach(function (enemy) {
                    var enemyBounds = enemy.getBounds();
                    var auraBounds = aura.getBounds();
                    //if (Phaser.Geom.Intersects.RectangleToRectangle(enemyBounds, auraBounds)) {
                    if (net.physics.overlap(aura, enemy)) {

                        enemy.takeDamage(1);
        
                        // Check if the enemy has lost all of its health
                        if (enemy.health <= 0) {
                            enemy.die();
                            //spawnGem(enemy.x, enemy.y);
                        }
                    }
                });
            },
            loop: true
        })


    }

    followPlayer(enemy) {
        var distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, this.player.x, this.player.y);

        if (distance > 2) {
        var angle = Math.atan2(this.player.y - enemy.y, this.player.x - enemy.x);

        enemy.body.velocity.x = 50 * Math.cos(angle);
        enemy.body.velocity.y = 50 * Math.sin(angle);
        if (enemy.body.velocity.x < 0) {
            enemy.flipX = true;
        }
        else {
            enemy.flipX = false;
        }

        }
        else {
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y = 0;
        }
        
    }

    avoidOverlap(enemy1, enemy2) {
        var bounds1 = enemy1.getBounds();
        var bounds2 = enemy2.getBounds();
    
        if (Phaser.Geom.Intersects.RectangleToRectangle(bounds1, bounds2)) {
            var dx = enemy2.x - enemy1.x;
            var dy = enemy2.y - enemy1.y;
            var angle = Math.atan2(dy, dx);
            var dist = Math.sqrt(dx * dx + dy * dy);
            var velocity = dist / 50;
    
            enemy1.x -= velocity * Math.cos(angle);
            enemy1.y -= velocity * Math.sin(angle);
            enemy2.x += velocity * Math.cos(angle);
            enemy2.y += velocity * Math.sin(angle);
        }
        else {
            this.followPlayer(enemy1);
            this.followPlayer(enemy2);
        }

        
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

    dropItem(x, y) {

    }

    pickUpItem(item) {

    }

    update () 
    {

        this.enemies.getChildren().forEach(this.followPlayer, this);
        //this.enemies.getChildren().forEach(this.avoidOverlap, this);
        this.physics.overlap(this.enemies.getChildren(), this.enemies.getChildren(), this.avoidOverlap, null, this);
        //this.physics.seperate(this.enemies.getChildren(), this.enemies.getChildren(), null, null, this);
        //this.radial.x = this.player.x;
        //this.radial.y = this.player.y;
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
        // if (this.player.x > this.orc.x && this.player.y < this.orc.y) {
        //     this.orc.x += 1;
        //     this.orc.y -= 1;
        //     this.orc.flipX = false;
        // }
        // else if (this.player.x < this.orc.x && this.player.y < this.orc.y) {
        //     this.orc.x -= 1;
        //     this.orc.y -= 1;
        //     this.orc.flipX = true;

        // }
        // else if (this.player.x > this.orc.x && this.player.y > this.orc.y) {
        //     this.orc.x += 1;
        //     this.orc.y += 1;
        //     this.orc.flipX = false;
        // }
        // else if (this.player.x < this.orc.x && this.player.y > this.orc.y) {
        //     this.orc.x -= 1;
        //     this.orc.y += 1;
        //     this.orc.flipX = true;

        // }
        // else if(this.player.x > this.orc.x && this.player.y == this.orc.y) {
        //     this.orc.x += 1;
        //     this.orc.flipX = false;
        // }
        // else if (this.player.x < this.orc.x && this.player.y == this.orc.y) {
        //     this.orc.x -= 1;
        //     this.orc.flipX = true;

        // }
        // else if(this.player.x == this.orc.x && this.player.y < this.orc.y) {
        //     this.orc.y -= 1;
        // }
        // else if (this.player.x == this.orc.x && this.player.y > this.orc.y) {
        //     this.orc.y += 1;

        // }

        


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
        // if (this.cursors.left.isDown)
        // {
        //     if (this.player.anims.currentAnim.key == 'idle') {
        //         this.player.play('run');
        //     }
        //     this.player.flipX = true;
        //     this.player.x -= 2.5;
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     if (this.player.anims.currentAnim.key == 'idle') {
        //         this.player.play('run');
        //     }
        //     this.player.flipX = false;

        //     this.player.x += 2.5;
        // }
    
        // if (this.cursors.up.isDown)
        // {
        //     if (this.player.anims.currentAnim.key == 'idle') {
        //         this.player.play('run');
        //     }
        //     this.player.y -= 2.5;
        // }
        // else if (this.cursors.down.isDown)
        // {
        //     if (this.player.anims.currentAnim.key == 'idle') {
        //         this.player.play('run');
        //     }
        //     this.player.y += 2.5;

        // }
        this.player.setVelocity(0);
        this.radialAura.setVelocity(0);


        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.radialAura.setVelocityX(-160);
            if (this.player.anims.currentAnim.key == 'playerIdle') {
                this.player.play('playerRun');
            }
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.radialAura.setVelocityX(160);

            if (this.player.anims.currentAnim.key == 'playerIdle') {
                this.player.play('playerRun');
            }
            this.player.flipX = false;
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.radialAura.setVelocityY(-160);

            if (this.player.anims.currentAnim.key == 'playerIdle') {
                this.player.play('playerRun');
            }
          } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.radialAura.setVelocityY(160);

            if (this.player.anims.currentAnim.key == 'playerIdle') {
                this.player.play('playerRun');
            }
          }


        if (this.player.anims.currentAnim.key != 'playerIdle' && !this.cursors.up.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.player.play('playerIdle');
        }

        // if (this.chickenVisibility === true && (this.player.x >= this.chicken.x - 10 && this.player.x <= this.chicken.x + 10) && (this.player.y >= this.chicken.y - 10 && this.player.y <= this.chicken.y + 10)) {
        //     this.chicken.visible = false;
        //     this.chickenVisibility = false;
        //     this.sound.play('pickup', { volume: 0.5, loop: false });
        //     console.log(this.game.scene.getScene("UI").healthBar.addValue(0.1));
        // }

        // if (this.xpVisibility === true && (this.player.x >= this.xpGem.x - 10 && this.player.x <= this.xpGem.x + 10) && (this.player.y >= this.xpGem.y - 10 && this.player.y <= this.xpGem.y + 10)) {
        //     this.xpGem.visible = false;
        //     this.xpVisibility = false;
        //     this.sound.play('pickup', { volume: 0.5, loop: false });
        //     console.log(this.game.scene.getScene("UI").xpBar.addValue(1));
        // } 
        
    }
}

var map;
var text;
var sx = 0;
var mapWidth = 51;
var mapHeight = 37;
var distance = 0;
var tiles = [20];