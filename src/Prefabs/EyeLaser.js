class EyeLaser extends Phaser.GameObjects.Sprite {
    constructor(scene, spawnX, spawnY, targetX, targetY) {
        super(scene, spawnX, spawnY, "ballProjectile", 0);
        scene.physics.add.existing(this);
        
        this.movementVector = new Phaser.Math.Vector2(targetX - spawnX, targetY - spawnY);
        this.body.setVelocity(this.movementVector.x, this.movementVector.y);

    }

    setVector(targetX, targetY) {
        this.movementVector = new Phaser.Math.Vector2(targetX - spawnX, targetY - spawnY);
        this.body.setVelocity(this.movementVector.x, this.movementVector.y);
    }
}