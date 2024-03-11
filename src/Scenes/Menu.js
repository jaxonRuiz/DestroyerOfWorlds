class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // add sfx
        this.click = this.sound.add("pewSFX");
        this.select = this.sound.add("pingSFX");

        // add text
        this.add.bitmapText(game.config.width/2, 300, 'pixel_font', 'DESTROYER OF WORLDS', '72').setOrigin(0.5);
        this.buttons = [
            new Button(this, game.config.width/2, 550, 'START', keyEnter, this.startButton, this),
            new Button(this, game.config.width/2, 650, 'HELP', keyEnter, this.helpButton, this),
            new Button(this, game.config.width/2, 750, 'CREDITS', keyEnter, this.creditsButton, this),
        ];
        this.bIndex = 0;
        this.buttons[this.bIndex].select();
    }

    update() {
        for (const b of this.buttons) {
            b.update();
        }

        if (Phaser.Input.Keyboard.JustDown(keyP1W) || Phaser.Input.Keyboard.JustDown(keyP2W)) {
            if (this.bIndex > 0) {
                this.select.play();
                this.buttons[this.bIndex--].deselect();
                this.buttons[this.bIndex].select();
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyP1S) || Phaser.Input.Keyboard.JustDown(keyP2S)) {
            if (this.bIndex < this.buttons.length-1) {
                this.select.play();
                this.buttons[this.bIndex++].deselect();
                this.buttons[this.bIndex].select();
            }
        }
    }

    startButton() {
        this.click.play();
        this.scene.start("bossfightScene");
    }

    helpButton() {
        this.click.play();
        this.scene.start("helpScene");
    }

    creditsButton() {
        this.click.play();
        this.scene.start("creditsScene");
    }
}