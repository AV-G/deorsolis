import { CST } from "../CST.js";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }

    preload() {
        this.load.image('button', '../assets/ui/button.png');
        this.load.audio('click', '../assets/sounds/effects/click.wav');
        this.load.audio('menuMusic', '../assets/sounds/music/menuMusic.mp3');
        this.load.
    }
    create() {
        // create title text
        var titleText = this.add.text(400, 200, 'Deorsolis', { font: '64px Arial', fill: '#ffffff' });
        titleText.setOrigin(0.5, 0.5);
        this.sound.play('menuMusic', { volume: 0.3, loop: true });

         //create start game button
        var startGameButton = this.add.image(400, 300, 'button').setInteractive();
        startGameButton.on('pointerdown', function() {
            this.sound.play('click', { volume: 0.5, loop: false });
            this.scene.start(CST.SCENES.STAGE);
            this.scene.start(CST.SCENES.UI);
        }, this);
        var startGameButtonText = this.add.text(400, 300, 'Start Game', { font: '32px Arial', fill: '#ffffff' });
        startGameButtonText.setOrigin(0.5, 0.5);
        
    
        // // create credits button
        var creditsButton = this.add.image(400, 400, 'button').setInteractive();
        creditsButton.on('pointerdown', function() {
            // show credits text
            var creditsText = this.add.text(400, 300, 'Created and developed by Anže Vidmar', { font: '32px Arial', fill: '#ffffff' });
            creditsText.setOrigin(0.5, 0.5);

            // create back button
            var backButton = this.add.image(400, 500, 'button').setInteractive();
            backButton.on('pointerdown', function() {
                // hide back button and credits text
                backButton.setVisible(false);
                backButtonText.setVisible(false);
                creditsText.setVisible(false);

                // show start game and credits buttons
                startGameButton.setVisible(true);
                creditsButton.setVisible(true);
                startGameButtonText.setVisible(true);
                creditsButtonText.setVisible(true);
                settingsButton.setVisible(true);
            settingsButtonText.setVisible(true);
            }, this);
            var backButtonText = this.add.text(400, 500, 'Back', { font: '32px Arial', fill: '#ffffff' });
            backButtonText.setOrigin(0.5, 0.5);

            // hide start game and credits buttons
            startGameButton.setVisible(false);
            creditsButton.setVisible(false);
            startGameButtonText.setVisible(false);
            creditsButtonText.setVisible(false);
            settingsButton.setVisible(false);
            settingsButtonText.setVisible(false);

            // this.input.keyboard.on('keydown_ENTER', function(event) {
            // // show start game and credits buttons
            //     startGameButton.setVisible(true);
            //     creditsButton.setVisible(true);
            //     startGameButtonText.setVisible(true);
            //     creditsButtonText.setVisible(true);

            //     // hide credits text
            //     creditsText.setVisible(false);
            // }, this);
        }, this);
        var creditsButtonText = this.add.text(400, 400, 'Credits', { font: '32px Arial', fill: '#ffffff' });
        creditsButtonText.setOrigin(0.5, 0.5);

        // create a settings button
        var settingsButton = this.add.image(400, 500, 'button').setInteractive();
        settingsButton.on('pointerdown', function() {
            // create back button
            var backButton = this.add.image(400, 500, 'button').setInteractive();
            backButton.on('pointerdown', function() {
                // hide back button and credits text
                backButton.setVisible(false);
                backButtonText.setVisible(false);
                soundButton.setVisible(false);
                soundButtonText.setVisible(false);

                // show start game and credits buttons
                startGameButton.setVisible(true);
                creditsButton.setVisible(true);
                startGameButtonText.setVisible(true);
                creditsButtonText.setVisible(true);
                settingsButton.setVisible(true);
                settingsButtonText.setVisible(true);
                
            }, this);
            var backButtonText = this.add.text(400, 500, 'Back', { font: '32px Arial', fill: '#ffffff' });
            backButtonText.setOrigin(0.5, 0.5);

            // create sound button
            var soundButton = this.add.image(400, 400, 'button').setInteractive();
            soundButton.on('pointerdown', function() {
                if (JSON.parse(localStorage.getItem("soundSetting"))) {
                    soundButtonText.setText('Sound: Off');
                    localStorage.setItem("soundSetting", false);
                }
                else {
                    soundButtonText.setText('Sound: On');
                    localStorage.setItem("soundSetting", true);
                }
            }, this);
            var soundButtonText;

            if (localStorage.getItem("soundSetting") !== null) {
                let value = JSON.parse(localStorage.getItem("soundSetting"));
                if (value) {
                    soundButtonText = this.add.text(400, 400, 'Sound: On', { font: '32px Arial', fill: '#ffffff' });
                }
                else {
                    soundButtonText = this.add.text(400, 400, 'Sound: Off', { font: '32px Arial', fill: '#ffffff' });
                }
            }
            else {
                soundButtonText = this.add.text(400, 400, 'Sound: On', { font: '32px Arial', fill: '#ffffff' });
                localStorage.setItem("soundSetting", true);
            }
            soundButtonText.setOrigin(0.5, 0.5);


            // hide start game and credits buttons
            startGameButton.setVisible(false);
            creditsButton.setVisible(false);
            startGameButtonText.setVisible(false);
            creditsButtonText.setVisible(false);
            settingsButton.setVisible(false);
            settingsButtonText.setVisible(false);
        }, this);
        var settingsButtonText = this.add.text(400, 500, 'Settings', { font: '32px Arial', fill: '#ffffff' });
        settingsButtonText.setOrigin(0.5, 0.5);
        
        
        // // set up arrow key navigation for buttons
        var buttonArray = [startGameButton, creditsButton, settingsButton];
        var currentSelectedButton = 0;
        this.input.keyboard.on('keydown_UP', function(event) {
        if (currentSelectedButton > 0) {
            currentSelectedButton--;
            buttonArray[currentSelectedButton].setTint(0xaaaaaa);
            buttonArray[currentSelectedButton+1].setTint(0xffffff);
        }
        }, this);
        this.input.keyboard.on('keydown_DOWN', function(event) {
        if (currentSelectedButton < buttonArray.length-1) {
            currentSelectedButton++;
            buttonArray[currentSelectedButton].setTint(0xaaaaaa);
            buttonArray[currentSelectedButton-1].setTint(0xffffff);
        }
        }, this);
        this.input.keyboard.on('keydown_ENTER', function(event) {
        buttonArray[currentSelectedButton].emit('pointerdown');
        }, this);
    }

}