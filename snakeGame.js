var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var newScore = document.getElementById("countFood");
var countTime = document.getElementById("countTime");

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
var timerstarted = 0;

var seconds = 0;
var minutes = 0;
var hours = 0;

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        head = "right";
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        head = "left";
    } else if (e.key == "Top" || e.key == "ArrowUp") {
        head = "top";
    } else if (e.key == "Top" || e.key == "ArrowDown") {
        head = "down";
    }
    // console.log("head", head);
}

document.addEventListener("keydown", keyDownHandler, false);

function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeBoxWidth, snakeBoxHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    prevx = x;
    prevy = y;
}

function clearSnake() {
    ctx.clearRect(prevx, prevy, snakeBoxWidth, snakeBoxHeight);
}

function drawFood() {
    isFoodEaten = false;
    ctx.beginPath();
    var _x = Math.floor(Math.random() * (canvas.width - canvasPadding));
    var _y = Math.floor(Math.random() * (canvas.height - canvasPadding));
    foodx = _x;
    foody = _y;
    console.log("food x:y", foodx, foody);
    ctx.rect(foodx, foody, foodWidth, foodHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

}

function clearFood() {
    ctx.clearRect(foodx, foody, foodWidth, foodHeight);
    isFoodEaten = true;
    console.log("food eaten true");

    totalFoodEatten++;
    newScore.innerText = totalFoodEatten;
}

function increaseSnakeLength() {

}

function collisionDetection() {
    if (x > canvas.width - snakeBoxWidth || x < 0) {
        clearInterval(interval);
        stopTimmer();
    } else if (y > canvas.height - snakeBoxWidth || y < 0) {
        clearInterval(interval);
        stopTimmer();
    }
    if (x < foodx + foodWidth && x + snakeBoxWidth > foodx &&
        y < foody + foodHeight && y + snakeBoxWidth > foody) {
        clearFood();
        //increaseSnakeLength();
    }

}

function draw() {
    clearSnake();
    drawSnake();
    if (isFoodEaten) {
        console.log("drawing new food");
        drawFood();
    }
    collisionDetection();

    //  console.log("head", head);
    if (head === "right") {
        x += dxy;
    } else if (head === "left") {
        x -= dxy;
    } else if (head === "top") {
        y -= dxy;
    } else if (head === "down") {
        y += dxy;
    }
}

var interval = setInterval(draw, 10);

startTimmer();

function restart() {

    clearSnake();
    clearFood();
    clearInterval(interval);

    snakeBoxWidth = 30;
    snakeBoxHeight = 30;
    snakeBoxCount = 1;
    newScore.innerText = 0;
    countTime.innerText = 0;
    totalFoodEatten = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;

    x = 20;
    y = 20;
    dxy = 2;
    head = "right";
    isFoodEaten = true;

    drawFood();
    drawSnake();
    interval = setInterval(draw, 10);
    stopTimmer();
    startTimmer();
}

function timer() {
    // console.log("timer running");
    timerstarted = setTimeout(() => {
        startTimmer();
    }, 1000);
}

function startTimmer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    countTime.innerText =
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
        ":" +
        (minutes ?
            minutes > 9 ?
            minutes :
            "0" + minutes :
            "00") +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function stopTimmer() {
    clearTimeout(timerstarted);
    timerstarted = 0;
}