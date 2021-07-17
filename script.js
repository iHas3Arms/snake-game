let cvs = document.getElementById("snekboard");
let ctx = cvs.getContext("2d");

let GAME_WIDTH = 397;
let GAME_HEIGHT = 397;

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 8;

let tileCount = 20;
let tileSize = GAME_WIDTH / tileCount - 2;

let score = 0;

const gulpSound = new Audio("sound/gulp.mp3");
const retroOofSound = new Audio("sound/retro.wav");

let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let foodX = 5;
let foodY = 5;

let velocity = {
    x: 0,
    y: 0
}

function main() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    detectFoodCollision();
    drawScore();
    drawSnake();
    drawFood();

    if (score > 2) {
        speed = 10;
    } else if (score > 5) {
        speed = 12;
    } else if (score > 7) {
        speed = 14;
    } else if (score >  9) {
        speed = 16;
    }

    setTimeout(main, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (velocity.y === 0 && velocity.x === 0) {
        return false;
    }

    if (headX < 0) {
        gameOver = true;
    }
    if (headX >= tileCount) {
        gameOver = true;
    }
    if (headY < 0) {
        gameOver = true;
    }
    if (headY >= tileCount) {
        gameOver = true;
    }

    for (let i=0; i<snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "70px fantasy";

        retroOofSound.play();
        ctx.fillText("GAME OVER", GAME_WIDTH / 8, GAME_HEIGHT / 1.8);
    
        setTimeout(() => {
            location.reload(true);
        }, 3000)
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText(`Score: ${score}`, GAME_WIDTH - 50, 10);
}

function drawSnake() {
    ctx.fillStyle = "green";
    for (let i=0; i<snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = "#013220";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX += velocity.x;
    headY += velocity.y;
}

function detectFoodCollision() {
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.addEventListener("keydown", keyDown);

function keyDown(event) {
    switch (event.keyCode) {
        case 38:
            if (velocity.y == 1) return;
            velocity.y = -1;
            velocity.x = 0;
            break;
        case 87:
            if (velocity.y == 1) return;
            velocity.y = -1;
            velocity.x = 0;
            break;
        case 40:
            if (velocity.y == -1) return;
            velocity.y = 1;
            velocity.x = 0;
            break;
        case 83:
            if (velocity.y == -1) return;
            velocity.y = 1;
            velocity.x = 0;
            break;
        case 37:
            if (velocity.x == 1) return;
            velocity.y = 0;
            velocity.x = -1;
            break;
            case 65:
                if (velocity.x == 1) return;
                velocity.y = 0;
                velocity.x = -1;
                break; 
        case 39:
            if (velocity.x == -1) return;
            velocity.y = 0;
            velocity.x = 1;
            break;
        case 68:
            if (velocity.x == -1) return;
            velocity.y = 0;
            velocity.x = 1;
            break;
    }
}

main();