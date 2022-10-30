/** @type {import("..typings/phaser")} */

// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     pixelArt: true,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

// var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.spritesheet('player', 'assets/Knight/Run/Run-Sheet.png', { frameWidth: 64, frameHeight: 64 });
// }

// function create ()
// {
//     const mummyAnimation = this.anims.create({
//         key: 'walk',
//         frames: this.anims.generateFrameNumbers('player'),
//         frameRate: 6
//     });

//     this.cursors = this.input.keyboard.createCursorKeys();
    

//     const sprite = this.add.sprite(50, 300, 'player').setScale(4);

//     sprite.play({ key: 'walk', repeat: 10 });
// }

// function update () {

//     if (this.cursors.left.isDown) {
//         this.sprite.setScale(2);
//     }
// }
class Test extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload () 
    {
        this.load.spritesheet('player', 'assets/Knight/Run/Run-Sheet.png', { frameWidth: 64, frameHeight: 64 });
    }

    create () 
    {
        this.cameras.main.setBounds(0, 0, 3392, 100);

        const playerRunAnimation = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 6
        });


    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.player = this.add.sprite(400, 100, 'player');
        // this.ship = this.add.image(400, 100, 'ship').setAngle(90);
    
        // this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    
        this.cameras.main.setZoom(4);
    }

    update () 
    {

        if (this.cursors.left.isDown)
        {
            if (!this.player.anims.isPlaying) {
                this.player.play({ key: 'walk', repeat: 1 });
                this.player.flipX = true;
            }
            else if (this.player.anims.isPlaying && this.player.flipX == false) {
                this.player.flipX = true;
            }
            this.player.x -= 2.5;
        }
        else if (this.cursors.right.isDown)
        {
            if (!this.player.anims.isPlaying) {
                this.player.play({ key: 'walk', repeat: 1 });
                this.player.flipX = false;
            }
            else if (this.player.anims.isPlaying && this.player.flipX == true) {
                this.player.flipX = false;
            }
            this.player.x += 2.5;
        }
    
        if (this.cursors.up.isDown)
        {
            if (!this.player.anims.isPlaying) {
                this.player.play({ key: 'walk', repeat: 1 });
            }
            this.player.y -= 2.5;
        }
        else if (this.cursors.down.isDown)
        {
            if (!this.player.anims.isPlaying) {
                this.player.play({ key: 'walk', repeat: 1 });
            }
            this.player.y += 2.5;

        }

        if (this.player.anims.isPlaying && !this.cursors.up.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.player.stop();
            this.player.anims.restart();
        }
        
        

        
    }

    // updateDirect ()
    // {
    //     if (this.cursors.left.isDown)
    //     {
    //         this.player.x -= 2.5;
    //     }
    //     else if (this.cursors.right.isDown)
    //     {
    //         this.player.x += 2.5;
    //     }

    //     if (this.cursors.up.isDown && this.player.y > 0)
    //     {
    //         this.player.y -= 2.5;
    //     }
    //     else if (this.cursors.down.isDown && this.player.y < 240)
    //     {
    //         this.player.y += 2.5;
    //     }
    // }

}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [ Test ]
};

const game = new Phaser.Game(config);