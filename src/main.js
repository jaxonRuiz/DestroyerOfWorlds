let config = {
    type: Phaser.AUTO,
    width: 1920/2, 
    height: 1080/2,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Menu, Play, GameOver, Credits]
}
let game = new Phaser.Game(config);
let keyEnter, keyCredits, keyRestart, keyJump, keyUp, keyDown, keyLeft, keyRight;
