// buttons for the menu screens

class Button {
    constructor(scene, x, y, text, key, callback, callbackScope, padding=200) {
        this.self = scene.add.bitmapText(x, y, 'pixel_font', text, '50').setOrigin(0.5);
        this.pad = padding;
        this.triangles = [
            scene.add.bitmapText(x-this.pad, y, 'pixel_font', '>', '72'),
            scene.add.bitmapText(x+this.pad, y, 'pixel_font', '<', '72'),
        ];
        for (const tringle of this.triangles) {
            tringle.setOrigin(0.5);
        }

        // for later
        this.key = key;
        this.callback = callback;
        this.callbackScope = callbackScope;
        
        // dirties
        this.selected = false;
        this.disabled = false;
        this.deselect();

        // blinking effect
        scene.time.addEvent({
            delay: 700, // in milliseconds
            loop: -1,
            startAt: 0,
            callback: this.blink,
            callbackScope: this,
        })

        this.text = text;
    }

    update() {
        if (this.selected && Phaser.Input.Keyboard.JustDown(this.key)) {
            this.callback.bind(this.callbackScope)();
        }
    }

    deselect() {
        this.selected = false;
        for (const tringle of this.triangles) {
            tringle.setAlpha(0);
        }
    }
    select() {
        if (!this.disabled) { // should still check things manually
            this.selected = true;
            for (const tringle of this.triangles) {
                tringle.setAlpha(1);
            }
        }
    }

    disable() {
        this.disabled = true;
        this.self.setAlpha(0.5);
    }
    enable() {
        this.disabled = false;
        this.self.setAlpha(1);
    }

    blink() {
        if (this.selected) {
            for (const tringle of this.triangles) {
                if (tringle.alpha === 0) {
                    tringle.setAlpha(1);
                } else {
                    tringle.setAlpha(0);
                }
            }
        }
    }

    tint(hex) {
        // tint only works on webGL!!
        this.self.setTintFill(hex);
        for (const tringle of this.triangles) {
            tringle.setTintFill(hex);
        }
    }
}
