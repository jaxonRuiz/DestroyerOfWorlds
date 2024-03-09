// player group
class Player {
    // planning state machine
    constructor(scene) {
        this.x = 150;
        this.y = game.config.width/2;
        this.rigby = scene.add.sprite(this.x, this.y-125, "rigby_S")
            .setOrigin(0.5, 1)
            .setScale(0.35);
        this.mordecai = scene.add.sprite(this.x, this.y, "mordecai_S")
            .setOrigin(0.5, 1)
            .setScale(0.35);

        // editing hitbox
        this.hitbox = scene.physics.add.sprite(this.x, this.y, "empty").setOrigin(0.5);
        // edit the bounding boxes later
        this.hitbox.body.setSize(50, 20);
        this.hitbox.body.setOffset(-15, -10);

        this.player = {
            rigby: this.rigby,
            mordecai: this.mordecai,
            hitbox: this.hitbox,
            setX: (x) => {
                this.rigby.x += x;
                this.mordecai.x += x;
                this.hitbox.x += x;
            },
            setY: (y) => {
                this.rigby.y += y;
                this.mordecai.y += y;
                this.hitbox.y += y
            },
            setDirection: (x, y) => {
                this.player.setX(x);
                this.player.setY(y);
            },
            getX: () => {
                return this.hitbox.x;
            },
            getY: () => {
                return this.hitbox.y;
            }
        }

        // state machines
        scene.rigbyFSM = new StateMachine('idle', {
            idle: new R_IdleState(),
            aim: new R_AimState(),
            shoot: new R_ShootState(),
        }, [scene, this.player]);
        scene.mordecaiFSM = new StateMachine('run', {
            run: new M_RunState(),
            dash: new M_DashState(),
        }, [scene, this.player]);

        // save for other functions
        this.scene = scene;
    }

    update() {
        // player movement
        console.log('bad idea');
    }

    // hitting crater
    hit() {
        console.log('hitcrater');
        this.scene.gameOver();
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
        if(Phaser.Input.Keyboard.JustDown(keyP1S2)) {
            this.stateMachine.transition('dash')
            return;
        }

        // general movement
        let move = new Phaser.Math.Vector2(0, 0);
        if(keyP1W.isDown && player.getY() > (game.config.height - game.settings.runPathHeight) + 30) {
            move.y = -game.settings.playerMoveSpeed;
        } 
        if(keyP1A.isDown && player.getX() > 30) {
            move.x = -game.settings.playerMoveSpeed/2;
        }
        if(keyP1S.isDown && player.getY() < game.config.height-30) {
            move.y = game.settings.playerMoveSpeed;
        }
        if(keyP1D.isDown && player.getX() < game.config.width-350) {
            move.x = game.settings.playerMoveSpeed;
        }
        move.normalize();
        player.setDirection(move.x * game.settings.playerMoveSpeed, move.y * game.settings.playerMoveSpeed);

        // autoscroll
        if (player.getX() > 30) {
            player.setX(-game.settings.scrollSpeed);
        }
    }
}

class M_DashState extends State {
    enter(scene, player) {
        console.log("mordecai dashing");
        // run animation
        // player.mordecai.on('animationcomplete', () => {
        //     this.stateMachine.transition('run');
        // });

    }
    execute() {
    }
}
