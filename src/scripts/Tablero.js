class Tablero{
    constructor(app, width,height){
        this.app = app;
        this.width = width;
        this.height = height;

        this.lineah = this.width * 0.05;
        this.lineaw = this.height * 0.02;
        this.fondo = this.app.loadImage("./src/images/fondo.png");
        console.log(this.fondo)
        console.log(this.height)
        console.log(this.width);
    }

    pintar(){
        //this.app.background(0);
        this.app.image(this.fondo, this.width, this.height);

        
        
    }
}