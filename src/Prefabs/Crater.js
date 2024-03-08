// Crater Prefab
class Crater extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene game scene
     * @param {Array} collides array of colliable objects
     */
    constructor(scene, collides) {
        const x = game.config.width + 50; // a bit of padding
        const y = game.config.height - (Math.random() * (game.settings.runPathHeight-20));
        super(scene, x, y, 'crater_S');

        this.x = x;
        this.y = y;

        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false) // FIND A WAY TO DISABLE GRAVITY GLOBALLY TYYY
        scene.add.existing(this);

        // set up collisions
        for (const object of collides) {
            scene.physics.add.collider(object, this, object.hit);
        }
    }

    update() {
        this.x -= game.settings.scrollSpeed;
        if (this.offScreen()) {
            this.refactor();
        }
    }

    // for object pooling
    refactor() {
        this.x = game.config.width + this.width + 10;
        this.y = game.config.height - (Math.random() * (game.settings.runPathHeight-this.height));
    }
    offScreen() {
        if (this.x + this.width < 0) {
            console.log('yes');
            return true;
        }
        return false;
    }
}

class CraterGroup {
    /**
     * Grouping for Crater objects
     * 
     * @param {Phaser.Scene} scene game scene
     * @param {Array} collides array of colliable objects (to pass to craters)
     * @param {Int} num of craters in the group
     */
    constructor(scene, collides, num) {
        this.pool = [];

        // slowly create a pool of craters
        scene.time.addEvent({
            delay: game.settings.craterSpawnSpeed * 1000, // 1 second = 1000 milliseconds
            startAt: 0,
            repeat: num-1,
            callback: () => {
                this.pool.push(new Crater(scene, collides));
                console.log(this.pool);
            },
            callbackScope: this,
        })
    }

    update() {
        for (const crater of this.pool) {
            crater.update();
        }
    }
}
