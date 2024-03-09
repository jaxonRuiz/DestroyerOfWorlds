// Destroyer of Worlds prefab

class Destroyer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.maxHeight = y - (game.config.height/14);
        this.minHeight = y + (game.config.height/6);
        this.goingUp = false;
        this.speed = 100;

        // adding destroyer animations:
        this.anims.create({
            key: "idle", // hoping that generic naming is fine since this animation is only created in Destroyer.js
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(texture, {
                start: 0,
                end: 7
            }) 
        })

        this.anims.play("idle");
        console.log("attempting to play anim");
    }

    update() {
        this.hover();
    }

    getHit() {

    }

    shootEyeLasers(x, y) {

    }

    shootMouthLaser(x, y) {

    }

    // when Destroyer is (er) ..destroyed
    die() {
        
    }

    hover() {
        // console.log(this.percentHeight());
        if (this.goingUp) {
            this.body.setVelocityY(this.lerp(-this.speed, this.percentHeight())); // make custom lerp function?
            if (this.y <= this.maxHeight) {
                this.goingUp = false;
            }
        } else {
            this.body.setVelocityY(this.lerp(this.speed, this.percentHeight()));
            if (this.y >= this.minHeight) {
                this.goingUp = true;
            }
        }
    }

    // returns float (0, 1) of progress based on height
    // come back to :( not working  and ran out of time
    percentHeight() {
        let range = this.minHeight - this.maxHeight;
        let adjustedY = this.y - this.maxHeight;
          adjustedY / range;
        if (!this.goingUp) {
            let adjustedY = this.y - this.maxHeight;
            return adjustedY / range;
        } else {
            let adjustedY = this.minHeight - this.y;
            return adjustedY / range;
        }
    }
    
    // custom lerp function. takes value as a number and progress as float (0,1)
    // returns a smoothened value based on float 
    lerp(value, progress) {
        return value;
        let x = progress * Math.PI;
        return value * Math.sin(x);
    }
}