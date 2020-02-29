var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var snakeBoxWidth = 30;
var snakeBoxHeight = 30;
var snakeBoxCount = 1;
var canvasPadding = 20;
var foodWidth = 20;
var foodHeight = 20;

var x = 20;
var y = 20;
var prevx = 0;
var prevy = 0;
var foodx;
var foody;

var dxy = 2;
var head = "right";
var isFoodEaten = true;
var foodInterval;

var totalFoodEatten = 0;

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        head= "right";
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        head= "left";
    }
    else if(e.key == "Top" || e.key == "ArrowUp") {
        head= "top";
    }
    else if(e.key == "Top" || e.key == "ArrowDown") {
        head= "down";
    }
    // console.log("head", head);
}

document.addEventListener("keydown", keyDownHandler, false);

function drawSnake(){
    ctx.beginPath();
    ctx.rect(x, y, snakeBoxWidth, snakeBoxHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    prevx = x;
    prevy = y;
}

function clearSnake(){
    ctx.clearRect(prevx, prevy, snakeBoxWidth, snakeBoxHeight);
}

function drawFood(){
    isFoodEaten = false;
    ctx.beginPath();
    var _x = Math.floor(Math.random()* (canvas.width - canvasPadding));
    var _y = Math.floor(Math.random()* (canvas.height - canvasPadding));
    foodx = _x;
    foody = _y;
    console.log("food x:y", foodx, foody);
    ctx.rect(foodx, foody, foodWidth, foodHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    
}

function clearFood(){
    ctx.clearRect(foodx, foody, foodWidth, foodHeight);
    isFoodEaten = true;
    console.log("food eaten true");
	
    totalFoodEatten++;
    document.getElementById("countFood").innerText = totalFoodEatten;
}

function increaseSnakeLength(){

}

function collisionDetection(){
    if(x > canvas.width - snakeBoxWidth || x < 0){
        clearInterval(interval);
    }
    else if(y > canvas.height- snakeBoxWidth || y < 0 ){
        clearInterval(interval);
    }
    if (x < foodx + foodWidth  && x + snakeBoxWidth  > foodx &&
		y < foody + foodHeight && y + snakeBoxWidth > foody) {
        clearFood();
        //increaseSnakeLength();
    }

}

function draw(){
    clearSnake();
    drawSnake();
    if(isFoodEaten){
        console.log("drawing new food");
        drawFood();
    }
    collisionDetection();

   //  console.log("head", head);
    if(head === "right"){
        x += dxy;
    }
    else if(head === "left"){
        x -= dxy;
    }
    else if(head === "top"){
        y -= dxy;
    }
    else if(head === "down"){
        y += dxy;
    }
}

var interval = setInterval(draw, 10);


