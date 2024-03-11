class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScreen");
    }

    create() {
        // add sfx
        this.click = this.sound.add("pewSFX");
        this.select = this.sound.add("pingSFX");

        this.add.bitmapText(game.config.width/2, 300, 'pixel_font', 'YOU WIN', '72')
            .setOrigin(0.5)
            .setTintFill(0x8fc657);
        this.buttons = [
            new Button(this, game.config.width/2, 650, 'RESTART', keyEnter, this.startButton, this),
            new Button(this, game.config.width/2, 750, 'MENU', keyEnter, this.menuButton, this),
        ];

        // tinting green
        for (const b of this.buttons) {
            b.tint(0x8fc657);
        }

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

    menuButton() {
        this.click.play();
        this.scene.start("menuScene");
    }
}