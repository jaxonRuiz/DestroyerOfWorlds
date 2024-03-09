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

        // create ground
        this.ground_T = this.add.tileSprite(-10, game.config.height, game.config.width+25, game.settings.runPathHeight, "ground_T")
            .setOrigin(0, 1)
            .setDepth(-5);

        // update to player objects later
        this.rigby_P = this.add.sprite(game.config.width/2, game.config.width/2, "rigby_S")
            .setOrigin(0.5);

        // create player
        this.craters = new CraterGroup(this, [this.rigby_P], 5);

        // create Destroyer (within comments i *will* be insisting on capitalization for the Destroyer of Worlds)
        this.destroyer = new Destroyer(this, game.config.width * 7/8, 0, "destroyer_S", 0).setOrigin(0.5, 0).setDepth(0);
    }

    update() {
        // updating background
        this.ground_T.tilePositionX += game.settings.scrollSpeed;
        this.craters.update();
        this.destroyer.update();

        // MOVE ANIMATIONS TO PLAYER.JS LATERRR
        this.rigby_P.anims.play({ key: `rigby-sample` }, true);

        if (Phaser.Input.Keyboard.JustDown(keyUp)) {
            console.log("here"); // IT WORKS
        }
    }
}