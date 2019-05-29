new p5(function(app){
    var logica;

    app.setup = function() {
        logica = new Logica(app);
    }
    
    app.draw = function() {
        logica.pintar();
    }

    app.mouseClicked = function(){
        logica.mouseClicked();
    }
    
    app.keyPressed= function(){
        logica.keyPressed();
    }

    app.keyReleased = function(){
        logica.keyReleased();
    }

});
