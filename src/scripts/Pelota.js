class Pelota{
    constructor(app,tabwidth, tabheight){
        this.app = app;
        this.height = tabheight * 0.03;
        this.width = this.height;

        this.pos = this.app.createVector(0,0);
        this.speed = tabheight / 80;
        this.acc = this.app.createVector(0,0);
        this.salir  = false;
    }

    reset(){
        this.pos = this.app.createVector(tabwidth*0.02 + this.width* 2, tabheight/2 - this.height/2);
        this.acc = this.app.createVector(this.speed, this.speed);
    }

    pintar(){
        //imagen
        this.app.noStroke();
        this.app.fill(255,0,0);
        this.app.rect(this.pos.x,this.pos.y,this.width,this.height);
    }

    update(){
        this.pos.add(this.acc);
        
        if(this.pos.y > tabheight){
            if(this.acc.x > 0){
                this.acc = this.app.createVector(this.speed,-this.speed);
            } else {
                this.acc = this.app.createVector(-this.speed,this.speed);
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
			return true;
		}
		return false;
    }

    //this.reset();
}