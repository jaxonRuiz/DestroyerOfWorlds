class EyeLaser extends Phaser.GameObjects.Sprite {
    constructor(scene, spawnX, spawnY, target) {
        super(scene, spawnX, spawnY, "ballProjectile", 0);
        scene.physics.add.existing(this);
        
        this.movementVector = new Phaser.Math.Vector2(target.x - spawnX, target.y - spawnY);
        this.body.setVelocity(this.movementVector.x, this.movementVector.y);
    }

    // sets movement vector for eye laser
    setVector(targetX, targetY) {
        this.movementVector = new Phaser.Math.Vector2(targetX - spawnX, targetY - spawnY);
        this.body.setVelocity(this.movementVector.x, this.movementVector.y);
    }

    // returns true if laser is out of bounds (OOB)
    isOOB() {
        if (this.x > game.config.width + this.width/2 || this.x < 0 - this.width/2) return true;
        if (this.y > game.config.height + this.height/2 || this.y < 0 - this.height/2) return true;
        return false;
    }
}