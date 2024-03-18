/**
 * Jaxon Ruiz & Lyssa Li
 * Project Name: Destroyer of Worlds: Arcade Edition
 * Project Hours:
 * Citations:
 *      https://github.com/nathanaltice/FSM/blob/master/src/prefabs/Hero.js
 *      https://stackoverflow.com/questions/58593047/callback-for-when-a-specific-animation-is-complete-in-phaser-3
 *      https://www.dafont.com/arcadepix.font
 * 
 * Technical Execution Components:
 * (wasn't quite sure what exactly counted)
 *      Physics systems (various uses, including gravity on chair projectiles and collisions)
 *      Vectors (used for normalizing player movement and calculating projectile behaviors)
 *      Collision systems (player hitbox, projectiles, boss hitbox)
 *      Animation Manager
 *      Buttons
 *      Timers (used for button blinking)
 *      (probably other ones too but im not sure what exactly counts and dont wanna pad too much lol)
 *      
 * Current todos:
 *      *** finish player sprite
 *      add destroyer animations
 *      add preset destroyer attacks
 *      add in game destroyer movement (fix hitbox)
 *      finish mouth laser attack (?)
 *      *** add help screen
 *      (MAYBE) clean up player code and change some buttons around...
 *      * change crater sprite
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
    pixelPerfect: true,
    pixelArt: true,
    scene: [Preload, Menu, BossFight, GameOver, Credits, Victory, Help],
    // future scenes (?): EnemyFight
}
let game = new Phaser.Game(config);

// let keyEnter, keyEsc, keyW, keyA, keyS, keyD, keySpace, keyShift, keyUp, keyLeft, keyRight, keyDown, keyJ, keyK;
let keyEnter, keyEsc, keyP1S1, keyP1S2, keyP1W, keyP1A, keyP1S, keyP1D, keyP2S1, keyP2S2, keyP2W, keyP2A, keyP2S, keyP2D;
// not all keybinds strictly intended to be used
// space/shift for player 1 use (jump/dash maybe?)
// J/K for player 2 use (maybe change keys?) directional keys to aim, just one key to fire? other to load maybe...