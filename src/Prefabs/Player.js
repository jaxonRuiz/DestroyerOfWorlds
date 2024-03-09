// player group
class Player {
    // planning state machine
    constructor(scene) {
        this.x = 150;
        this.y = game.config.width/2;
        this.rigby = scene.add.sprite(this.x, this.y-250, "rigby_S")
            .setOrigin(0.5, 1)
            .setScale(0.75);
        this.mordecai = scene.add.sprite(this.x, this.y, "mordecai_S")
            .setOrigin(0.5, 1)
            .setScale(0.75);

        // editing hitbox
        this.hitbox = scene.physics.add.sprite(this.x, this.y, "empty").setOrigin(0.5, 1);
        // edit the bounding boxes later
        this.hitbox.body.setSize(80, 40);
        this.hitbox.body.setOffset(-20, -15);
    }

    update() {
        // player movement
    }

    // hitting crater
    // might need to create a separate border box just for the crater :(
    hit() {
    }
}
