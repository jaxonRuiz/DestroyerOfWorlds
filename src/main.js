/**
 * Jaxon Ruiz & Lyssa Li
 * Project Name: Destroyer of Worlds: Arcade Edition
 * Project Hours: approx 500
 * Citations:
 *      https://github.com/nathanaltice/FSM/blob/master/src/prefabs/Hero.js
 *      https://stackoverflow.com/questions/58593047/callback-for-when-a-specific-animation-is-complete-in-phaser-3
 */

let config = {
    type: Phaser.AUTO,
    width: 1280, 
    height: 1024,
    zoom: 0.75, // a bit big for many screens :(
    // i had an idea about making the console in the canvas, but only playing the game on the screen?
    // visual effect where we use a border to kind of make the arcade machine 
    // play would be on the 1280, 1024 screen size, but have arcade machine around it? idk
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    pixelArt: true,
    scene: [Preload, Menu, BossFight, GameOver, Credits],
    // future scenes (?): EnemyFight
}
let game = new Phaser.Game(config);

let keyEnter, keyEsc, keyW, keyA, keyS, keyD, keySpace, keyShift, keyUp, keyLeft, keyRight, keyDown, keyJ, keyK;
// not all keybinds strictly intended to be used
// space/shift for player 1 use (jump/dash maybe?)
// J/K for player 2 use (maybe change keys?) directional keys to aim, just one key to fire? other to load maybe...