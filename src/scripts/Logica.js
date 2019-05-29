class Logica{
    constructor(app){
        this.app = app;
        var tablero;

        this.punto;
        this.puntoganador = 5;
        this.pantalla = "intro";

        this.width = 1200;
        this.height = 700;
        this.tablero = new Tablero(app, this.width, this.height);
        this.player1 = new Player(app,1,this.tablero.width, this.tablero.height);
        this.player2 = new Player(app,2, this.tablero.width, this.tablero.height);
        this.player1.keys("w","s");
        this.player2.keys("o","l");
        this.pelota = new Pelota(app,this.tablero.width, this.tablero.height);
        this.app.createCanvas(this.width, this.height);
        
        this.inicio = this.app.loadImage("./src/images/inicio.png");
        this.botoninicio = this.app.loadImage("./src/images/botoninicio.png");
        this.fondo = this.app.loadImage("./src/images/fondo.png");
        this.app.soundFormats('wav');
        this.whistles = this.app.loadSound("./src/sound/whistles.wav");
        //this.crowd = this.app.loadSound('./src/sound/crowd.wav');
        
    }

    preload(){
    }

    pintar(){
        switch(this.pantalla){
            case "intro":
                this.intro();
                break;
            case "end":
                this.end();
                break;
            default:
                this.juego();
                break;
        }
    }

    keyPressed(){
        if(this.app.key == this.player1.key_up){this.player1.up();}
        if(this.app.key == this.player1.key_down){this.player1.down();}
        if(this.app.key == this.player2.key_up){this.player2.up();}
        if(this.app.key == this.player2.key_down){this.player2.down();}
    }

    keyReleased(){
        if(this.app.key == this.player1.key_up || this.app.key == this.player1.key_down){
            this.player1.stop();
        }
        if(this.app.key == this.player2.key_up || this.app.key == this.player2.key_down){
            this.player2.stop();
        }
    }

    mouseClicked(){
        if(this.pantalla == "intro"){
            this.player1.score = 0;
            this.player2.score = 0;
            this.pantalla = "juego";
        }else if(this.pantalla == "end"){
            this.pantalla = "intro";
        }
    }

    intro(){
        this.app.tint(255,255);
        this.app.image(this.inicio,0,0,this.width, this.height);
        this.app.image(this.botoninicio, this.width/4, this.height/4, this.width/2, this.height/2);
        this.player1.reset();
        this.player2.reset();
        this.pelota.reset();
    }
    
    juego(){
        //this.crowd.play();
        this.player1.update();
        this.player2.update();
        this.pelota.update();

        if(!this.punto){
            if(this.pelota.pos.x > this.tablero.width){
                this.player1.score += 1;
                this.punto = Date.now();
            }

            if(this.pelota.pos.x < 0){
                this.player2.score += 1;
                this.punto = Date.now();
            }
        }

        this.pelota.revisarColision(this.player1, this.player2);

        // esperar 2 segundos antes de iniciar el siguiente punto
        if(Date.now() - this.punto > 2000){
            this.whistles.setVolume(0.3);
            this.whistles.play();

            
            this.pelota.reset();
            this.player1.reset();
            this.player2.reset();
            this.punto = undefined;
        }

        if(this.player1.score == this.puntoganador ||
            this.player2.score == this.puntoganador){
            this.pantalla = "end";
            return;
        }

        this.tablero.pintar(false);
        this.player1.pintar(true);
        this.player2.pintar(true);
        this.pelota.pintar();
    }

    end(){
        this.tablero.pintar(true);
        var ganador = 1;
        if(this.player2.score == this.puntoganador){
            ganador = 2;
        }
        this.app.textSize(this.tablero.height * 0.1);
        this.app.fill(0);
        this.app.textAlign(this.app.CENTER);
        this.app.text("- Winner -\nPlayer " + ganador + " \nClick to start again", this.tablero.width / 2, this.tablero.height * 0.4);
    }
}