class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // test
        A =this.add.text(game.config.width/3, game.config.height/3, "(temporary) menu scene");
        B = this.add.text(game.config.width/2, game.config.height/2, "Enter to start | Shift for credits");
        A.setFont(50);
        B.setFont(25);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            console.log("enter"); // IT WORKS
            this.scene.start("bossfightScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyShift)) {
            console.log("enter"); // IT WORKS
            this.scene.start("bossfightScene");
        }
    }
}