class Player {
    constructor(app, numero, tabwidth, tabheight){
        this.app = app;
        this.numero = numero;
        this.width = tabwidth * 0.05;
        this.height = tabheight * 0.2;
        this.tabwidth = tabwidth;
        this.tabheight = tabheight;

        this.pos = this.app.createVector(0,0);
        this.acc = this.app.createVector(0,0);
        this.speed = tabheight / 50;

        this.key_up = "";
        this.key_down = "";
        this.arreglokey = [];

        //tamaño imagenes
        this.playerheight = this.height * 0.5;
        this.playerwidth = this.width * 0.05;

        this.score = 0;

        this.fondo_player = this.app.loadImage("./src/images/player1.png");
        if(numero == 2){
            this.fondo_player = this.app.loadImage("./src/images/player2.png");
        }
    }

    //resetear pos jugador
    reset(){
        if(this.numero == 1){
            this.pos = this.app.createVector(this.width*2, this.tabheight/2 - this.height/2);
        }else {
            this.pos = this.app.createVector(this.tabwidth - this.width*3, this.tabheight/2 - this.height/2);
        }
    }

    keys(key_up, key_down){
        this.key_up = key_up;
        this.key_down = key_down;
    }
    //movimiento del jugador

    up(){
        this.arreglokey.push("up");
        this.acc.y = -this.speed;
    }

    down(){
        this.arreglokey.push("down");
        this.acc.y = this.speed;
    }

    stop(){
        this.arreglokey.shift();
        if(this.arreglokey.length == 0){
            this.acc.y = 0;
        }
    }

    pintar(pintarpuntaje){        
        this.app.image(this.fondo_player, this.pos.x, this.pos.y, this.width, this.height);
        if(pintarpuntaje){
            this.app.textSize(this.tabheight*0.1);
            this.app.fill(0);
            var textdir = 1;
            if(this.numero == 2){
                textdir = -1;
            }
            this.app.text(this.score, this.pos.x + textdir * this.width * 10, this.tabheight * 0.2);
        }
    }

    update(){
        this.pos.add(this.acc);
        this.pos.y = this.app.constrain(this.pos.y, 0, this.tabheight - this.height);
    }

    //this.reset();
}