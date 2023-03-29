let bgMusic = document.getElementById("bg")
export default class Menu extends Phaser.Scene{
    
    constructor(){
        super({key: "menu", activate: true})
    }


    create(){
        //TITULO Y BOTON
        //añadir
        const configText = {
            x: 130,
            y:200,
            text: "Pixel runner",
            style: {
                fontFamily: "Text menu",
                color: "#ffffff",
                fontSize: 96
            }
        }
        this.make.text(configText)
        //añadir
        // this.add.text(170, 200, "Pixel Runner", { fill: "#ffffff", fontFamily:"Text menu",fontSize: 96})

        this.button = this.add.sprite(490,400,"start")
        //TITULO Y BOTON
        this.button.setInteractive()
        this.button.on("pointerdown", () => {
            this.scene.launch("game")
            bgMusic.loop = true
            bgMusic.play()
            this.scene.stop()
        })



    }

}