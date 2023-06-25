import { CST } from "../CST.js";

export class UIScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.UI
        })
    }

    init(data) {
    }

    preload() {
        // this.load.plugin('rexlineprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlineprogressplugin.min.js', true);
        // this.load.plugin('rexclockplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclockplugin.min.js', true);
        this.load.plugin('rexlineprogressplugin', 'lib/rexlineprogressplugin.min.js', true);
        this.load.plugin('rexclockplugin', 'lib/rexclockplugin.min.js', true);
        this.load.image('sand_clock', 'assets/ui/sand_clock.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('button', 'assets/ui/button.png');
        this.load.image('buttonHover', 'assets/ui/buttonHover.png')
        this.load.image('menuContainerTop', 'assets/ui/menuContainerTop.png');
        this.load.image('menuContainerMiddle', 'assets/ui/menuContainerMiddle.png');
        this.load.image('menuContainerBottom', 'assets/ui/menuContainerBottom.png');
        this.load.image('gold', 'assets/ui/gold.png');

        this.load.audio('click', 'assets/sounds/effects/click.wav');

    }

    hideUpgradeMenu() {
        this.menuContainerTop.setVisible(false);
        this.menuContainerMiddle.setVisible(false);
        this.menuContainerMiddle2.setVisible(false);
        this.menuContainerMiddle3.setVisible(false);
        this.menuContainerBottom.setVisible(false);
        this.firstItem.setVisible(false);
        this.firstItemText.setVisible(false);
        this.secondItem.setVisible(false);
        this.secondItemText.setVisible(false);
        this.thirdItem.setVisible(false);
        this.thirdItemText.setVisible(false);
    }

    showUpgradeMenu() {
        if (this.uniqueValues.length > 0) {
            this.menuContainerTop.setVisible(true);
            this.menuContainerMiddle.setVisible(true);
            this.menuContainerMiddle2.setVisible(true);
            this.menuContainerMiddle3.setVisible(true);
            this.menuContainerBottom.setVisible(true);
            
            if (this.uniqueValues.length >= 1) {
                this.firstItem.setVisible(true);
                this.firstItemText.setVisible(true);
                this.firstItemText.text = this.uniqueValues[0];
            }
            if (this.uniqueValues.length >= 2) {
                this.secondItem.setVisible(true);
                this.secondItemText.setVisible(true);
                this.secondItemText.text = this.uniqueValues[1];
            }
            if (this.uniqueValues.length >= 3) {
                this.thirdItem.setVisible(true);
                this.thirdItemText.setVisible(true);
                this.thirdItemText.text = this.uniqueValues[2];
            }
            this.uniqueValues = new Array();
            for (let i = this.unlocks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.unlocks[i], this.unlocks[j]] = [this.unlocks[j], this.unlocks[i]];
            }
    
            this.uniqueValues = Array.from(new Set(this.unlocks)).slice(0, 3);
            this.uniqueValues.forEach((value) => {
                const index = this.unlocks.indexOf(value);
                if (index !== -1) {
                    this.unlocks.splice(index, 1);
                }
                console.log(value);
                console.log(this.unlocks);
            });
        }
        
    }


    showDeathScreen() {
        this.overlay.setVisible(true);
        this.deathText.setVisible(true);
        this.menuButton.setVisible(true);
        this.menuButtonText.setVisible(true);
        this.deathCoinsImage.setVisible(true);
        this.deathCoinsValue.setVisible(true);
        this.deathCoinsText.setVisible(true);
    }

    hideDeathScreen() {
        this.overlay.setVisible(false);
        this.deathText.setVisible(false);
        this.menuButton.setVisible(false);
        this.menuButtonText.setVisible(false);
        this.deathCoinsImage.setVisible(false);
        this.deathCoinsValue.setVisible(false);
        this.deathCoinsText.setVisible(false);
    }

    showPauseScreen() {
        this.overlay.setVisible(true);
        this.pauseText.setVisible(true);
        this.menuButton.setVisible(true);
        this.menuButtonText.setVisible(true);
    }

    hidePauseScreen() {
        this.overlay.setVisible(false);
        this.pauseText.setVisible(false);
        this.menuButton.setVisible(false);
        this.menuButtonText.setVisible(false);
    }

    showWinScreen() {
        this.overlay.setVisible(true);
        this.winText.setVisible(true);
        this.menuButton.setVisible(true);
        this.menuButtonText.setVisible(true);
    }

    hideWinScreen() {
        this.overlay.setVisible(false);
        this.winText.setVisible(false);
        this.menuButton.setVisible(false);
        this.menuButtonText.setVisible(false);
    }

    create() {
        // Create upgrade buttons
        this.upgradeHealth = this.add.image(this.sys.game.canvas.width / 2 + 200, 600, 'button').setInteractive();
        this.upgradeHealthText = this.add.text(this.sys.game.canvas.width / 2 + 200, 600, 'Health', { font: '32px Arial', fill: '#ffffff' });
        this.upgradeHealthText.setOrigin(0.5, 0.5);
        this.upgradeStrength = this.add.image(this.sys.game.canvas.width / 2 - 200, 600, 'button').setInteractive();
        this.upgradeStrengthText = this.add.text(this.sys.game.canvas.width / 2 - 200, 600, 'Strength', { font: '32px Arial', fill: '#ffffff' });
        this.upgradeStrengthText.setOrigin(0.5, 0.5);

        this.upgradeHealth.setVisible(false);
        this.upgradeHealthText.setVisible(false);
        this.upgradeStrengthText.setVisible(false);
        this.upgradeStrength.setVisible(false);

        this.menuContainerTop = this.add.image(this.sys.game.canvas.width / 2, 300 + 4, 'menuContainerTop');
        this.menuContainerTop.setScale(6);
        this.menuContainerMiddle = this.add.image(this.sys.game.canvas.width / 2, 400, 'menuContainerMiddle');
        this.menuContainerMiddle.setScale(6);
        this.menuContainerMiddle2 = this.add.image(this.sys.game.canvas.width / 2, 450, 'menuContainerMiddle');
        this.menuContainerMiddle2.setScale(6);
        this.menuContainerMiddle3 = this.add.image(this.sys.game.canvas.width / 2, 500, 'menuContainerMiddle');
        this.menuContainerMiddle3.setScale(6);
        this.menuContainerBottom = this.add.image(this.sys.game.canvas.width / 2, 550 - 4, 'menuContainerBottom');
        this.menuContainerBottom.setScale(6);

        // Main menu button
        this.menuButton = this.add.image(this.sys.game.canvas.width / 2, 425, 'button').setInteractive();
        this.menuButtonText = this.add.text(this.sys.game.canvas.width / 2, 425, 'Main Menu', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.menuButtonText.setOrigin(0.5, 0.5);
        this.menuButton.setScale(4.5);
        this.menuButton.on('pointerdown', () => {

            this.game.scene.getScene(CST.SCENES.MENU).music.stop();
            this.game.scene.getScene(CST.SCENES.MENU).scene.stop();
            this.sound.play('click', { volume: 0.5, loop: false });
            this.scene.start(CST.SCENES.MENU);
            this.game.scene.getScene("UI").scene.stop();
            this.game.scene.getScene("STAGE").scene.stop();
        }, this);
        this.menuButton.on('pointerover', () => {
            this.menuButton.setTexture('buttonHover');
        })
        this.menuButton.on('pointerout', () => {
            this.menuButton.setTexture('button');
        });
        this.menuButton.setVisible(false);
        this.menuButtonText.setVisible(false);

        this.menuButton.setDepth(3);
        this.menuButtonText.setDepth(3);

        // Create death screen
        this.deathText = this.add.text(this.sys.game.canvas.width / 2, 200, 'YOU PERISHED', { font: '64px minimalPixel', fill: '#97251F', stroke: '#FFFFFF', strokeThickness: 10 });
        this.deathText.setOrigin(0.5, 0.5);
        this.deathText.setVisible(false);
        this.deathText.setDepth(3);
        this.deathCoinsImage = this.add.image(this.sys.game.canvas.width / 2, 270, 'gold');
        this.deathCoinsImage.setOrigin(0.5, 0.5);
        this.deathCoinsImage.setDepth(3);
        this.deathCoinsImage.setVisible(false);
        this.deathCoinsValue = this.add.text(this.sys.game.canvas.width / 2, 310, '', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.deathCoinsValue.setDepth(3);
        this.deathCoinsValue.setOrigin(0.5, 0.5);
        this.deathCoinsValue.setVisible(false);
        this.deathCoinsValue.setAlign('left');
        this.deathCoinsText = this.add.text(this.sys.game.canvas.width / 2, 350, 'Gold Acquired', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.deathCoinsText.setDepth(3);
        this.deathCoinsText.setOrigin(0.5, 0.5);
        this.deathCoinsText.setVisible(false);


        // Create win screen
        this.winText = this.add.text(this.sys.game.canvas.width / 2, 200, 'YOU SURVIVED', { font: '64px minimalPixel', fill: '#2EB247', stroke: '#FFFFFF', strokeThickness: 10 });
        this.winText.setOrigin(0.5, 0.5);
        this.winText.setVisible(false);
        this.winText.setDepth(3);


        // Create pause screen 
        this.pauseText = this.add.text(this.sys.game.canvas.width / 2, 200, 'PAUSED', { font: '64px minimalPixel', fill: '#272B42', stroke: '#FFFFFF', strokeThickness: 10 });
        this.pauseText.setOrigin(0.5, 0.5);
        this.pauseText.setVisible(false);
        this.pauseText.setDepth(3);

        // Create overlay
        this.overlay = this.add.graphics().fillStyle(0x000000, 0.5).fillRect(0, 0, this.game.config.width, this.game.config.height);
        this.overlay.setDepth(2);
        this.overlay.setVisible(false);
        this.unlocks = ["Health", "Health", "Health", "Health", "Health", "Speed", "Speed","Speed","Speed","Speed", "Strength", "Strength", "Strength", "Radial", "Radial", "Radial", "Knife", "Knife", "Knife", "Knife", "Fireball", "Fireball", "Fireball", "Fireball"]
        //this.unlocks = ["Axe"]
        
        this.paused = false;

        for (let i = this.unlocks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.unlocks[i], this.unlocks[j]] = [this.unlocks[j], this.unlocks[i]];
        }

        this.uniqueValues = Array.from(new Set(this.unlocks)).slice(0, 3);
        this.uniqueValues.forEach((value) => {
            const index = this.unlocks.indexOf(value);
            if (index !== -1) {
                this.unlocks.splice(index, 1);
            }
            console.log(value);
            console.log(this.unlocks);
        });


        // for (let i = 0; i < 3; i++) {
        //     // get a random index
        //     const index = Math.floor(Math.random() * this.unlocks.length);
            
        //     // get the value at that index
        //     const value = this.unlocks[index];
            
        //     // add the value to the uniqueValues array if it hasn't already been added
        //     if (!this.uniqueValues.includes(value)) {
        //       this.uniqueValues.push(value);
        //     }
            
        //     // remove the value from the unlocks array
        //     this.unlocks.splice(index, 1);
        //   }
        // Create three empty upgrade buttons
        this.firstItem = this.add.image(this.sys.game.canvas.width / 2, 350, 'button').setInteractive();
        this.firstItemText = this.add.text(this.sys.game.canvas.width / 2, 350, 'Item 1', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.firstItemText.setOrigin(0.5, 0.5);
        this.firstItem.setScale(4.5);
        this.firstItem.on('pointerdown', () => {
            this.hideUpgradeMenu();
            this.sound.play('click', { volume: 0.5, loop: false });
            this.game.scene.getScene("STAGE").scene.resume();
            this.game.scene.getScene("STAGE").unlockItem(this.firstItemText.text);
            this.clock.resume();
        }, this);
        this.firstItem.on('pointerover', () => {
            this.firstItem.setTexture('buttonHover');
        })
        this.firstItem.on('pointerout', () => {
            this.firstItem.setTexture('button');
        })

        this.secondItem = this.add.image(this.sys.game.canvas.width / 2, 425, 'button').setInteractive();
        this.secondItemText = this.add.text(this.sys.game.canvas.width / 2, 425, 'Item 2', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.secondItemText.setOrigin(0.5, 0.5);
        this.secondItem.setScale(4.5);
        this.secondItem.on('pointerdown', () => {
            this.hideUpgradeMenu();
            this.sound.play('click', { volume: 0.5, loop: false });
            this.game.scene.getScene("STAGE").scene.resume();
            this.game.scene.getScene("STAGE").unlockItem(this.secondItemText.text);
            this.clock.resume();
        }, this);
        this.secondItem.on('pointerover', () => {
            this.secondItem.setTexture('buttonHover');
        })
        this.secondItem.on('pointerout', () => {
            this.secondItem.setTexture('button');
        })

        this.thirdItem = this.add.image(this.sys.game.canvas.width / 2, 500, 'button').setInteractive();
        this.thirdItemText = this.add.text(this.sys.game.canvas.width / 2, 500, 'Item 3', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.thirdItemText.setOrigin(0.5, 0.5);
        this.thirdItem.setScale(4.5);
        this.thirdItem.on('pointerdown', () => {
            this.hideUpgradeMenu();
            this.sound.play('click', { volume: 0.5, loop: false });
            this.game.scene.getScene("STAGE").scene.resume();
            this.game.scene.getScene("STAGE").unlockItem(this.thirdItemText.text);
            this.clock.resume();
        }, this);
        this.thirdItem.on('pointerover', () => {
            this.thirdItem.setTexture('buttonHover');
        })
        this.thirdItem.on('pointerout', () => {
            this.thirdItem.setTexture('button');
        })
        
        this.hideUpgradeMenu();


        this.upgradeHealth.on('pointerdown', () => {
            this.upgradeHealth.setVisible(false);
            this.upgradeHealthText.setVisible(false);
            this.upgradeStrengthText.setVisible(false);
            this.upgradeStrength.setVisible(false);
        }, this);
        this.upgradeStrength.on('pointerdown', function() {
            this.upgradeHealth.setVisible(false);
            this.upgradeHealthText.setVisible(false);
            this.upgradeStrengthText.setVisible(false);
            this.upgradeStrength.setVisible(false);
        }, this);

        // Pause logic
        this.input.keyboard.on('keydown-ESC', () => {
            if (this.game.scene.getScene("STAGE").scene.isPaused() && this.paused) {
                this.game.scene.getScene("STAGE").scene.resume();
                this.clock.resume();
                this.hidePauseScreen();
                this.paused = false;
            }
        });

        // Create time countup above
        this.timeText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.width / 3 - 300, '0:00', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.timeText.setOrigin(0.5, 0.5);

        // Create the sand clock image above the time countup
        this.clockImage = this.add.image(this.sys.game.canvas.width / 2, 50, 'sand_clock');
        this.clockImage.setOrigin(0.5, 0.5);

        // Start the clock plugin 
        this.clock = this.plugins.get('rexclockplugin').add(this);
        this.clock.start();

        // Add the health bar at the bottom
        this.healthBar = this.add.rexLineProgress(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 325, 500, 20, 0xFF0000, 1, {    
            trackColor: "white",
            trackStrokeColor: "white",
            trackStrokeThickness: 5,
        
            skewX:0,
            rtl: false,
        
            easeValue: {
                duration: 0,
                ease: 'Linear'
            },
            valuechangeCallback: function(newValue, oldValue, healthBar) {
            },
        });
        this.healthBar.depth = 1;

        // Add an experience bar above it
        this.xpBar = this.add.rexLineProgress(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 300, 500, 10, 0x3E98F9, 0.0, {    
            trackColor: "white",
            trackStrokeColor: "white",
            trackStrokeThickness: 5,
        
            skewX:0,
            rtl: false,
        
            easeValue: {
                duration: 0,
                ease: 'Linear'
            },
            valuechangeCallback: function(newValue, oldValue, xpBar) {
                //console.log(xpBar);
            },
        });
        this.xpBar.depth = 1;

        // Add the level text
        this.levelText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.width / 3 + 300, 'Lvl. 1', { font: '18px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        this.levelText.setOrigin(0.5, 0.5);
        this.levelText.depth = 1;
    }

    checkTime() {
        if (this.clock.now >= 600000) {
            this.game.scene.getScene("STAGE").scene.pause();
            this.showWinScreen();
        }
    }


    update() {
        // Rotate the sand clock image
        this.clockImage.setAngle(Math.round(this.clock.now / 50) % 360);

        // 
        this.timeText.setText(formatTime(Math.round(this.clock.now / 1000)));
        this.checkTime();
        //this.timeText.setText("00:" + Math.round(this.clock.now / 1000));

        // Check for level up
        if (this.xpBar.value == 1) {
            this.xpBar.value = 0;
            this.levelText.text = "Lvl. " + (parseInt(this.levelText.text.substring(4)) + 1);
        }

        if (this.healthBar.value == 0) {
            //console.log("you died");
        }
        //     
        //     this.upgradeHealth.setVisible(true);
        //     this.upgradeHealthText.setVisible(true);
        //     this.upgradeStrengthText.setVisible(true);
        //     this.upgradeStrength.setVisible(true);
        // }
        // console.log(this.xpBar.value);
    }

    

}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}