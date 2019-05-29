class Tablero{
    constructor(app, width, height){
        this.app = app;
        this.width = width;
        this.height = height;
        this.fondo = this.app.loadImage("./src/images/fondo.png");
    }

    pintar(transparente){
        this.app.background(255);
        if(transparente){
            this.app.tint(255, 80);
        }
        this.app.image(this.fondo, 0, 0, this.width, this.height);        
    }
}
