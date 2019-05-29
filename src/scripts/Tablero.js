class Tablero{
    constructor(app, width,heigth){
        this.app = app;
        this.width = width;
        this.heigth = heigth;

        this.lineah = this.width * 0.05;
        this.lineaw = this.heigth * 0.02;
    }

    pintar(linea){
        this.app.background(0);

        if(linea){
            this.app.noStroke();
            this.app.fill(100);
            this.app.rect(
                this.width/2-lineah/2,
                this.lineah,
                this.lineaw,
                this.heigth-this.lineah*2
            );
        }
    }
}