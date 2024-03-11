class MouthLaser extends Phaser.GameObjects.TileSprite {
    constructor(scene, spawnX, spawnY) {
        super(scene, spawnX, spawnY, 48, 16, "mouthLaser", 0);
        
        this.target;
        this.spawn;
        this.lineLength;
        this.setOrigin(1, 0.5);
        
        
        
        scene.physics.add.existing(this);
        this.body.setAllowRotation(true);
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
        let targetX = this.target.x - (this.target.body.velocity.x * 8);
        let targetY = this.target.y - (this.target.body.velocity.y * 4);
        
        // constructing math-y thingy (see jaxon's manic scribbles for details)
        let legA = targetX - this.spawn.x;
        let legB = targetY - this.spawn.y;
        this.lineLength = Math.sqrt(Math.pow(legA, 2) + Math.pow(legB, 2));
        let theta = Math.atan(legB / legA);
        this.width = this.lineLength;
        this.setRotation(theta);

    }
}