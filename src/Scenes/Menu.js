class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // test
        this.add.text(0, 0, "menu scene");
        this.add.text(0, 50, "press enter to play");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            console.log("enter"); // IT WORKS
            this.scene.start("bossfightScene");
        }
    }
}