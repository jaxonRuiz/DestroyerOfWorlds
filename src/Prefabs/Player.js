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

        // state machines
        scene.rigbyFSM = new StateMachine('idle', {
            idle: new R_IdleState(),
            aim: new R_AimState(),
            shoot: new R_ShootState(),
        }, [scene, this.rigby]);
        scene.mordecaiFSM = new StateMachine('run', {
            run: new M_RunState(),
            dash: new M_DashState(),
        }, [scene, this.mordecai]);
    }

    update() {
        // player movement
        console.log('bad idea');
    }

    // hitting crater
    hit() {
        console.log('hitcrater');
    }
}

// state machine states ////////////////////////////////////////////////////////
class R_IdleState extends State {
    enter(scene, player) {
        console.log("rigby idling");
        // idle "animation"
    }
    execute(scene, player) {
    }
}

class R_AimState extends State {
    enter(scene, player) {
        console.log("rigby aiming");
        // aim animation
    }
    execute(scene, player) {
    }
}

class R_ShootState extends State {
    enter(scene, player) {
        console.log("rigby shootin");
        // shoot animation
    }
    execute(scene, player) {
    }
}

class M_RunState extends State {
    enter(scene, player) {
        console.log("mordecai running");
        // run animation
    }
    execute(scene, player) {
        if(Phaser.Input.Keyboard.JustDown(keyShift)) {
            this.stateMachine.transition('dash')
            return;
        }
    }
}

class M_DashState extends State {
    enter(scene, player) {
        console.log("mordecai dashing");
        // run animation
        player.on('animationcomplete', () => {
            this.stateMachine.transition('run');
        });
    }
}
