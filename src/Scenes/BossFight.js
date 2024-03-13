// for boss scene, in case want to have multiple levels

class BossFight extends Phaser.Scene {
    constructor() {
        super("bossfightScene");
    }

    create() {
        /**
         * depth setup
         *  10 -> HUD/GUI
         *   5 -> forground
         *   0 -> characters
         *  -5 -> middle ground
         * -10 -> background
         */
        // add music (also playing music)
        this.music = this.sound.add("bg_music");
        this.music.setLoop(true);
        this.music.setVolume(0.4);
        this.music.play();

        // create ground
        this.ground_T = this.add.tileSprite(-10, game.config.height, game.config.width+25, game.settings.runPathHeight, "ground_T")
            .setOrigin(0, 1)
            .setDepth(-5);

        // player object
        this.player = new Player(this);

        // create player
        this.craters = new CraterGroup(this, [{object: this.player, hitbox: this.player.hitbox}], 5);

        // create Destroyer (within comments i *will* be insisting on capitalization for the Destroyer of Worlds)
        this.destroyer = new Destroyer(this, game.config.width * 7/8, 0, "destroyer_S", 0).setOrigin(0.5, 0).setDepth(0);

        // dirties
        this.isPlaying = true;

            // sounds
        // adding intro laugh
        this.haha_funi = this.sound.add("destroyerLaughSFX");
        this.haha_funi.setVolume(1.4);
        this.haha_funi.play();

        // victory SFX
        this.victorySFX = this.sound.add("victorySFX");

        // game over SFX
        this.gameOverSFX = this.sound.add("gameOverSFX");

        this.time.addEvent( {
            delay: 1000, // time in ms
            loop: true,
            callback: () => {
                
                    
                this.destroyer.generateEyeLaser(this.player.hitbox);
                
            },
            callbackScope: this
        })

        // debug key
        this.keyDebug = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); 
    }

    update() {
        if (this.isPlaying) {
            // updating background
            this.ground_T.tilePositionX += game.settings.scrollSpeed;
            this.craters.update();
            this.destroyer.update();

            // update state machines
            this.rigbyFSM.step();
            this.mordecaiFSM.step();

            if (Phaser.Input.Keyboard.JustDown(keyP1A)) {
            }

            // for testing ONLY
            if (Phaser.Input.Keyboard.JustDown(this.keyDebug)) {
                //this.destroyer.generateEyeLaser(this.player.hitbox);
                this.destroyer.toggleMouthLaser(this.player.hitbox);
                // this.destroyer.shootMouthLaser(this.player.hitbox);
            }
        }
    }

    gameOver() {
        this.isPlaying = false;
        this.music.pause();
        this.gameOverSFX.play();
        // maybe add a game over sound here!!
        this.scene.start('gameoverScene');
    }

    victory() {
        this.isPlaying = false;
        this.music.pause();
        this.victorySFX.play();
        // maybe add a game over sound here!!
        this.scene.start('victoryScreen'); // accidental inconsisten naming - oops
    }

    restart() {
        // reset variables maybe
        this.isPlaying = true;
        this.music.play();
    }
}
