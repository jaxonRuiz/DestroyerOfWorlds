class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "52px",
            backgroundColor: "#AB8888",
            align: "center"
        }
        // add sfx
        this.click = this.sound.add("pewSFX");

        // add text
        this.add.text(game.config.width/3, game.config.height/3, "(temporary) menu scene", menuConfig);
        menuConfig.fontSize = "30px";
        this.add.text(game.config.width/2, game.config.height/2, "Enter to start | Shift for credits", menuConfig);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.click.play();
            this.scene.start("bossfightScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyP1S2)) {
            this.click.play();
            this.scene.start("creditsScene");
        }
    }
}