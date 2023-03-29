import Bird from "../GameObjects/bird.js"
import Cactus from "../GameObjects/cactus.js"
import Dino from "../GameObjects/Dino.js"

let jumpAudio = document.getElementById("jump")
let gameOverAudio = document.getElementById("gameOver")
export default class GameScene extends Phaser.Scene{

    constructor(){
        super({key:"game"})
    }

    create(){
        //creating sprites
        this.ground = this.physics.add.image(100,460, "ground")
        this.ground2 = this.physics.add.image(700,460, "ground")
        this.ground.setGravityY(1500)
        this.ground2.setGravityY(1500)

        this.puntos = 0
        this.puntosText = this.add.text(120, 0, "0", {fontFamily: "Text menu", fontSize: 30})
        this.add.text(0, 0, "Score: ", {fontFamily: "Text menu", fontSize: 30})

        this.puntosInterval = setInterval(() => {this.puntos++; this.puntosText.setText(this.puntos)}, 200)

        this.dino = new Dino (this, 100, 320, "Dino", 0)
        this.dino.setInteractive()
        this.jumping = false

        this.cactus = this.physics.add.group()
        this.bird = this.physics.add.group()

        this.cactusInterval = setInterval(() => {this.cactus.add(new Cactus (this,1000, 387, "cactus"))
                            this.timerBird = setTimeout(() => {this.bird.add(new Bird (this,1000, 250, "bird"))}, 600)
                            this.bird.playAnimation("fly")}
        , Math.floor((Math.random() * (3000 - 2000 + 1) ) + 2000) )
        //animation
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("bird", {
                frames: [0,1,2]
            }),
            repeat: -1,
            frameRate: 10,
            duration: 0
        })
        
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("Dino", {
                frames: [0,1,2]
            }),
            repeat: -1,
            frameRate: 10,
            duration: 0
        })

        this.anims.create({
            key:"jump",
            frames: this.anims.generateFrameNumbers("Dino", {
                frames:[3]
            }),
            repeat: -1,
            frameRate: 10,
            duration: 0
        })

        this.dino.anims.play("walk")

        //colisiones

        this.colide = this.physics.add.collider(this.ground, this.dino, this.jump, null, this)
        this.ground.setCollideWorldBounds(true)
        this.ground2.setCollideWorldBounds(true)

        this.colideCactus = this.physics.add.collider(this.ground, this.cactus.getChildren())
        this.colideCactus2 = this.physics.add.collider(this.ground2, this.cactus.getChildren())
        
        this.gameOver = this.physics.add.collider(this.dino, this.cactus.getChildren(), this.stop, null, this)
        this.gameOver2 = this.physics.add.collider(this.dino, this.bird.getChildren(), this.stop, null, this)

        //movements
        this.cursorSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    jump(){
        this.jumping = true
    }

    stop() {
        clearInterval(this.cactusInterval)
        clearInterval(this.puntosInterval)
        clearTimeout(this.timerBird)
        this.scene.start("Gameover", this.puntos)
        gameOverAudio.play()
        this.bird.clear(true, true)
    }
    update(){
        if (this.cursorSpace.isDown && this.jumping === true){
            this.dino.body.setVelocityY(-500)
            this.dino.anims.play("jump")
            jumpAudio.play()
            let timer = setTimeout(() => {
                this.jumping = false
                let timer2 = setTimeout(() => {this.dino.anims.play("walk")}, 600)
            }, 170);
        }
        if (this.jumping === true){
            this.dino.on("pointerup", () => {
                this.dino.body.setVelocityY(-600)
                this.dino.anims.play("jump")
                jumpAudio.play()
                let timer = setTimeout(() => {
                    this.jumping = false
                    let timer2 = setTimeout(() => {this.dino.anims.play("walk")}, 600)
            }, 170);
            })
        }
        switch(true){

            case this.puntos > 100 && this.puntos < 300:
                this.cactus.setVelocityX(-400)
                this.bird.setVelocityX(-400)
                break;
            
            case this.puntos > 300 && this.puntos < 500:
                this.cactus.setVelocityX(-500)
                this.bird.setVelocityX(-500)
                break;

            case this.puntos > 500 :
                this.cactus.setVelocityX(-700)
                this.bird.setVelocityX(-700)
                break;
            
            default:
                this.cactus.setVelocityX(-300)
                this.bird.setVelocityX(-300)
                break;

        }
        
    }
}