// chair ammo setup

class AmmoManager {
    constructor(scene, player, enemies) {
        this.ammo = 0; // ammo count
        // also see if we want to make a max ammo count
        // see if we want to make the text visual
        // this.ammoHUD = scene.add.text(x, y, `ammo text: ${this.ammo}`);
        
        // "pools"
        this.recycleChair = new chair
        
        // save for later
        this.scene = scene;
    }

    getAmmo() {
        // ammo obtained SFX

        this.ammo++;
    }

    shoot() {
        this.ammo--;

        // update HUD
    }

    deleteChair(chair) { // we won't ever have too many chairs on the screen hopefully
        chair.destroy();
        //this.collectableChairs.splice(this.collectableChairs.indexOf(chair), 1);
    }

    update() {
        // spawn ammo every so often
        // update pools
        this.recycleChair.update();
    }
}

// chairs to pick up
class Chair extends Phaser.GameObjects.Sprite {
    constructor(player, manager) {
        this.manager = manager; // object manager

        manager.scene.physics.add.collider(player, this, () => {
            manager.getAmmo();
            manager.deleteChair(this);
        });
    }

    update() {
        // scroll
        this.x -= game.settings.scrollSpeed;

        // delete if offscreen
        if (this.x + this.size < 0) {
            this.manager.deleteChair(this);
        }
    }
}

// chairs to shoot
class ChairBullet extends Phaser.GameObjects.Sprite {
    constructor(player, enemies) {
        // dirties
        this.shot = false;

        // for the math
        this.speed = 4; // in pixels
        this.angle = 0;

        manager.scene.physics.add.collider(player, this, () => {
            manager.getAmmo();
            manager.deleteChair(this);
        });
    }

    shoot() {
        this.shot = true;
        
        // add object to scene
        this.manager.scene.physics.add.existing(this);
        this.body.setImmoveable(true);
        this.manager.scene.add.existing(this);
    }

    update() {
        if (this.shot) {
            // update position using phsyics wooo
            // remember to rotate the sprite

            // delete when offscreen
            if (this.x + this.size < 0) {
                this.manager.deleteChair(this);
            }
        }
    }
}
