class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScreen");
    }

    create() {
        let textConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "52px",
            backgroundColor: "#ABCDEF",
            align: "center"
        }

        this.add.text(game.config.width/3, game.config.height/3, "(temporary) victory screen", textConfig);
        creditsConfig.fontSize = "30px";
        this.add.text(game.config.width/2, game.config.height/2, "Esc to go back to menu", textConfig);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start("menuScene");
        }
    }
}