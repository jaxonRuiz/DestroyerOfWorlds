
class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        // add sfx
        this.click = this.sound.add("pewSFX");

        
        let creditsText = 
`General Frontend Code: Lyssa Li
General Backend Code: Jaxon Ruiz
Art: Lyssa Li, Jaxon Ruiz

SFX from pixabay.com
Pixel-Font from dafont.com

TY Professor Nathan for
teaching the class :)
`
         
        // add text
        this.add.bitmapText(game.config.width/2, 130, 'pixel_font', 'CREDITS', '72').setOrigin(0.5);
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'pixel_font', creditsText, '42').setOrigin(0.5);
        this.b = new Button(this, game.config.width/2, game.config.height-150, 'RETURN', keyEnter, this.returnButton, this);
        this.b.select();
    }
    // sounds from pixabay
    // music 
    update() {
        this.b.update();
    }
    
    returnButton() {
        this.click.play();
        this.scene.start("menuScene");
    }
}