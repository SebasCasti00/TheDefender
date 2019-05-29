class Pelota{
    constructor(app, tabwidth, tabheight){
        this.app = app;
        this.height = tabheight * 0.1;
        this.width = this.height;
        this.tabwidth = tabwidth;
        this.tabheight = tabheight;

        this.pos = this.app.createVector(0,0);
        this.speed = (this.tabheight / 80) + 40;
        this.acc = this.app.createVector(0,0);
        this.salir  = false;
        this.balon = this.app.loadImage("./src/images/balon.png");

        
        this.kick = this.app.loadSound('./src/sound/kick.wav');
    }

    reset(){
        this.pos = this.app.createVector(this.tabwidth*0.02 + this.width* 2, this.tabheight/2 - this.height/2);
        this.acc = this.app.createVector(this.speed, this.speed);
    }

    pintar(){
        //imagen
        this.app.image(this.balon, this.pos.x, this.pos.y, this.width, this.height);
    }

    update(){
        this.pos.add(this.acc);
        
        if(this.pos.y > this.tabheight){
            if(this.acc.x > 0){
                this.acc = this.app.createVector(this.speed,-this.speed);
            } else {
                this.acc = this.app.createVector(-this.speed,-this.speed);
            }
        }

        if(this.pos.y < 0){
            if(this.acc.x < 0){
                this.acc = this.app.createVector(-this.speed,this.speed);
            }else {
                this.acc = this.app.createVector(this.speed, this.speed);
            }
        }
    }
    revisarColision(player1, player2){
        if(this.colisionando(player1)){
            this.acc = this.app.createVector(this.speed,this.acc.y);
        }else if(this.colisionando(player2)){
            this.acc = this.app.createVector(-this.speed,this.acc.y);
        }
    }


    colisionando(player){
        var bx = this.pos.x;
		var by = this.pos.y;
		var bw = this.width;
		var bh = this.height;
		var px = player.pos.x;
		var py = player.pos.y;
		var pw = player.width;
		var ph = player.height; 
		if(bx < px + pw &&
			bx + bw > px &&
			by < py + ph &&
			by + bh > py){
                this.kick.play();
			return true;
		}
		return false;
    }
}