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
        this.load.plugin('rexlineprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlineprogressplugin.min.js', true);
        this.load.plugin('rexclockplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclockplugin.min.js', true);
        this.load.image('sand_clock', '/assets/ui/sand_clock.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('button', '../assets/ui/button.png');
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


        this.upgradeHealth.on('pointerdown', function() {
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


        // Create time countup above
        this.timeText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.width / 3 - 400, '0:00', { font: '32px Arial', fill: '#ffffff' });
        this.timeText.setOrigin(0.5, 0.5);

        // Create the sand clock image above the time countup
        this.clockImage = this.add.image(this.sys.game.canvas.width / 2, 32, 'sand_clock');
        this.clockImage.setOrigin(0.5, 0.5);

        // Start the clock plugin 
        this.clock = this.plugins.get('rexclockplugin').add(this);
        this.clock.start();

        // Add the health bar at the bottom
        this.healthBar = this.add.rexLineProgress(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 325, 500, 20, 0xFF0000, 0.5, {    
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
            },
        });
        this.xpBar.depth = 1;

        // Add the level text
        this.levelText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.width / 3 + 160, 'Lvl. 1', { font: '18px Arial', fill: '#ffffff' });
        this.levelText.setOrigin(0.5, 0.5);
        this.levelText.depth = 1;
    }

    update() {
        // Rotate the sand clock image
        this.clockImage.setAngle(Math.round(this.clock.now / 50) % 360);

        // 
        this.timeText.setText(formatTime(Math.round(this.clock.now / 1000)));
        //this.timeText.setText("00:" + Math.round(this.clock.now / 1000));

        // Check for level up
        // if (this.xpBar.value == 1) {
        //     this.xpBar.value = 0;
        //     this.levelText.text = "Lvl. " + (parseInt(this.levelText.text.substring(4)) + 1);
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