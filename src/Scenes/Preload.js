// also to be simultaneously run for keybinds

class Preload extends Phaser.Scene {
    constructor() {
        super("preloadScene");
    }

    // loading all interscene assets here
    preload() {
        console.log("start Preload Scene preload()");
        this.load.setPath('./assets/');
        // empty sprite for physics bounding boxes (because i can't think of a better way to do it)
        this.load.image("empty", "img/empty.png");

        // ------ (planned) visual assets ------
        // (todo remove 'planned' later lol)

        // planned assets to load:
// TODOOO CHANGE THE SPRITE SHEET PATH WHEN WE GET ACTUAL SPITESSS
        // player1 sprite+animations
        this.load.image("rigby_S", "img/rigby.png");
        // this.load.spritesheet('rigby_S', 'img/sampleSprite.png', {
        //     frameWidth: 50,
        //     frameHeight: 35,
        //     startFrame: 0,
        //     endFrame: 7
        // });

        // player2 sprite+animations
        this.load.image("mordecai_S", "img/mordecai.png");
        // this.load.spritesheet('mordecai_S', 'img/sampleSprite.png', {
        //     frameWidth: 50,
        //     frameHeight: 35,
        //     startFrame: 0,
        //     endFrame: 7
        // });

        this.load.spritesheet("destroyer_S", "img/destroyerSpritesheet.png", {
            frameWidth: 312,
            frameHeight: 552,
            startFrame: 0,
            endFrame: 7
        });
            // shot projectile sprite(s)
        // destroyerofworlds sprite+animations
            // mouth laser attack sprite+animation
            // eye laser attack projectiles
        // (scrolling) ground sprite
        this.load.image('ground_T', 'img/ground.png'); // ground that players run on
        // background image 
            // split into layers for parralax probably?
            // foreground elements?
        // extra 'juice' effects and stuff? might conflict with 'arcade' style but might be cooler?
        // platforms(?)
        // ground obstacals(?) holes and stuff?
        this.load.image('crater_S', 'img/crater.png');
        
        // ------ (planned) audio assets ------

        // background track (boss theme)
        // button/ui sfx
        // player charging sfx
        // player shoot sfx
        // player jump sfx (?)
        // player dash sfx (?)
        // player hit sfx
        // player roll sfx

        // destroyer hit sfx
        // destroyer mouth laser sfx
        // destroyer eye laser sfx(s)
        // destroyer idle/random/ambient sfx(s)

        console.log("finished Preload Scene preload()");
    }

    init() {
        console.log("start Preload Scene init()");
        // set universal game settings
        game.settings = {
            scrollSpeed : 4, // in pixels
            runPathHeight: 400, // strip of land to run on, in pixels
            craterSpawnSpeed: 1, // in seconds
        }
        console.log("finished Preload Scene init()");

    }

    create() {
        console.log("start Preload Scene create()");
//let keyEnter, keyEsc, keyW, keyA, keyS, keyD, keySpace, keyShift, keyUp, keyLeft, keyRight, keyDown, keyDot, keyComma;
        // keys
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K); 
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J); 

        // player animations        
        // this.anims.create({
        //     key: `rigby-sample`,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('rigby_S', {start: 0, end: 5}),
        //     frameRate: 15,
        // })
        console.log("finished Preload Scene create()");
        console.log("launching menu scene now...");

        this.scene.launch('menuScene'); // it works i think :D
    }

    // add the loading screen somehow somewhere
}