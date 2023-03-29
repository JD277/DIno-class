export default class GameOver extends Phaser.Scene{
    
    constructor(){
        super({key: "Gameover",})
    }
    init(data){
        this.puntos = data
    }

    create(){
        //TITULO Y BOTON
        //añadir
        const configText = {
            x: 130,
            y:200,
            text: "Game over",
            style: {
                fontFamily: "Text menu",
                color: "#FF4D3C",
                fontSize: 96
            }
        }
        this.make.text(configText)
        
        //Texto puntos
        const configTextPoints = {
            x: 400,
            y: 300,
            text: "Your score was: ",
            style: {
                fontFamily: "Text menu",
                color: "#FFFFFF",
                fontSize: 20
            }
        }
        this.make.text(configTextPoints)

        this.totalpoints = this.add.text(590,300, "0", {fontFamily: "Text menu", fontSize: 20})
        this.totalpoints.setText(this.puntos)
        
        this.button = this.add.sprite(490,400,"start")
        //TITULO Y BOTON
        this.button.setInteractive()
        this.button.on("pointerdown", () => {
            this.scene.start("game")
        })



    }

}