class Help extends Phaser.Scene {
    constructor() {
        super("helpScene");
    }
    create() {
        // add sfx
        this.click = this.sound.add("pewSFX");

        // add text
        this.add.bitmapText(game.config.width/2, 150, 'pixel_font', 'HELP...', '72').setOrigin(0.5);
        this.buttons = {
            next: new Button(this, game.config.width/2+200, game.config.height-200, 'NEXT', keyEnter, this.nextPage, this, 150),
            prev: new Button(this, game.config.width/2-200, game.config.height-200, 'PREV', keyEnter, this.prevPage, this, 150),
            return: new Button(this, game.config.width/2, game.config.height-120, 'RETURN', keyEnter, this.returnToMenu, this),
        };
        this.buttons.return.select();
        this.buttons.prev.disable();
        this.lastSelect = 'next'; // just for good feels
        this.page = 0;
        this.totalPages = 4; // remember to change this manually!!
        this.pages = this.add.tileSprite(0, game.config.height/2-30, game.config.width, 500, 'rigby_S')
            .setOrigin(0, 0.5);
    }
    // sounds from pixabay
    // music 
    update() {
        for (const b in this.buttons) {
            this.buttons[b].update();
        }
        
        // up down movement
        if (Phaser.Input.Keyboard.JustDown(keyP1W) || Phaser.Input.Keyboard.JustDown(keyP2W)) {
            if (this.buttons.return.selected) {
                this.buttons.return.deselect();
                this.buttons[this.lastSelect].select();
            }
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyP1S) || Phaser.Input.Keyboard.JustDown(keyP2S)) {
            if (this.buttons.prev.selected || this.buttons.next.selected) {
                if (this.buttons.prev.selected) {
                    this.buttons.prev.deselect();
                    this.lastSelect = 'prev';
                } else {
                    this.buttons.next.deselect();
                    this.lastSelect = 'next';
                }
                this.buttons.return.select();
            }
        }
        // left right movement
        if (Phaser.Input.Keyboard.JustDown(keyP1A) || Phaser.Input.Keyboard.JustDown(keyP2A)) {
            if (!this.buttons.return.selected && !this.buttons.prev.selected && !this.buttons.prev.disabled) {
                this.buttons.prev.select();
                this.buttons.next.deselect();
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyP1D) || Phaser.Input.Keyboard.JustDown(keyP2D)) {
            if (!this.buttons.return.selected && !this.buttons.next.selected && !this.buttons.next.disabled) {
                this.buttons.next.select();
                this.buttons.prev.deselect();
            }
        }
    }
    
    // button callbacks
    returnToMenu() {
        this.click.play();
        this.scene.start("menuScene");
    }
    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
        }
        this.updatePages();
    }
    prevPage() {
        if (this.page > 0) {
            this.page--;
        }
        this.updatePages();
    }
    updatePages() {
        // update page style
        this.pages.tilePositionX = this.page * game.config.width;
        // update next button
        if (this.page === this.totalPages) {
            this.buttons.next.disable();
            this.buttons.next.deselect();
            this.lastSelect = 'prev';
            this.buttons.return.select();
        } else {
            this.buttons.next.enable();
        }
        // update prev button
        if (this.page === 0) {
            this.buttons.prev.disable();
            this.buttons.prev.deselect();
            this.lastSelect = 'next';
            this.buttons.return.select();
        } else {
            this.buttons.prev.enable();
        }
    }
}