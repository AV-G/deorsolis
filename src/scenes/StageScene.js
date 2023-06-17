import { CST } from "../CST.js";
import { Chunk } from "../classes/Chunk.js";
import { UIScene } from "./UIScene.js";
import { Spawner } from "../classes/Spawner.js"


export class StageScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.STAGE
        })
    }

    init() {
        
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    spawner() {
        // Phase one 2 minutes: orcs, orc rogue
        if (this.game.scene.getScene("UI").clock.now >= 0 && this.game.scene.getScene("UI").clock.now <= 60000) {
            if (this.enemies.getChildren().length <= 75) {
                const selection = this.getRndInteger(0, 2);
                console.log(selection);
                let spawnX, spawnY;
                let side = Phaser.Math.Between(1, 4); // choose a random side of the screen to spawn the enemy
                if (side === 1) { // spawn above the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = -50;
                } else if (side === 2) { // spawn below the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = this.game.config.height + 50;
                } else if (side === 3) { // spawn to the left of the screen
                spawnX = -50;
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                } else { // spawn to the right of the screen
                spawnX = this.game.config.width + 50
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                }
                spawnX -= 400;
                spawnY -= 400;
                let enemy = this.physics.add.sprite(spawnX, spawnY);


                // Boilerplate variables
                enemy.body.setVelocity(0);
                enemy.depth = 1;
                enemy.body.setSize(16, 32);
                enemy.body.setOffset(24, 32);
                if (selection == 0) {
                    enemy.anims.play('orcShamanRun');
                    enemy.health = 75;
                }
                else {
                    enemy.anims.play('orcNormalRun');
                    enemy.health = 50;
                }

                // Stats and functions
                var net = this;
                enemy.tweening = false;
                enemy.takeDamage = function(damage) {
                    this.health -= damage;
                    if (!enemy.tweening) {
                        net.sound.play('hitEnemy', { volume: 0.3, loop: false });
                        enemy.tweening = true;
                    }
                    var dat = this;
                    net.tweens.add({
                        targets: this,
                        alpha: 0.5,
                        duration: 100,
                        onComplete: function () {
                        //enemy.tweening = false;
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
                    net.sound.play('killEnemy', { volume: 0.1, loop: false });
                    this.destroy();
                }
                this.enemies.add(enemy);
            }
        }                

        // Phase two 5 minutes:  orcs, orc rogue, skeleton
        if (this.game.scene.getScene("UI").clock.now >= 60000 && this.game.scene.getScene("UI").clock.now <= 180000) {
            if (this.enemies.getChildren().length <= 75) {
                const selection = this.getRndInteger(0, 4);
                console.log(selection);
                let spawnX, spawnY;
                let side = Phaser.Math.Between(1, 4); // choose a random side of the screen to spawn the enemy
                if (side === 1) { // spawn above the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = -50;
                } else if (side === 2) { // spawn below the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = this.game.config.height + 50;
                } else if (side === 3) { // spawn to the left of the screen
                spawnX = -50;
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                } else { // spawn to the right of the screen
                spawnX = this.game.config.width + 50
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                }

                spawnX -= 400;
                spawnY -= 400;
                let enemy = this.physics.add.sprite(spawnX, spawnY);


                // Boilerplate variables
                enemy.body.setVelocity(0);
                enemy.depth = 1;
                enemy.body.setSize(16, 32);
                enemy.body.setOffset(24, 32);
                if (selection == 0) {
                    enemy.anims.play('orcShamanRun');
                    enemy.health = 75;
                }
                else if (selection == 1) {
                    enemy.anims.play('orcNormalRun');
                    enemy.health = 50;
                }
                else if (selection == 2) {
                    enemy.anims.play('skeletonNormalRun');
                    enemy.health = 100;
                }
                else {
                    enemy.anims.play('skeletonRogueRun');
                    enemy.health = 100;
                }
                

                // Stats and functions
                var net = this;
                enemy.tweening = false;
                enemy.takeDamage = function(damage) {
                    this.health -= damage;
                    if (!enemy.tweening) {
                        net.sound.play('hitEnemy', { volume: 0.3, loop: false });
                        enemy.tweening = true;
                    }
                    var dat = this;
                    net.tweens.add({
                        targets: this,
                        alpha: 0.5,
                        duration: 100,
                        onComplete: function () {
                        //enemy.tweening = false;
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
                    net.sound.play('killEnemy', { volume: 0.1, loop: false });
                    this.destroy();
                }
                this.enemies.add(enemy);
            }
        }
        
        // Phase three 5 minutes: orcs, orc rogue, skeleton, orc shaman
        if (this.game.scene.getScene("UI").clock.now >= 180000 && this.game.scene.getScene("UI").clock.now <= 360000) {
            if (this.enemies.getChildren().length <= 75) {
                const selection = this.getRndInteger(0, 4);
                console.log(selection);
                let spawnX, spawnY;
                let side = Phaser.Math.Between(1, 4); // choose a random side of the screen to spawn the enemy
                if (side === 1) { // spawn above the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = -50;
                } else if (side === 2) { // spawn below the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = this.game.config.height + 50;
                } else if (side === 3) { // spawn to the left of the screen
                spawnX = -50;
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                } else { // spawn to the right of the screen
                spawnX = this.game.config.width + 50
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                }

                spawnX -= 400;
                spawnY -= 400;
                let enemy = this.physics.add.sprite(spawnX, spawnY);


                // Boilerplate variables
                enemy.body.setVelocity(0);
                enemy.depth = 1;
                enemy.body.setSize(16, 32);
                enemy.body.setOffset(24, 32);
                if (selection == 0) {
                    enemy.anims.play('skeletonNormalRun');
                    enemy.health = 75;
                }
                else if (selection == 1) {
                    enemy.anims.play('orcNormalRun');
                    enemy.health = 50;
                }
                else if (selection == 2) {
                    enemy.anims.play('skeletonMageRun');
                    enemy.health = 75;
                }
                else {
                    enemy.anims.play('skeletonRogueRun');
                    enemy.health = 100;
                }
                

                // Stats and functions
                var net = this;
                enemy.tweening = false;
                enemy.takeDamage = function(damage) {
                    this.health -= damage;
                    if (!enemy.tweening) {
                        net.sound.play('hitEnemy', { volume: 0.3, loop: false });
                        enemy.tweening = true;
                    }
                    var dat = this;
                    net.tweens.add({
                        targets: this,
                        alpha: 0.5,
                        duration: 100,
                        onComplete: function () {
                        //enemy.tweening = false;
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
                    net.sound.play('killEnemy', { volume: 0.1, loop: false });
                    this.destroy();
                }
                this.enemies.add(enemy);
            }
        }

        // Phase four 5 minutes: all orcs, skeleton, skeleton mage
        if (this.game.scene.getScene("UI").clock.now >= 360000 && this.game.scene.getScene("UI").clock.now <= 540000) {
            if (this.enemies.getChildren().length <= 75) {
                const selection = this.getRndInteger(0, 5);
                console.log(selection);
                let spawnX, spawnY;
                let side = Phaser.Math.Between(1, 4); // choose a random side of the screen to spawn the enemy
                if (side === 1) { // spawn above the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = -50;
                } else if (side === 2) { // spawn below the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = this.game.config.height + 50;
                } else if (side === 3) { // spawn to the left of the screen
                spawnX = -50;
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                } else { // spawn to the right of the screen
                spawnX = this.game.config.width + 50
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                }

                spawnX -= 400;
                spawnY -= 400;
                let enemy = this.physics.add.sprite(spawnX, spawnY);


                // Boilerplate variables
                enemy.body.setVelocity(0);
                enemy.depth = 1;
                enemy.body.setSize(16, 32);
                enemy.body.setOffset(24, 32);
                if (selection == 0) {
                    enemy.anims.play('skeletonNormalRun');
                    enemy.health = 75;
                }
                else if (selection == 1) {
                    enemy.anims.play('orcNormalRun');
                    enemy.health = 50;
                }
                else if (selection == 2) {
                    enemy.anims.play('skeletonMageRun');
                    enemy.health = 75;
                }
                else if (selection == 3){
                    enemy.anims.play('skeletonRogueRun');
                    enemy.health = 100;
                }
                else {
                    enemy.anims.play('skeletonWarriorRun');
                    enemy.health = 150;
                }
                

                // Stats and functions
                var net = this;
                enemy.tweening = false;
                enemy.takeDamage = function(damage) {
                    this.health -= damage;
                    if (!enemy.tweening) {
                        net.sound.play('hitEnemy', { volume: 0.3, loop: false });
                        enemy.tweening = true;
                    }
                    var dat = this;
                    net.tweens.add({
                        targets: this,
                        alpha: 0.5,
                        duration: 100,
                        onComplete: function () {
                        //enemy.tweening = false;
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
                    net.sound.play('killEnemy', { volume: 0.1, loop: false });
                    this.destroy();
                }
                this.enemies.add(enemy);
            }
        }

        // Phase five 3 minutes: all orcs, all skeletons
        if (this.game.scene.getScene("UI").clock.now >= 540000 && this.game.scene.getScene("UI").clock.now <= 600000) {
            if (this.enemies.getChildren().length <= 75) {
                const selection = this.getRndInteger(0, 3);
                console.log(selection);
                let spawnX, spawnY;
                let side = Phaser.Math.Between(1, 4); // choose a random side of the screen to spawn the enemy
                if (side === 1) { // spawn above the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = -50;
                } else if (side === 2) { // spawn below the screen
                spawnX = Phaser.Math.Between(-50, this.game.config.width + 50);
                spawnY = this.game.config.height + 50;
                } else if (side === 3) { // spawn to the left of the screen
                spawnX = -50;
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                } else { // spawn to the right of the screen
                spawnX = this.game.config.width + 50
                spawnY = Phaser.Math.Between(-50, this.game.config.height + 50);
                }

                spawnX -= 400;
                spawnY -= 400;
                let enemy = this.physics.add.sprite(spawnX, spawnY);


                // Boilerplate variables
                enemy.body.setVelocity(0);
                enemy.depth = 1;
                enemy.body.setSize(16, 32);
                enemy.body.setOffset(24, 32);
                if (selection == 0) {
                    enemy.anims.play('skeletonMageRun');
                    enemy.health = 100;
                }
                else if (selection == 1){
                    enemy.anims.play('skeletonRogueRun');
                    enemy.health = 125;
                }
                else {
                    enemy.anims.play('skeletonWarriorRun');
                    enemy.health = 200;
                }
                

                // Stats and functions
                var net = this;
                enemy.tweening = false;
                enemy.takeDamage = function(damage) {
                    this.health -= damage;
                    if (!enemy.tweening) {
                        net.sound.play('hitEnemy', { volume: 0.3, loop: false });
                        enemy.tweening = true;
                    }
                    var dat = this;
                    net.tweens.add({
                        targets: this,
                        alpha: 0.5,
                        duration: 100,
                        onComplete: function () {
                        //enemy.tweening = false;
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
                    net.sound.play('killEnemy', { volume: 0.1, loop: false });
                    this.destroy();
                }
                this.enemies.add(enemy);
            }
        }
    }

    unlockItem(key) {
        console.log(key);
    }

    preload () 
    {

        this.physics.world.setFPS(120);
        // Player animations
        this.load.spritesheet('playerRun', '/assets/heroes/knight/Run-Sheet-two.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerIdle', '/assets/heroes/knight/Idle-Sheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerWeapon', '/assets/weapons/Hands.png', { frameWidth: 16, frameHeight: 16});

        // Background assets
        this.load.image('floor', '/assets/environments/dungeon/Tiles.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('demoTile', '/assets/environments/dungeon/Tile.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('tiles', '/assets/environments/woods/Tiles.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('grassTile1', '/assets/environments/woods/grassTile1.png', {frameWidth: 48, frameHeight: 48});
        this.load.image('grassTile2', '/assets/environments/woods/grassTile2.png', {frameWidth: 48, frameHeight: 48});
        this.load.image('dirtOnGrassTile', '/assets/environments/woods/dirtOnGrassTile.png', {frameWidth: 48, frameHeight: 48});
        

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
        this.load.image('axe', '/assets/weapons/axe.png');
        this.load.image('blade', '/assets/weapons/blade.png');

        // Effects

        // Items
        this.load.image('chicken', '/assets/items/chicken.png', {frameWidth: 16, frameHeight: 16});
        this.load.audio('pickup', '../assets/sounds/effects/powerUp.wav');
        this.load.image('xpGem', '/assets/items/xp_gem.png');

        // Audio
        this.load.audio('click', '../assets/sounds/effects/click.wav');
        this.load.audio('menuMusic', '../assets/sounds/music/menuMusic.mp3');
        this.load.audio('hitPlayer', '../assets/sounds/effects/hitPlayer.wav');
        this.load.audio('hitEnemy', '../assets/sounds/effects/hitEnemy.wav');
        this.load.audio('killEnemy', '../assets/sounds/effects/killEnemy.wav');

        this.load.audio('pickupGem', '../assets/sounds/effects/pickupGem.wav');
        this.load.audio('levelUp', '../assets/sounds/effects/levelUp.wav');

    }
    
    create () 
    {

        // List of possible upgrades

        // List of all enemies
        this.enemies = this.add.group();

        // Chunk definitions
        this.chunkSize = 16;
        this.tileSize = 48;
        this.chunks = [];

        // Pause logic
        this.input.keyboard.on('keydown-ESC', () => {
            if (this.scene.isPaused()) {
                this.scene.resume();
            }
            else {
                console.log(this.game.scene);
                this.game.scene.getScene("UI").showPauseScreen();
                this.game.scene.getScene("UI").clock.pause();
                this.game.scene.getScene("UI").paused = true;
                this.scene.isPaused();
                this.scene.pause();
            }
        });

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


        let projectiles = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        })




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

        // var tileset = map.addTilesetImage('floor');
        // var layer = map.createLayer(0, tileset, 0, 0);
        // map.createLayer()
        // console.log(layer);

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
    
        const orcShamanRunAnimation = {
            key: 'orcShamanRun',
            frames: this.anims.generateFrameNames('orcShamanRun'),
            frameRate: 6,
            repeat: -1
        }; this.anims.create(orcShamanRunAnimation);
        this.cursors = this.input.keyboard.createCursorKeys();

        const orcWarriorRunAnimation = {
            key: 'orcWarriorRun',
            frames: this.anims.generateFrameNames('orcWarriorRun'),
            frameRate: 6,
            repeat: -1
        }; this.anims.create(orcWarriorRunAnimation);

        const skeletonNormalRunAnimation = {
            key: 'skeletonNormalRun',
            frames: this.anims.generateFrameNames('skeletonNormalRun'),
            frameRate: 6,
            repeat: -1
        }; this.anims.create(skeletonNormalRunAnimation);

        const skeletonRogueRunAnimation = {
            key: 'skeletonRogueRun',
            frames: this.anims.generateFrameNames('skeletonRogueRun'),
            frameRate: 6,
            repeat: -1
        }; this.anims.create(skeletonRogueRunAnimation);

        const skeletonMageRunAnimation = {
            key: 'skeletonMageRun',
            frames: this.anims.generateFrameNames('skeletonMageRun'),
            frameRate: 6,
            repeat: -1
        }; this.anims.create(skeletonMageRunAnimation);

        const skeletonWarriorRunAnimation = {
            key: 'skeletonWarriorRun',
            frames: this.anims.generateFrameNames('skeletonWarriorRun'),
            frameRate: 6,
            repeat: -1
        }; this.anims.create(skeletonWarriorRunAnimation);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Generate enemies
        // for (var i = 0; i < 250; i++) {
        //     // Spawn it randomly
        //     let enemy = this.physics.add.sprite(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000));

        //     // Boilerplate variables
        //     enemy.body.setVelocity(0);
        //     enemy.depth = 1;
        //     enemy.anims.play('orcShamanRun');
        //     enemy.body.setSize(16, 32);
        //     enemy.body.setOffset(24, 32);

        //     // Stats and functions
        //     enemy.health = 50;
        //     var net = this;
        //     enemy.takeDamage = function(damage) {
        //         this.health -= damage;
                
        //         var dat = this;
        //         net.tweens.add({
        //             targets: this,
        //             alpha: 0.5,
        //             duration: 100,
        //             onComplete: function () {
        //             net.tweens.add({
        //                 targets: dat,
        //                 alpha: 1,
        //                 duration: 100
        //             });
        //             }
        //         });
        //     }
        //     enemy.die = function(enemies) {
        //         //this.spawnItem(this.x, this.y);
        //         this.destroy();
        //     }
        //     this.enemies.add(enemy);
        // }

        // this.orc = this.physics.add.sprite(0, 0);
        // this.orc.body.setOffset(16, 32);
        // this.orc.anims.play('orcNormalRun');
        // this.orc.depth = 1;
        
        this.player = this.physics.add.sprite(0, 0);
        this.player.xp = 0;
        this.player.maxXp = 100;
        this.player.health = 1;
        this.player.maxHealth = 100;
        this.player.level = 1;
        this.player.speed = 1;
        this.player.lastThrownTime = Date.now();
        this.player.unlocks = new Array("Radial");

        this.player.setSize(16, this.player.height);
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

        // Items
        var xpGemThis = this;
        var spawnItem = function(x, y) {
            if (Math.random(1) <= 0.9999) {
                var xpGem = xpGemThis.physics.add.image(64, 64, 'xpGem');
                xpGem.depth = 1;
                xpGem.x = x;
                xpGem.y = y;
                xpGem.setOrigin(0.5, 0.5);
                xpGemThis.physics.add.overlap(xpGem, xpGemThis.player, function(gem, player) {
                    //Phaser.Scene.sound.play('pickupGem', { volume: 0.5, loop: false });
                    xpGemThis.sound.play('pickupGem', { volume: 0.2, loop: false });
                    gem.destroy();
                })
                xpGem.setScale(0.5);
                xpGem.setSize(0.5);
                xpGemThis.updateXp(10);
            }
            else {
                var chicken = xpGemThis.physics.add.image(64, 64, 'chicken');
                chicken.depth = 1;
                chicken.x = x;
                chicken.y = y;
                chicken.setOrigin(0.5, 0.5);
                xpGemThis.physics.add.overlap(chicken, xpGemThis.player, function(chicken, player) {
                    chicken.destroy();
                })
                xpGemThis.updateHealth(10);
            }
            
        }
        var immortal = false;
        this.physics.add.overlap(this.player, this.enemies.getChildren(), function (player, enemy) {
            if (immortal) {
                return;
            }
            xpGemThis.updateHealth(-5);
            if (player.health <= 0) {
                //player.die();
            }
            var that = this;
            immortal = true;
            xpGemThis.tweens.add({
                targets: player,
                alpha: 0.5,
                duration: 2000,
                onComplete: function () {
                    xpGemThis.tweens.add({
                        targets: player,
                        alpha: 1,
                        duration: 2000,
                        onComplete: function () {
                            immortal = false;
                        }
                    });
                }
            });
        });
            

        this.physics.add.overlap(this.radialAura, this.enemies.getChildren(), function (aura, enemy) {
            enemy.takeDamage(1);
            if (enemy.health <= 0) {
                enemy.die();
                spawnItem(enemy.x, enemy.y);
            }
        });
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

    throwProjectile() {
        console.log(Date.now())
        if (Date.now() - this.player.lastThrownTime > 1000) {
            let projectile = this.physics.add.image(this.player.x, this.player.y, 'blade');
            if (!this.player.flipX) {
                projectile.body.velocity.x = 300;
                projectile.rotation = -90;
            }
            else {
                projectile.body.velocity.x = -300;
                projectile.rotation = 45;
            }
            console.log(this.player.body.direction);
            projectile.damage = 10;
            //projectile.body.velocity.x = projectile.direction === "right" ? 300 : -300;
            //projectile.setColliderWorldBounds(true);
            this.physics.add.overlap(projectile, this.enemies.getChildren(), function(projectile, enemy) {
                enemy.takeDamage(50);
        
                // Check if the enemy has lost all of its health
                if (enemy.health <= 0) {
                    enemy.die();
                    //spawnGem(enemy.x, enemy.y);
                }
                projectile.destroy();
            })
            //projectile.setBounce(1, 1);
            this.player.lastThrownTime = Date.now();
        }
        
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

    updateHealth(value) {
        console.log(this.player.health);
        if (this.player.health + value >= 100) {
            this.player.health = 100;
        }
        else {
            this.player.health += value;
        }
        
        this.game.scene.getScene("UI").healthBar.setValue(this.player.health / 100);
        if (this.player.health <= 0) {
            this.game.scene.getScene("UI").showDeathScreen();
            this.game.scene.getScene("UI").deathCoinsValue.setText(Math.round(this.game.scene.getScene("UI").clock.now / 6000));
            if (JSON.parse(localStorage.getItem("gold"))) {
                localStorage.setItem("gold", +localStorage.getItem("gold") + Math.round(this.game.scene.getScene("UI").clock.now / 6000));
            }
            else {
                localStorage.setItem("gold", Math.round(this.game.scene.getScene("UI").clock.now / 6000));
            }
            this.game.scene.getScene("UI").clock.pause();
            this.scene.pause();
        }
    }

    updateXp(value) {
        this.player.xp += value
        if (this.player.xp + value >= this.player.maxXp) {
            this.player.xp = 0;
            this.player.level++;
            this.player.maxXp = Math.floor(this.player.maxXp * 1.5);
            this.game.scene.getScene("UI").showUpgradeMenu();
            this.game.scene.getScene("UI").clock.pause();
            this.sound.play('levelUp',  { volume: 0.2, loop: false })
            this.scene.pause();
        }
        else {
            this.player.xp += value;
        }
        this.game.scene.getScene("UI").xpBar.setValue(this.player.xp / this.player.maxXp);
        this.game.scene.getScene("UI").levelText.setText('Lvl. ' + this.player.level);
    }

    

    update () 
    {

        // Throwing knife
        if (Date.now() - this.player.lastThrownTime > 1000) {
            this.throwProjectile();
        }


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

        this.spawner();
        this.throwProjectile();

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

// var map;
// var text;
// var sx = 0;
// var mapWidth = 51;
// var mapHeight = 37;
// var distance = 0;
// var tiles = [20];