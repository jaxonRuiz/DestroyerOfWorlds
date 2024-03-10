class MouthLaser extends Phaser.GameObjects.TileSprite {
    constructor(scene, spawnX, spawnY) {
        super(scene, spawnX, spawnY, 48, 16, "mouthLaser", 0);
        
        this.target;
        this.spawn;
        this.setOrigin(1, 0.5);
        
        
        
        scene.physics.add.existing(this);
        this.body.setAllowRotation(true);
        this.setRotation(this.theta);
        scene.add.existing(this);
        

    }

    setTarget(target) {
        this.target = target;
    }

    setSpawn(spawn) {
        this.spawn = spawn;
    }

    update() {
        this.x = this.spawn.x;
        this.y = this.spawn.y;
        this.targetX = this.target.x - this.target.body.velocity.x;
        this.targetY = this.target.y - this.target.body.velocity.y;
        // constructing math-y thingy
        this.legA = this.targetX - this.spawn.x;
        this.legB = this.targetY - this.spawn.y;
        this.lineLength = Math.sqrt(Math.pow(this.legA, 2) + Math.pow(this.legB, 2));
        this.theta = Math.atan(this.legB / this.legA);
        console.log(this.theta);
        this.width = this.lineLength;
    }
}