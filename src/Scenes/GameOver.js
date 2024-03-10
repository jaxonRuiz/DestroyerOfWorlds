class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    create() {
        let textConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "52px",
            backgroundColor: "#FF0000",
            align: "center"
        }

        this.add.text(game.config.width/3, game.config.height/3, "game over", textConfig);
        textConfig.fontSize = "30px";
        this.add.text(game.config.width/2, game.config.height/2, "Enter to start | Esc for menu", textConfig);
    }
    // sounds from pixabay
    // music 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.scene.start("bossfightScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start("menuScene");
        }
    }
}