import { CST } from "../CST.js";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }

    preload() {
        // UI
        this.load.image('background', '../assets/ui/title_screen.png');
        this.load.image('uiAtlas', '../assets/ui/gui.png');
        this.load.image('button', '../assets/ui/buttonDefault.png');
        this.load.image('buttonHover', '../assets/ui/buttonHover.png');
        this.load.image('buttonPressed', '../assets/ui/buttonPressed.png');
        this.load.image('menuContainerTop', '../assets/ui/menuContainerTop.png');
        this.load.image('menuContainerMiddle', '../assets/ui/menuContainerMiddle.png');
        this.load.image('menuContainerBottom', '../assets/ui/menuContainerBottom.png');
        this.load.image('infoContainer', '../assets/ui/infoContainer.png');
        this.load.image('itemContainer', '../assets/ui/itemButton.png');
        this.load.image('itemContainerHover', '../assets/ui/itemButtonHover.png');
        this.load.image('lock', '../assets/ui/lock.png');
        this.load.image('arrowButton', '../assets/ui/arrowButton.png');
        this.load.image('upgradeContainer', '../assets/ui/upgradeBackground.png');

        // Audio
        this.load.audio('click', '../assets/sounds/effects/click.wav');
        this.load.audio('menuMusic', '../assets/sounds/music/menuMusic.mp3');

        // Font
        this.loadFont('minimalPixel', '../assets/fonts/MinimalPixel.ttf');
        
    }

    // Font loader function
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }

    showMainMenu() {
        this.mainMenuComponents.forEach((component) => {
            component.setVisible(true);
        });
        // this.titleText.setVisible(true);
        // this.menuContainerTop.setVisible(true);
        // this.menuContainerMiddle.setVisible(true);
        // this.menuContainerMiddle2.setVisible(true);
        // this.menuContainerMiddle3.setVisible(true);
        // this.menuContainerMiddle4.setVisible(true);
        // this.menuContainerMiddle5.setVisible(true);;
        // this.menuContainerBottom.setVisible(true);
        // this.startGameButton.setVisible(true);
        // this.startGameButtonText.setVisible(true);
        // this.creditsButton.setVisible(true);
        // this.creditsButtonText.setVisible(true);
        // this.upgradeButton.setVisible(true);
        // this.upgradeButtonText.setVisible(true);
        // this.helpButton.setVisible(true);
        // this.helpButtonText.setVisible(true)
        // this.settingsButton.setVisible(true);
        // this.settingsButtonText.setVisible(true);
    }

    hideMainMenu() {
        this.mainMenuComponents.forEach((component) => {
            component.setVisible(false);
        });
        // this.titleText.setVisible(false);
        // this.menuContainerTop.setVisible(false);
        // this.menuContainerMiddle.setVisible(false);
        // this.menuContainerMiddle2.setVisible(false);
        // this.menuContainerMiddle3.setVisible(false);
        // this.menuContainerMiddle4.setVisible(false);
        // this.menuContainerMiddle5.setVisible(false);;
        // this.menuContainerBottom.setVisible(false);
        // this.startGameButton.setVisible(false);
        // this.startGameButtonText.setVisible(false);
        // this.upgradeButton.setVisible(false);
        // this.upgradeButtonText.setVisible(false);
        // this.helpButton.setVisible(false);
        // this.helpButtonText.setVisible(false)
        // this.creditsButton.setVisible(false);
        // this.creditsButtonText.setVisible(false);
        // this.settingsButton.setVisible(false);
        // this.settingsButtonText.setVisible(false);
    }

    showUpgradeMenu() {
        this.upgradeMenuComponents.forEach((component) => {
            component.setVisible(true);
        });
    }

    hideUpgradeMenu() {
        this.upgradeMenuComponents.forEach((component) => {
            component.setVisible(false);
        });
    }

    showCreditsMenu() {
        //this.infoContainer.setVisible(true);
        this.creditsMenuComponents.forEach((component) => {
            component.setVisible(true);
        });
    }

    hideCreditsMenu() {
        //this.infoContainer.setVisible(false);
        this.creditsMenuComponents.forEach((component) => {
            component.setVisible(false);
        });
    }

    showHelpMenu() {
        this.helpMenuComponents.forEach((component) => {
            component.setVisible(true);
        });
    }

    hideHelpMenu() {
        this.helpMenuComponents.forEach((component) => {
            component.setVisible(false);
        });
    }

    showSettingsMenu() {
        this.settingsMenuComponents.forEach((component) => {
            component.setVisible(true);
        });
    }

    hideSettingsMenu() {
        this.settingsMenuComponents.forEach((component) => {
            component.setVisible(false);
        });
    }

    setBackgroundImage() {
        const bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0);
        bg.setScale(this.cameras.main.width / bg.width, this.cameras.main.height / bg.height);
    }

    setMusic() {
        this.music = this.sound.add('menuMusic', { volume: 0.3, loop: true });
        this.music.play();
    }

    create() {
        this.setBackgroundImage();

        this.setMusic();

        //// UI FOR MAIN MENU
        this.mainMenuComponents = new Array();
        // Create title text
        let titleText = this.add.text(this.sys.game.canvas.width / 2, 200, 'DEORSOLIS', { font: '64px minimalPixel', fill: '#272B42', stroke: '#FFFFFF', strokeThickness: 10 });
        titleText.setOrigin(0.5, 0.5);
        this.mainMenuComponents.push(titleText);

        // Create container for buttons
        let menuContainerTop = this.add.image(this.sys.game.canvas.width / 2, 300 + 4, 'menuContainerTop');
        menuContainerTop.setScale(6);
        let menuContainerBottom = this.add.image(this.sys.game.canvas.width / 2, 700 - 4, 'menuContainerBottom');
        menuContainerBottom.setScale(6);
        this.mainMenuComponents.push(menuContainerTop, menuContainerBottom);
        for (var i = 400; i <= 600; i += 50) {
            let menuContainerMiddle = this.add.image(this.sys.game.canvas.width / 2, i, 'menuContainerMiddle');
            menuContainerMiddle.setScale(6);
            this.mainMenuComponents.push(menuContainerMiddle);            
        }
        
        // Create start game button with text
        let startGameButton = this.add.image(this.sys.game.canvas.width / 2, 350, 'button').setInteractive();
        let startGameButtonText = this.add.text(this.sys.game.canvas.width / 2, 350, 'Start Game', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        startGameButtonText.setOrigin(0.5, 0.5);
        startGameButton.setScale(4.5);
        startGameButton.on('pointerdown', function() {
            this.sound.play('click', { volume: 0.5, loop: false });
            this.scene.start(CST.SCENES.STAGE, {clock: this.clock });
            this.scene.start(CST.SCENES.UI, {clock: this.clock});
        }, this);
        startGameButton.on('pointerover', () => {
            startGameButton.setTexture('buttonHover');
        })
        startGameButton.on('pointerout', () => {
            startGameButton.setTexture('button');
        });
        this.mainMenuComponents.push(startGameButton, startGameButtonText);

        // Create upgrade button with text
        let upgradeButton = this.add.image(this.sys.game.canvas.width / 2, 425, 'button').setInteractive();
        let upgradeButtonText = this.add.text(this.sys.game.canvas.width / 2, 425, 'Upgrades', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        upgradeButtonText.setOrigin(0.5, 0.5);
        upgradeButton.setScale(4.5);
        upgradeButton.on('pointerover', () => {
            upgradeButton.setTexture('buttonHover');
        })
        upgradeButton.on('pointerout', () => {
            upgradeButton.setTexture('button');
        })

        //// UI FOR UPGRADE MENU
        this.upgradeMenuComponents = new Array();

        let upgradeContainer =  this.add.image(this.sys.game.canvas.width / 2, 400, 'infoContainer');
        upgradeContainer.setScale(20);
        this.upgradeMenuComponents.push(upgradeContainer);

        // List of items
        let unlocksGroup = new Array();
        let unlockLockGroup = new Array();

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                let lockedItem = this.add.image(300 + (i * 200), 260 + (j * 150), 'itemContainer').setInteractive();
                lockedItem.setScale(10);
                lockedItem.on('pointerover', () => {
                    lockedItem.setTexture('itemContainerHover');
                    console.log("test");
                });
                lockedItem.on('pointerout', () => {
                    lockedItem.setTexture('itemContainer');
                });
                let lock = this.add.image(300 + (i * 200), 250 + (j * 150), 'lock');
                lock.setScale(9);
        
                unlocksGroup.push(lockedItem);
                unlockLockGroup.push(lock);
                this.upgradeMenuComponents.push(lockedItem, lock);
            }
        }
        let backButton = this.add.image(this.sys.game.canvas.width / 2, 675, 'button').setInteractive();
        backButton.setScale(4.5);
        backButton.depth = 2;
        backButton.on('pointerdown', function() {
            this.sound.play('click', { volume: 0.5, loop: false });
            this.hideUpgradeMenu();
            this.hideHelpMenu();
            this.hideSettingsMenu();
            this.hideCreditsMenu();
            this.showMainMenu();
        }, this);
        let backButtonText = this.add.text(this.sys.game.canvas.width / 2, 675, 'Back', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        backButtonText.setOrigin(0.5, 0.5);
        backButtonText.depth = 2;
        backButton.on('pointerover', () => {
            backButton.setTexture('buttonHover');
        })
        backButton.on('pointerout', () => {
            backButton.setTexture('button');
        });
        this.upgradeMenuComponents.push(backButton, backButtonText);
        upgradeButton.on('pointerdown', () => {
            this.sound.play('click', { volume: 0.5, loop: false });
            this.hideMainMenu();
            this.showUpgradeMenu();
        });
        this.mainMenuComponents.push(upgradeButton, upgradeButtonText);
        this.hideUpgradeMenu();


        // Create credits button with text
        let creditsButton = this.add.image(this.sys.game.canvas.width / 2, 650, 'button').setInteractive();
        creditsButton.setScale(4.5);
        let creditsButtonText = this.add.text(this.sys.game.canvas.width / 2, 650, 'Credits', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        creditsButtonText.setOrigin(0.5, 0.5);
        creditsButton.on('pointerover', () => {
            creditsButton.setTexture('buttonHover');
        });
        creditsButton.on('pointerout', () => {
            creditsButton.setTexture('button');
        });

        //// UI FOR CREDITS MENU
        // Show info container
        let infoContainer = this.add.image(this.sys.game.canvas.width / 2, 400, 'infoContainer');
        infoContainer.setScale(20);

        // show credits text
        let creditsText = this.add.text(this.sys.game.canvas.width / 2, 400, 'Created and developed by Anže Vidmar\nTextures and assets:\nPixel Crawler by Anakolisa\nPixel Art GUI Elements by Mounir Tohami\nShikashi\'s Fantasy Icons Pack by cheekyinkling\nFree Pixel Effects Pack by CodeManu\nMinimalPixel font by Mounir Tohami\nSound effects created with jsfxr ', { font: '32px minimalPixel', fill: '#ffffff', align: 'center', stroke: '#000000', strokeThickness: 5 });
        creditsText.setOrigin(0.5, 0.5);
        creditsText.setLineSpacing(15);

        this.creditsMenuComponents = new Array();
        this.creditsMenuComponents.push(infoContainer, creditsText, backButton, backButtonText);

        creditsButton.on('pointerdown', () => {
            this.sound.play('click', { volume: 0.5, loop: false });
            this.hideMainMenu();
            this.showCreditsMenu();
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
        this.mainMenuComponents.push(creditsButton, creditsButtonText);
        this.hideCreditsMenu();
        
        // Create a help button with text
        let helpButton = this.add.image(this.sys.game.canvas.width / 2, 500, 'button').setInteractive();
        helpButton.setScale(4.5);
        let helpButtonText = this.add.text(this.sys.game.canvas.width / 2, 500, 'Help', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        helpButtonText.setOrigin(0.5, 0.5);
        helpButton.on('pointerover', () => {
            helpButton.setTexture('buttonHover');
        });
        helpButton.on('pointerout', () => {
            helpButton.setTexture('button');
        });

        // UI FOR HELP MENU
        this.helpMenuComponents = new Array();
        // Show info container

        // show credits text
        let helpText = this.add.text(this.sys.game.canvas.width / 2, 400, 'How to play:\nUse the WASD keys to move your character\nKill enemies by hitting them with your weapon\nCollect XP gems to increase your experience\nPick one upgrade or weapon when you level up\nAvoid getting hit by enemies\nCollect as many rare coins each round\nRare coins can be used for permanent upgrades', { font: '32px minimalPixel', fill: '#ffffff', align: 'center', stroke: '#000000', strokeThickness: 5 });
        helpText.setOrigin(0.5, 0.5);
        helpText.setLineSpacing(15);
        this.helpMenuComponents.push(infoContainer, helpText, backButton, backButtonText);

        helpButton.on('pointerdown', () => {
            this.sound.play('click', { volume: 0.5, loop: false });
            this.hideMainMenu();
            this.showHelpMenu();
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
        this.mainMenuComponents.push(helpButton, helpButtonText);
        this.hideHelpMenu();

        // Create a settings button with text
        let settingsButton = this.add.image(this.sys.game.canvas.width / 2, 575, 'button').setInteractive();
        settingsButton.setScale(4.5);
        let settingsButtonText = this.add.text(this.sys.game.canvas.width / 2, 575, 'Settings', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
        settingsButtonText.setOrigin(0.5, 0.5);
        settingsButton.on('pointerover', () => {
            settingsButton.setTexture('buttonHover');
        });
        settingsButton.on('pointerout', () => {
            settingsButton.setTexture('button');
        });


        // UI FOR SETTINGS MENU
        this.settingsMenuComponents = new Array();
        // Create sound button
        let soundButton = this.add.image(this.sys.game.canvas.width / 2, 400, 'button').setInteractive();
        soundButton.setScale(4.5);
        soundButton.on('pointerdown', function() {
            if (JSON.parse(localStorage.getItem("soundSetting"))) {
                soundButtonText.setText('Sound: Off');
                localStorage.setItem("soundSetting", false);
                this.music.stop();
            }
            else {
                soundButtonText.setText('Sound: On');
                localStorage.setItem("soundSetting", true);
                this.music.play();
            }
        }, this);
        let soundButtonText;
        soundButton.on('pointerover', () => {
            soundButton.setTexture('buttonHover');
        })
        soundButton.on('pointerout', () => {
            soundButton.setTexture('button');
        })
        // Save the settings in local storage
        if (localStorage.getItem("soundSetting") !== null) {
            let value = JSON.parse(localStorage.getItem("soundSetting"));
            if (value) {
                soundButtonText = this.add.text(this.sys.game.canvas.width / 2, 400, 'Sound: On', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            }
            else {
                soundButtonText = this.add.text(this.sys.game.canvas.width / 2, 400, 'Sound: Off', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            }
        }
        else {
            soundButtonText = this.add.text(this.sys.game.canvas.width / 2, 400, 'Sound: On', { font: '32px minimalPixel', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 });
            localStorage.setItem("soundSetting", true);
        }
        soundButtonText.setOrigin(0.5, 0.5);

        this.settingsMenuComponents.push(soundButton, soundButtonText, backButton, backButtonText);
        this.hideSettingsMenu();

        settingsButton.on('pointerdown', () => {
            this.sound.play('click', { volume: 0.5, loop: false });
            this.hideMainMenu();
            this.showSettingsMenu();
        }, this);
        this.mainMenuComponents.push(settingsButton, settingsButtonText);

        // Show tutorial screen on first boot
        if (localStorage.getItem("newSession") === null) {
            this.helpButton.emit('pointerdown', this.helpButton.input.pointer);
            localStorage.setItem("newSession", true);
        }
        
        // // set up arrow key navigation for buttons
        // var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // var buttonArray = [startGameButton, creditsButton, settingsButton];
        // var currentSelectedButton = 0;
        // this.input.keyboard.on('keydown-UP', function(event) {
        //     console.log("epic");
        // if (currentSelectedButton > 0) {
        //     currentSelectedButton--;
        //     buttonArray[currentSelectedButton].setTint(0xaaaaaa);
        //     buttonArray[currentSelectedButton+1].setTint(0xffffff);
        // }
        // }, this);
        // this.input.keyboard.on('keydown-DOWN', function(event) {
        // if (currentSelectedButton < buttonArray.length-1) {
        //     currentSelectedButton++;
        //     buttonArray[currentSelectedButton].setTint(0xaaaaaa);
        //     buttonArray[currentSelectedButton-1].setTint(0xffffff);
        // }
        // }, this);
        // this.input.keyboard.on('keydown-ENTER', function(event) {
        // buttonArray[currentSelectedButton].emit('pointerdown');
        // }, this);
    }
}