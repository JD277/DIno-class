export default class Bootloader extends Phaser.Scene{

    constructor(){
        super({key: "Bootloader"})
    }

    preload(){
        this.load.on("complete", () => {
            this.scene.start("menu")
        })
        this.load.spritesheet("Dino", "../assets/R.png", {frameWidth:80, frameHeight:90})
        this.load.image("ground", "../assets/ground.png")
        this.load.image("start", "../assets/bitmap.png")
        this.load.image("cactus", "../assets/taco.png")
        this.load.spritesheet("bird", "../assets/bird.png", {frameWidth: 49, frameHeight: 59.6})

    }
}