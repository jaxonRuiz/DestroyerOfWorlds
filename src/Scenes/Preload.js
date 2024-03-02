// also to be simultaneously run for keybinds

class Preload extends Phaser.Scene {
    constructor() {
        super("preloadScene");
    }

    // loading all interscene assets here
    preload() {
        // ------ (planned) visual assets ------

        // planned assets to load:
        // player1 sprite+animations
        // player2 sprite+animations
            // shot projectile sprite(s)
        // destroyerofworlds sprite+animations
            // mouth laser attack sprite+animation
            // eye laser attack projectiles
        // (scrolling) ground sprite
        // background image 
            // split into layers for parralax probably?
            // foreground elements?
        // extra 'juice' effects and stuff? might conflict with 'arcade' style but might be cooler?
        // platforms(?)
        // ground obstacals(?) holes and stuff?
        
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

    }

    init() {
        // set universal game settings
        game.settings = {
            scrollSpeed : 4, // in pixels
            runPathHeight: 250, // strip of land to run on, in pixels
        }
    }

    create() {
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

        this.scene.launch('menuScene'); // check pls
    }

}