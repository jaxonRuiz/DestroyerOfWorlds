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

        //making launch point at rigby head (?)
        this.launchPoint = scene.add.sprite(this.rigby.x, this.rigby.y - this.rigby.height/3, "empty").setOrigin(0.5, 1);

        // edit the bounding boxes later
        this.hitbox.body.setSize(50, 20);
        this.hitbox.body.setOffset(-15, -10);

        this.tracker = scene.add.sprite(this.x - 10, this.y, "ballProjectile").setOrigin(0.5);

        this.thrower = new Thrower(this.rigby);

        this.player = {
            rigby: this.rigby,
            launchPoint: this.launchPoint,
            mordecai: this.mordecai,
            hitbox: this.hitbox,
            theta: -1,
            power: 0,
            setX: (x) => {
                this.rigby.x += x;
                this.mordecai.x += x;
                this.hitbox.x += x;
                this.tracker.x += x;
                this.launchPoint.x +=x;
            },
            setY: (y) => {
                this.rigby.y += y;
                this.mordecai.y += y;
                this.hitbox.y += y;
                this.tracker.y += y;
                this.launchPoint.y += y;
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
            cooldown: new R_CooldownState(),
        }, [scene, this.player]);
        scene.mordecaiFSM = new StateMachine('run', {
            run: new M_RunState(),
            dash: new M_DashState(),
        }, [scene, this.player]);
        // realized WAY too late we were using the state machine wrong

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
        if (Phaser.Input.Keyboard.JustDown(keyP2A) || Phaser.Input.Keyboard.JustDown(keyP2D)) {
            this.stateMachine.transition("aim");
        }
    }
}

class R_AimState extends State {
    enter(scene, player) {
        console.log("rigby aiming");
        this.arrow = new Phaser.GameObjects.TileSprite(scene, player.launchPoint.y, player.launchPoint.y, 250, 16, "mouthLaser").setOrigin(0, 0.5);
        scene.add.existing(this.arrow);
        this.arrow.setRotation(-0.5);
        // (maybe add button prompt for clarity)

        
        // aim animation
    }
    execute(scene, player) {
        // console.log(this.arrow.angle);
        let rotationSpeed = 2;
        this.arrow.x = player.launchPoint.x;
        this.arrow.y = player.launchPoint.y;
        // maybe add aim wobble while aiming?
        //Phaser.Input.Keyboard.isDown(keyP2D)


        if (keyP2A.isDown && this.arrow.rotation > -2) {
            this.arrow.setAngle(this.arrow.angle - rotationSpeed);
        }
        if (keyP2D.isDown && this.arrow.rotation < 0.5) {
            this.arrow.setAngle(this.arrow.angle + rotationSpeed);
        }

        // lock aim
        if (Phaser.Input.Keyboard.JustDown(keyP2S1)) {
            this.arrow.destroy();
            player.theta = this.arrow.rotation;
            this.stateMachine.transition("shoot");
        }
    }
}

class R_ShootState extends State {
    enter(scene, player) {
        console.log("rigby shootin");
        // shoot animation
        
        this.power = 0.50; // max 1, for 100%
        // (maybe add button prompt for clarity)

        // making makeshift charge bar
        this.chargeBar = scene.add.sprite(player.rigby.x - player.rigby.width/4, player.rigby.y, "healthBar")
            .setScale(0.2, 0.2).setAngle(-90);

        this.fillBar = scene.add.sprite(player.rigby.x - player.rigby.width/4, player.rigby.y, "healthBarFill")
            .setScale(0.2, 0.2).setAngle(-90);
    }
    execute(scene, player) {
        this.chargeBar.x = player.rigby.x - player.rigby.width/4; // aaaaaaaaaaaaaaaaaa
        this.chargeBar.y = player.rigby.y;
        this.fillBar.x = player.rigby.x - player.rigby.width/4;
        this.fillBar.y = player.rigby.y
        this.fillBar.setCrop(1, 0, this.fillBar.width * this.power, this.fillBar.height);
        
        if (keyP2W.isDown && this.power < 1) {
            player.power += 0.01;
        }
        if (keyP2S.isDown && this.power > 0) {
            player.power -= 0.01;
        }
    }
}

// also includes actual firing 
class R_CooldownState extends State {
    enter(scene, player) {
        // fire chair
        this.chair = scene.add.sprite(player.launchPoint.x, player.launchPoint.y, "thrownChair");
        scene.add.existing(chair);
        let baseVelocity = 100;
        
        this.magnitude = baseVelocity * player.power;
        this.componentX = Math.cos(player.theta) * this.magnitude;
        this.componentY = Math.sin(player.theta) * this.magnitude;
        this.chair.body.setVelocity(componentX, componentY);
        console.log("rigby fire");
    }

    execute(scene, player) {
        // this.chair.setAngle(this.chair.angle() + 5);

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
