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
        
        // ------ audio assets ------

        // background track (boss theme)
        this.load.audio("bg_music", "./assets/sounds/background-music.mp3");
        this.load.audio("destroyerHit1SFX", "./assets/sounds/arcade-hit1.mp3"); // as in the sound played when Destroyer gets hit
        this.load.audio("destroyerHit2SFX", "./assets/sounds/arcade-hit2.mp3");
        this.load.audio("destroyerHit3SFX", "./assets/sounds/arcade-hit3.mp3");
        this.load.audio("ascendSFX", "./assets/sounds/arcade-ascend-sfx.mp3");
        this.load.audio("destroyerHit4SFX", "./assets/sounds/arcade-hurt-sfx.mp3");
        this.load.audio("bleep_n_bloopSFX", "./assets/sounds/arcade-bleepNbloop.mp3");
        this.load.audio("destroyerSmallHitSFX", "./assets/sounds/arcade-small-hit.mp3");
        this.load.audio("successSFX", "./assets/sounds/arcade-success-sfx.mp3");
        this.load.audio("chargeUpSFX", "./assets/sounds/charge-up.mp3");
        this.load.audio("victorySFX", "./assets/sounds/cheesy-win-sfx.mp3");
        this.load.audio("collect1SFX", "./assets/sounds/collect-sfx1.mp3");
        this.load.audio("collect2SFX", "./assets/sounds/collect-sfx2.mp3");
        this.load.audio("destroyerDefeatSFX", "./assets/sounds/defeat-boom.mp3");
        this.load.audio("destroyerLaughSFX", "./assets/sounds/destroyer-laugh.mp3");
        this.load.audio("gameOverSFX", "./assets/sounds/game-over-sfx.mp3");
        this.load.audio("heavyLaserImpactSFX", "./assets/sounds/heavy-laser-impact.mp3");
        this.load.audio("heavyLaserShotSFX", "./assets/sounds/heavy-laser-shot.mp3");
        this.load.audio("heavyishHitSFX", "./assets/sounds/heavyish-hit.mp3");
        this.load.audio("hit1SFX", "./assets/sounds/hit1.mp3");
        this.load.audio("hit2SFX", "./assets/sounds/hit2.mp3");
        this.load.audio("hit3SFX", "./assets/sounds/hit3.mp3");
        this.load.audio("hit4SFX", "./assets/sounds/hit4.mp3");
        this.load.audio("laserShotSFX", "./assets/sounds/laser-shot.mp3");
        this.load.audio("pewSFX", "./assets/sounds/pew.mp3");
        this.load.audio("pingSFX", "./assets/sounds/ping-sfx.mp3");
        this.load.audio("smallImpactSFX", "./assets/sounds/simple-impact.mp3");

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
            runPathHeight : 400, // strip of land to run on, in pixels
            craterSpawnSpeed : 1.35, // in seconds
            playerMoveSpeed : 5, // in pixels
        }
        console.log("finished Preload Scene init()");

    }

    create() {
        console.log("start Preload Scene create()");
        
        // mordecai player 1, rigby player 2
        // keys
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyP1W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyP1A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyP1S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyP1D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyP1S1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyP1S2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyP2W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyP2A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyP2S= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP2D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyP2S1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K); 
        keyP2S2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J); 

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