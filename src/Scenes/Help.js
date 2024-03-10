class Help extends Phaser.Scene {
    constructor() {
        super("helpScene");
    }
    create() {
        let creditsConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "52px",
            backgroundColor: "#ABCDEF",
            align: "center",
            color: "black"
        }
        // add sfx
        this.click = this.sound.add("pewSFX");

        // add text
        this.add.text(game.config.width/3, game.config.height/3, "(temporary) help scene", creditsConfig);
        creditsConfig.fontSize = "30px";
        this.add.text(game.config.width/2, game.config.height/2, "Esc for menu", creditsConfig);
    }
    // sounds from pixabay
    // music 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.click.play();
            this.scene.start("menuScene");
        }
    }
}