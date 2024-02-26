let config = {
    type: Phaser.AUTO,
    width: 1280, 
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Menu, BossFight, Preload, GameOver, Credits]
    // future scenes (?): EnemyFight
}
let game = new Phaser.Game(config);
let keyEnter, keyEsc, keyW, keyA, keyS, keyD, keySpace, keyShift, keyUp, keyLeft, keyRight, keyDown, keyDot, keyComma;
// not all keybinds strictly intended to be used
// space/shift for player 1 use (jump/dash maybe?)
// period/comma for player 2 use ()