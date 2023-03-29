import Bootloader from "./Bootloader.js"
import GameScene from "./Scenes/game.js"
import GameOver from "./Scenes/gameOver.js"
import Menu from "./Scenes/menu.js"

const config = {
    with: 710,
    height: 500,
    parent: "contenedor",
    // backgroundColor: 0x2F2F2F,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [
        Bootloader,
        Menu,
        GameScene,
        GameOver
        
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

new Phaser.Game(config)