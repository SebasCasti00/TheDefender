class Player {
    constructor(app, numero, tabwidth, tabheight){
        this.app = app;
        this.numero = numero;
        this.width = tabwidth * 0.02;
        this.height = tabheight * 0.2;

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
    }
    //resetear pos jugador
    reset(){
        if(this.numero == 1){
            this.pos = app.createVector(this.width*2, tabwidth/2 - this.height/2);
        }else {
            this.pos = app.createVector(tabwidth - this.width*3, tabheight/2 - this.height/2);
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
        this.app.noStroke();
		this.app.fill(255);
        this.app.rect(this.posx, this.posy, this.width, this.height);
        
        if(pintarpuntaje){
            this.app.textSize(tabheight*0.1);
            this.app.fill(100);
            textdir = 1;

            if(numero == 2){
                textdir = -1;
            }
            
            this.app.text(this.score, this.posx + textdir * this.width * 10, tabheight * 0,2);
        }
    }

    update(){
        this.pos.add(this.acc);
        this.pos.y = this.app.constrain(this.pos.y, 0, tabheight - this.height);
    }

    //this.reset();
}