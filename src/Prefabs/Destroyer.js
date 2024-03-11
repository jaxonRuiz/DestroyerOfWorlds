// Destroyer of Worlds prefab

class Destroyer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        

        // health bar frame
        scene.add.sprite(game.config.width * 6/16, game.config.height* 1/16, "healthBar").setOrigin(0.5,0.5);
        this.healthBar = scene.add.sprite(game.config.width * 6/16, game.config.height* 1/16, "healthBarFill").setOrigin(0.5,0.5);

        // health bar fill
        scene.add.rectangle

        // Destroyer data
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.maxHeight = y - (game.config.height/14);
        this.minHeight = y + (game.config.height/6);
        this.goingUp = false;
        this.speed = 100;
        this.currentHealth = 100;
        this.maxHealth = 100;

        // set up eye laser attacks better TODO
        this.eyeLaserPool = new Set();
        

        this.mouthLaserActive = false
        // UNFINISHED MOUTH LASER TODO
        //this.mouthLaser = new MouthLaser(this.scene, this.x, this.y);
        //this.scene.add.existing(this.mouthLaser);

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
        for (const eyeLaser of this.eyeLaserPool) {
            eyeLaser.update();
        }

        if (this.mouthLaserActive) {
            this.mouthLaser.update();
        }
    }

    // damage as an int
    // returns
    getHit(damage) {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            this.die();
        }

        // adjust hp bar
        this.setHealthBar(this.currentHealth/this.maxHealth);
    }

    // maybe vary targetX and targetY a little?
    generateEyeLaser(target) {
        console.log("generateEyeLaser()");
        let laser = new EyeLaser(this.scene, this.x, this.y, target);
        this.eyeLaserPool.add(laser)

        this.scene.physics.add.collider(laser, this.scene.player.hitbox, () => {
            laser.destroy();
            this.scene.player.hit()
        })

        this.scene.add.existing(laser);
        // TODO pooling is not finished..
    }

    shootEyeLasers(x, y) {
        
    }

    activateMouthLaser(target) {
        // maybe add warning animation?

        this.mouthLaser.setSpawn(this);
        this.mouthLaser.setTarget(target);
        this.mouthLaserActive = true;
    }

    deactivateMouthLaser() {

    }
    shootMouthLaser(target) {
        console.log("shootMouthLaser()");
        this.mouthLaser.setTarget(target);
        this.mouthLaser.setSpawn(this); // update later with more specific spawn point. TODO
        this.mouthLaser.update();
    }

    // when Destroyer is (er) ..destroyed
    die() {
        console.log("destroyer has died");
        this.scene.victory();
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

    // 
    setHealthBar(percent) {
        this.healthBar.setCrop(0, 0, this.healthBar.width * percent, this.healthBar.height);
    }
}