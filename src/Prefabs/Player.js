// player group
class Player {
    // planning state machine
    constructor(scene) {
        this.x = 50;
        this.y = game.config.width/2;
        this.mordecai = scene.physics.add.sprite(x, y, "rigby_S").setOrigin(0.5, 1);
        this.rigby = scene.physics.add.sprite(x, this.mordecai.height, "rigby_S").setOrigin(0.5, 1);
        this.hitbox; // extra hitbox for things on ground
    }

    update() {
        // player movement
    }

    // hitting crater
    // might need to create a separate border box just for the crater :(
    hit() {
    }
}
