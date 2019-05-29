class Logica{
    constructor(app){
        this.app = app;
        var tablero;

        var punto;
        var puntoganador = 5;
        this.pantalla = "intro";

        var width = 1200;
        var height = 700;
        this.tablero = new Tablero(app, width, height);
        this.player1 = new Player(app,1,this.tablero.width, this.tablero.height);
        this.player2 = new Player(app,1, this.tablero.width, this.tablero.height);
        this.player1.keys("w","s");
        this.player2.keys("o","l");
        this.pelota = new Pelota(app,this.tablero.width, this.tablero.height);
        this.app.createCanvas(width, height);
        console.log(this.tablero.width);
        console.log(this.tablero.height);

       
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
        }
    }

    keyPressed(){
        if(this.key == this.player1.key_up){this.player1.up();}
        if(this.key == this.player1.key_down){this.player1.down();}
        if(this.key == this.player2.key_up){this.player2.up();}
        if(this.key == this.player2.key_down){this.wplayer2.down();}
    }

    keyReleased(){
        if(this.key == this.player1.key_up || this.key == this.player1.key_down){
            this.player1.stop();
        }
        if(this.key == this.player2.key_up || this.key == this.player2.key_down){
            this.player2.stop();
        }
    }

    mouseClicked(){
        if(this.pantalla == "intro"){
            this.player1.score = 0;
            this.player2.score = 0;
            this.pantalla = "juego";
        }else if(this.pantalla = "end"){
            this.pantalla = this.intro;
        }
    }

    intro(){
        this.tablero.pintar(false);
        this.player1.reset();
        this.player2.reset();
        this.player1.pintar(false);
        this.player2.pintar(false);

        this.app.textSize(this.tablero.height * 0.1);
        this.app.fill(100);
        //this.app.textAlign(CENTER);
        this.app.text("Click to start", this.tablero.width /2, this.tablero.height/2);

    //imagen jugar
    }

    juego(){
        this.player1.update();
        this.player2.update();
        this.pelota.update();

        if(!this.punto){
            if(this.pelota.posx > this.tablero.width){
                this.player1.score += 1;
                this.punto = Date.now();
            }

            if(this.pelota.posx < 0){
                this.plater2.score += 1;
                this.punto = Date.now();
            }
        }

        this.pelota.revisarColision(this.player1,this.player2);

        if(Date.now() - this.punto > 2000){
            this.pelota.reset();
            this.player1.reset();
            this.player2.reset();
            this.punto = undefined;
        }

        if(this.player1.score == this.puntoganador 
            || this.player2.score == this.puntoganador){
                this.pantalla = "end";
                return;
            }
        
            this.tablero.pintar(true);
            this.player1.pintar(true);
            this.player2.pintar(true);
    }

    end(){
        this.tablero.pintar(false);
        this.ganar = 1;
        if(this.player2.score == this.puntoganador){
            this.ganar = 2;
        }

        this.app.textSize(this.tablero.height * 0.1);
        this.app.fill(100);
        this.app.textAlign(CENTER);
        this.app.text("- Winner -\nPlayer " + ganar + " \nClick to start again", tablero.width / 2, tablero.height / 2);
        
        this.player1.reset();
        this.player2.reset();
        this.pelota.reset();
    }
}