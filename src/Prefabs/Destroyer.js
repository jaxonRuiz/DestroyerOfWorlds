// Destroyer of Worlds prefab

class Destroyer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        // constructor and scene stuff
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        // hit sounds 
        this.hitSounds = [scene.sound.add("destroyerHit1SFX"), scene.sound.add("destroyerHit2SFX"), scene.sound.add("destroyerHit3SFX"), scene.sound.add("destroyerHit4SFX")];
        this.hitSounds[1].setVolume(1.2);
        this.hitSounds[3].setVolume(1.2);

        // defeat sound
        this.deathSFX = scene.sound.add("destroyerDefeatSFX");

        // laser sound
        this.laserShotSFX = scene.sound.add("laserShotSFX").setVolume(0.4);


        // add health bar frame and fill
        scene.add.sprite(game.config.width - 50, game.config.height* 1/16, "healthBar")
            .setScale(0.5)
            .setOrigin(1, 0.5);
        this.healthBar = scene.add.sprite(game.config.width - 50, game.config.height* 1/16, "healthBarFill")
            .setScale(0.5)
            .setOrigin(1, 0.5);

        // Destroyer data
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.maxHeight = y - (game.config.height/14);
        this.minHeight = y + (game.config.height/6);
        this.goingUp = false;
        this.speed = 100;
        this.currentHealth = 100;
        this.maxHealth = 100;

        // offset hitbox
        this.body.setSize(200, 350);
        this.body.setOffset(50, 150);

        // set up eye laser attacks better
        this.eyeLaserPool = new Set();

        // UNFINISHED MOUTH LASER TODO (didnt get to in time, might do later)
        // this.mouthLaserActive = false
        // this.mouthLaser = new MouthLaser(this.scene, this.x, this.y);
        // this.scene.add.existing(this.mouthLaser);

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
            if (eyeLaser.isOOB()) {
                console.log("laser oob");
                this.eyeLaserPool.delete(eyeLaser);
                eyeLaser.destroy();
            }
        }

        if (this.mouthLaserActive) {
            this.mouthLaser.update();
        }
    }

    // damage as an int
    getHit(damage) {
        this.currentHealth -= damage;
        console.log("destroyer hit for: " + damage);
        if (this.currentHealth <= 0) {
            this.die();
        }
        let sfx = this.hitSounds[Math.floor(Math.random()*this.hitSounds.length)]
        sfx.play();
        // adjust hp bar
        this.setHealthBar(this.currentHealth/this.maxHealth);
    }

    // maybe vary targetX and targetY a little?
    generateEyeLaser(target) {
        let laser = new EyeLaser(this.scene, this.x, this.y, target);
        this.eyeLaserPool.add(laser)
        this.laserShotSFX.play();
        
        this.scene.physics.add.collider(laser, this.scene.player.groundbox, () => {
            laser.destroy();
            this.eyeLaserPool.delete(laser);
            console.log("laser hit");
            this.scene.player.hit(10)
        })

        this.scene.add.existing(laser);
        // TODO pooling is not finished..
    }

    shootEyeLasers(x, y) {
        
    }

    toggleMouthLaser(target) {
        // maybe add warning animation?

        this.mouthLaser.setSpawn(this);
        this.mouthLaser.setTarget(target);
        this.mouthLaserActive = !this.mouthLaserActive;
    }

    deactivateMouthLaser() {

    }
    shootMouthLaser(target) {
        this.mouthLaser.setTarget(target);
        this.mouthLaser.setSpawn(this); // update later with more specific spawn point. TODO
        this.mouthLaser.update();
    }

    // when Destroyer is (er) ..destroyed
    die() {
        console.log("destroyer has died");
        this.deathSFX.play();
        this.scene.victory();
    }

    // TODO return to make *in game* animation so that hitbox more accurate.
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
        this.healthBar.setCrop(this.healthBar.width-this.healthBar.width * percent, 0, this.healthBar.width * percent, this.healthBar.height);
    }
}