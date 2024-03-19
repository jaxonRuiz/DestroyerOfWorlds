// player group
class Player {
    // planning state machine
    constructor(scene) {
        this.x = 150;
        this.y = game.config.width/2;
        let scaler = 0.35; // internal use to make life easier

        this.rigby = scene.add.sprite(this.x, this.y-150, "rigby_S")
            .setOrigin(0.5, 1)
            .setScale(scaler);
        this.mordecai = scene.add.sprite(this.x, this.y, "mordecai_S")
            .setOrigin(0.5, 1)
            .setScale(scaler);

        // hitboxes
        this.groundbox = scene.physics.add.sprite(this.x, this.y, "empty").setOrigin(0.5); // hitbox for craters and movement
        this.hitbox = scene.physics.add.sprite(this.x, this.y, "empty").setOrigin(0.5); // hitbox for projectiles

        this.hitbox.y -= this.mordecai.height/2;

        // configuring hitboxes
        this.groundbox.body.setSize(this.mordecai.width*scaler*0.9, 20);
        this.groundbox.body.setOffset(-this.mordecai.width*scaler*0.45, -10);

        this.hitbox.body.setSize(this.mordecai.width*scaler*0.7, this.mordecai.height*scaler*1.225);
        this.hitbox.body.setOffset(-this.mordecai.width*scaler*0.35 , this.mordecai.height*scaler*0.3);
        //this.hitbox.body.setOffset(this.mordecai.width*scaler*0.35 , -this.mordecai.height*scaler*0.25);

        this.groundbox.body.setImmovable(true);
        this.hitbox.body.setImmovable(true);

        this.hitbox.setOrigin(0.5);
        this.groundbox.setOrigin(0.5);
 
        // tracker for mouth laser tracking TODO LATER
        this.tracker = scene.add.sprite(this.x - 10, this.y, "empty").setOrigin(0.5);


        // hit sound
        this.hitSounds = [scene.sound.add("hit1SFX"), scene.sound.add("hit2SFX"), scene.sound.add("hit3SFX"), scene.sound.add("hit4SFX")];

        // add health bar frame and fill
        scene.add.sprite(50, game.config.height* 1/16, "healthBar")
            .setScale(0.5)
            .setOrigin(0, 0.5);
        this.healthBar = scene.add.sprite(50, game.config.height* 1/16, "healthBarFill")
            .setScale(0.5)
            .setOrigin(0, 0.5);

        // making launch point at rigby head (?)
        this.launchPoint = scene.add.sprite(this.rigby.x, this.rigby.y - this.rigby.height/3, "empty").setOrigin(0.5, 1);
        this.health = 100;
        this.maxHealth = 100;
        this.damage = 10;
        
        // math values to carry over
        this.theta = -1;
        this.power = 0;

        // state machines
        scene.rigbyFSM = new StateMachine('idle', {
            idle: new R_IdleState(),
            aim: new R_AimState(),
            shoot: new R_ShootState(),
            cooldown: new R_CooldownState(),
        }, [scene, this]);
        scene.mordecaiFSM = new StateMachine('run', {
            run: new M_RunState(),
            dash: new M_DashState(),
        }, [scene, this]);

        // for the hit function to work
        this.scene = scene;
    }

    // updating player healthbar
    setHealthBar(percent) {
        this.healthBar.setCrop(0, 0, this.healthBar.width * percent, this.healthBar.height);
    }

    // when player is hit. default damage is set to 10
    hit(damage = 10) {
        this.health -= damage;

        // randomized hit sfx:
        let sfx = this.hitSounds[Math.floor(Math.random()*this.hitSounds.length)]
        sfx.play();

        this.setHealthBar(this.health/this.maxHealth);

        // if player dies -> game over
        if (this.health <= 0) {
            this.scene.gameOver();
        }
    }

    // helper movement functions since lots of objects need to move together
    setX(x) {
        this.rigby.x += x;
        this.mordecai.x += x;
        this.hitbox.x += x;
        this.groundbox.x += x;
        this.tracker.x += x;
        this.launchPoint.x +=x;
    }
    setY(y) {
        this.rigby.y += y;
        this.mordecai.y += y;
        this.hitbox.y += y;
        this.groundbox.y += y;
        this.tracker.y += y;
        this.launchPoint.y += y;
    }
    setDirection(x, y) {
        this.setX(x);
        this.setY(y);
    }

    // simplifying to just have one position to focus on (groundbox)
    getX() {
        return this.groundbox.x;
    }
    getY() {
        return this.groundbox.y;
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
        this.arrow = new Phaser.GameObjects.Sprite(scene, player.launchPoint.y, player.launchPoint.y, "aimArrow").setOrigin(0, 0.5);
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
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
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
        
        this.power = 0; // max 1, for 100%
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
            this.power += 0.01;
        }
        if (keyP2S.isDown && this.power > 0) {
            this.power -= 0.01;
        }

        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            console.log("transition to cooldown");
            player.power = this.power;
            this.chargeBar.destroy();
            this.fillBar.destroy();
            this.stateMachine.transition("cooldown");
        }
    }
}

// also includes actual firing 
class R_CooldownState extends State {
    enter(scene, player) {
        // fire chair
        this.chair = scene.add.sprite(player.launchPoint.x, player.launchPoint.y, "thrownChair");
        scene.physics.add.existing(this.chair);
        let baseVelocity = 1000;
        
        this.magnitude = baseVelocity * player.power;
        let componentX = Math.cos(player.theta) * this.magnitude;
        let componentY = Math.sin(player.theta) * this.magnitude;
        this.chair.body.setVelocity(componentX, componentY);
        this.chair.body.setGravityY(1000);

        // setting collision
        scene.physics.add.collider(scene.destroyer, this.chair, () => {
            scene.destroyer.getHit(player.damage); // change to this.damage if fix player
            this.chair.destroy();
            this.stateMachine.transition("idle");

            // some juice for the hit
            const boom = scene.add.sprite(this.chair.x+this.chair.width, this.chair.y, "itemHit")
                .setScale(3)
                .setOrigin(0.5);
            boom.play("boom");
        })
    }

    execute(scene, player) {
        this.chair.setAngle(this.chair.angle + 5);

        // reset when chair goes offscreen
        if (this.chair.y > game.config.height || this.chair.x > game.config.width) {
            this.chair.destroy();
            this.stateMachine.transition("idle");
        }
    }
}

class M_RunState extends State {
    enter(scene, player) {
        console.log("mordecai running");
        // run animation
    }
    execute(scene, player) {
        // TODO implement dash state if time
        // if(Phaser.Input.Keyboard.JustDown(keyP1S2)) {
        //     this.stateMachine.transition('dash')
        //     return;
        // }

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
