class Logica{
    constructor(app){
        this.app = app;
        var player1;
        var player2;
        var pelota;

        var punto;
        var puntoganador = 5;
        this.pantalla = "intro";

        var width = 1200;
        var height = 700;
        this.tablero = new Tablero(width, height);
        player1 = new Player(1, this.tablero.width, this.tablero.height);
        player1.keys("w","s");
        player2.keys("o","l");
        pelota = new Pelota(board.width, board.height);
        createCanvas(board.width, board.height)
    }

    pintar(){
        switch(this.pantalla){
            case "intro":
                intro();
            break;
            case "end":
                end();
            break;
            default:
                juego();
        }
    }

    keyPressed(){
        if(key == player1.key_up){player1.up();}
        if(key == player1.key_down){player1.down();}
        if(key == player2.key_up){player2.up();}
        if(key == player2.key_down){player2.down();}
    }

    keyReleased(){
        if(key == player1.key_up || key == player1.key_down){
            player1.stop();
        }
        if(key == player2.key_up || key == player2.key_down){
            player2.stop();
        }
    }

    mouseClicked(){
        if(this.pantalla == "intro"){
            player1.score = 0;
            player2.score = 0;
            this.pantalla = "juego";
        }else if(this.pantalla = "end"){
            this.pantalla = intro;
        }
    }

    intro(){
        tablero.pintar(false);
        player1.reset();
        player2.reset();
        player1.pintar(false);
        player2.pintar(false);

        this.app.textSize(tabler.height * 0.1);
        this.app.fill(100);
        this.app.textAlign(CENTER);
        this.app.text("Click to start", tablero.width /2, tablero.height/2);

    //imagen jugar
    }

    juego(){
        player1.actualizar();
        player2.actualizar();
        tablero.actualizar();

        if(!this.punto){
            if(pelota.posx > tablero.width){
                player1.score += 1;
                this.punto = Date.now();
            }

            if(pelota.posx < 0){
                plater2.score += 1;
                this.punto = Date.now();
            }
        }

        pelota.revisarColision(player1,player2);

        if(Date.now() - this.punto > 2000){
            pelota.reset();
            player1.reset();
            player2.reset();
            this.punto = undefined;
        }

        if(player1.score == this.puntoganador 
            || player2.score == this.puntoganador){
                this.pantalla = "end";
                return;
            }
        
            tablero.pintar(true);
            player1.pintar(true);
            player2.pintar(true);
    }

    end(){
        tablero.pintar(false);
        ganar = 1;
        if(player2.score == puntoganador){
            ganar = 2;
        }

        textSize(board.height * 0.1);
	fill(100);
	textAlign(CENTER);
	text("- Winner -\nPlayer " + ganar + " \nClick to start again", tablero.width / 2, tablero.height / 2);
    }
}