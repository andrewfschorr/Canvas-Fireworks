
	var Fireworks = Fireworks || {};

	Fireworks.App = (function(){

		//Global variables
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		

		var bindDomEvents = function(){
			canvas.addEventListener("click", startdraw, false);
			document.getElementById('ballSpeed').onchange = function() {
				config.speedOfBall = this.value;
			};
			document.getElementById('scale').onchange = function() {
				config.ballCount = this.value;
			};
			document.getElementById('particlesize').onchange = function() {
				config.sizeOfParticles = this.value;
			};
		};

		var setUpCanvas = function(){
			canvas.width = config.W;
			canvas.height = config.H;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, config.W, config.H);
		};

		//ball constructor
		var ball = function (positionx,positiony){    
            this.r = Math.round(Math.random()*255);
            this.g = Math.round(Math.random()*255);
            this.b = Math.round(Math.random()*255);
            this.a = Math.random();
            this.location = {
                x: positionx,
                y:positiony
            }
            this.speed = {
                x: (-2+Math.random()*4)*config.speedOfBall, 
                y: (-2+Math.random()*4)*config.speedOfBall
            };
        };
        //move them balls
        var draw = function (){
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, config.W, config.H);    
            for(var i = 0; i < config.balls.length; i++){
                var p = config.balls[i];
                ctx.beginPath();
                ctx.arc(p.location.x, p.location.y, config.sizeOfParticles, Math.PI*2, false);
                ctx.fillStyle = "rgba("+p.r+","+p.g+","+p.b+", "+p.a+")";
                
                ctx.fill();    
                var consolelogX = p.location.x;
                var consolelogY = p.location.y;
                p.location.x += p.speed.x;    
                p.location.y += p.speed.y;
            }
        }

        //kicks off the balls
		var startdraw = function (e){
            var posX = e.pageX;    
            var posY = e.pageY;   
            console.log(posX,posY)  ;
            for(i=0;i<config.ballCount;i++){
                config.balls.push(new ball(posX,posY));
            }
        };
		var config = {
			W: window.innerWidth,
			H: window.innerHeight,
			balls: [],
			speedOfBall: document.getElementById('ballSpeed').value,
			ballCount: document.getElementById('scale').value,
			sizeOfParticles: document.getElementById('particlesize').value,
		};

		var init = function(){
			setUpCanvas();
			bindDomEvents();
			setInterval(draw,20);
			//draw();
		};
		return {
			init: init
		};

	})();

	window.onload = function(){
		Fireworks.App.init();
		//console.log(canvas);
	};

