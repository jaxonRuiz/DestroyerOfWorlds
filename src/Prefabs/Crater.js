// Crater Prefab
class Crater extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene game scene
     * @param {Array} collides array of colliable objects
     */
    constructor(scene, collides) {
        this.x = game.config.width + 10; // a bit of padding
        this.y = game.config.height - (Math.random() * 250); // change to height of pathway on the bottom

        super(scene, this.x, this.y, texture, frame);
        // find a way to get the textures in
        // maybe without passing the textures, that would be cool

        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        // this.body.setAllowGravity(false) FIND A WAY TO DISABLE GRAVITY GLOBALLY TYYY
        scene.add.existing(this);

        // set up collisions
        for (const object of collides) {
            scene.physics.add.collider(object, this, scene.hit);
        }
    }

    update() {
        this.x -= game.settings.scrollSpeed;
    }

    // for object pooling
    offScreen() {
        if (this.x + this.size < 0) {
            return true;
        }
        return false;
    }
}
