var canvas = document.getElementById("pong");
var context = canvas.getContext('2d');

var x = canvas.width/2, y = canvas.height/2;
var radius = 10;
var paddleW = 20, paddleH = 100, paddleMove = 10;
var dx = 3, dy = 2;
var scoreL = scoreR = 0;
const WIN = 1;
var soundP = document.getElementById("soundPong");
var soundS = document.getElementById("soundScore");
var soundC = document.getElementById("soundCheer");
var soundB = document.getElementById("soundBackground");
var gameStart = false;
var start = document.getElementById("start");

var mouseX, mouseY;
var gamerOver = false;
var paddleLeft = {
	x:0,
	y:(canvas.height - paddleH) / 2,
	moveUp:false,
	moveDown:false,
	
}
var paddleRight = {
	x:canvas.width - paddleW, 
	y:(canvas.height - paddleH) / 2,
	moveUp:false,
	moveDown:false,
}
function ball(){
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.fillStyle = 'yellow'
	context.fill();
	context.closePath();
}

function moveBall(){
	x += dx;
	y += dy;
}
document.addEventListener('keyup', function(event){
	if(event.key == 'w'){
			paddleLeft.moveUp = false;
	}
	else if(event.key == 's'){
			paddleLeft.moveDown = false;
	}
});
document.addEventListener('keydown', function(event){
	if(event.key == 'w'){
			paddleLeft.moveUp = true;
			gameStart = true;
	}
	else if(event.key == 's'){
			paddleLeft.moveDown = true;
			gameStart = true;
	}
});
document.addEventListener('keyup', function(event){
	if(event.key == 'ArrowUp'){
			paddleRight.moveUp = false;
	}
	else if(event.key == 'ArrowDown'){
			paddleRight.moveDown = false;
	}
});
document.addEventListener('keydown', function(event){
	if(event.key == 'ArrowUp'){
			paddleRight.moveUp = true;
			gameStart = true;
	}
	else if(event.key == 'ArrowDown'){
			paddleRight.moveDown = true;
			gameStart = true;
	}
});

function paddle(){
	context.beginPath();
	context.rect(paddleLeft.x,paddleLeft.y, paddleW, paddleH);
	context.fillStyle = 'white'
	context.fill();
	context.closePath();

	context.beginPath();
	context.rect(paddleRight.x,paddleRight.y, paddleW, paddleH);
	context.fillStyle = 'white'
	context.fill();
	context.closePath();
}

function controlPaddle() {
	if(paddleLeft.y < 0){
		paddleLeft.y = 0;
	} else if (paddleLeft.y > canvas.height - paddleH){
		paddleLeft.y = canvas.height - paddleH;	
	}
	if(paddleRight.y < 0){
		paddleRight.y = 0;
	} else if (paddleRight.y > canvas.height - paddleH){
		paddleRight.y = canvas.height - paddleH;	
	}
}

function ballCollideCanvas(){
	if(y <= radius){
		dy = -dy;
	}
	else if(y + radius >= canvas.height){
		dy = -dy;
	}
}

function ballCollidePadlle(){
	
	if((x - radius <= paddleW) && (y + radius <= paddleLeft.y + paddleH) && (y - radius >= paddleLeft.y)){
		soundP.volume = 0.3;
		soundP.play();
		dx = -dx;
	}
	else if(x + radius >= canvas.width){
		soundS.volume = 0.8;
		soundS.play();
		scoreL++;
		if(scoreL == WIN){
			gamerOver = true;
			soundC.play();
		}else {
			x = canvas.width/2;
			y = canvas.height/2;
			dx = -dx;
			dy = -dy;
			gameStart = false;
		}
	}
	if((x + radius  >= canvas.width - paddleW) && (y + radius <= paddleRight.y + paddleH) && (y - radius >= paddleRight.y)){
		soundP.volume = 0.3;
		soundP.play();
		dx = -dx;
	}
	else if(x < radius){
		soundS.volume = 0.8;
		soundS.play();
		scoreR++;
		if(scoreR == WIN){
			gamerOver = true;
			soundC.play();			
		}else {
			x = canvas.width/2;
			y = canvas.height/2;
			dx = -dx;
			dy = -dy;
			gameStart = false;
		}
	}
}

function scoreDraw(){
	context.beginPath();
	context.fillStyle = "white";
	context.font = "60px Cursive";
	context.fillText(scoreL + " : " + scoreR, 340, 80);
	context.closePath();
}

function buttonPress(e){
	ball();
	scoreL = scoreR = 0;
	gamerOver = false;
}

function playAgain() {
	context.beginPath();
	context.fillStyle = "lightblue";
	context.font = "20px Cursive";
	context.fillText("PLAY AGAIN", 350, 400);
	context.closePath();
	gameStart = false;
	document.addEventListener('click', buttonPress, false);
}

function draw(){	
	start.style.display = "none";
	context.clearRect(0, 0, canvas.width, canvas.height);
	paddle();
	ball();
	if(gameStart){
		moveBall();
	}
	if(paddleLeft.moveUp){
		paddleLeft.y -= paddleMove;
	}
	if(paddleRight.moveUp){
		paddleRight.y -= paddleMove;
	}
	if(paddleLeft.moveDown){
		paddleLeft.y += paddleMove;
	}
	if(paddleRight.moveDown){
		paddleRight.y += paddleMove;
	}
	ballCollidePadlle();
	ballCollideCanvas();
	controlPaddle();
	scoreDraw();
	soundB.volume = 0.5;
	soundB.play();
	if(gamerOver){
		soundB.pause();
		soundB.currentTime = 0;
		x = canvas.width/2, y = canvas.height/2 - 10;
		if(scoreL == WIN){
			context.fillStyle = "yellow";
			context.font = "40px Cursive";
			context.fillText("勝者：左   プレイヤー", 220, 250);
		}
		else{
			context.fillStyle = "yellow";
			context.font = "40px Cursive";
			context.fillText("勝者：右   プレイヤー", 220, 250);
		}
	playAgain();
	}
	requestAnimationFrame(draw);
}


