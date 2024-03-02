class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.ground = this.add.tileSprite(0, 0, game.config.width, game.settings.runPathHeight, this.groundT).setOrigin(0, 1);


        // test
        this.add.text(0, 0, 'menu scene');
    }

    update() {
        // update tiles
        this.ground.tilePositionX += game.settings.scrollSpeed;
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            console.log('enter'); // IT WORKS
        }
    }
}