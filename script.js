const playArea = document.querySelector("#playArea");
const gridWidth = 20;
const gameSpeed = 150;
const snake = [];
const directionalKeys = {
    "d" : ["left", "right"],
    "a" : ["right", "left"],
    "w" : ["down", "up"],
    "s" : ["up", "down"],
};
var gameClock;
var proposedDirection = "right";
var lastDirection = "right";
var snakeEating = "false";
var score;

// Creates the grid with x and y coordinates
for(let i = 0; i < (gridWidth * gridWidth); i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("y", `${Math.trunc((i / gridWidth) + 1)}`);
    pixel.setAttribute("x", `${i + 1 <= gridWidth ? i + 1 : (i + 1) - (gridWidth * (pixel.getAttribute("Y") - 1))}`);
    playArea.append(pixel);
};

// Creates the start button
var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    startButton.classList.add("active");
    startGame();
});

// Creates the Score


// Starts the game
const startGame = () => {
    score = 0;
    snake.length = 0;
    snake.unshift(
        [gridWidth / 2, gridWidth / 2],
        [gridWidth / 2, (gridWidth / 2) - 1]
    );
    let fruit = playArea.querySelector(".fruit");
    if(fruit != undefined) {fruit.classList.remove("fruit")};
    renderSnake();
    placeFruit();
    gameClock = setInterval(addTime, gameSpeed);
};

// Creates the game cycle
const addTime = () => {
    moveSnake();
    checkSelfSnakeBite();
    checkFruitEaten();
};

// Renders the snake
const renderSnake = () => {
    let currentPixels = playArea.querySelectorAll(".snake");
    currentPixels.forEach((currentSnakePixel) => {
        currentSnakePixel.classList.remove("snake");
    });
    snake.forEach((section) => {
        let snakePixel = document.querySelector(`div[y="${section[0]}"][x="${section[1]}"]`);
        snakePixel.classList.add("snake");
    });
};

// Moves the snake
const moveSnake = () => {
    // adds a copy of the head to the front of the snake array
    snake.unshift(snake[0].slice());
    // sets the coordinates of the head based on the current direction and postition of the snake
    switch(proposedDirection) {
        case "right":
            snake[0][1] == gridWidth ? snake[0][1] = 1 : ++snake[0][1];
            lastDirection = "right";
        break;
        case "left":
            snake[0][1] == 1 ? snake[0][1] = gridWidth : --snake[0][1];
            lastDirection = "left";
        break;
        case "up":
            snake[0][0] == 1 ? snake[0][0] = gridWidth : --snake[0][0];
            lastDirection = "up";
        break;
        case "down":
            snake[0][0] == gridWidth ? snake[0][0] = 1 : ++snake[0][0];
            lastDirection = "down";
    };
    // extends the snake if its eating
    snakeEating == "false" ? snake.pop() : snakeEating = "false";
};

// Place fruit randomly in a square on the board which isn't where the snake is
const placeFruit = () => {
    let y = Math.floor(Math.random() * gridWidth) + 1;
    let x = Math.floor(Math.random() * gridWidth) + 1;
    let potentialFruitPixel = document.querySelector(`div[y="${y}"][x="${x}"]`);
    (potentialFruitPixel.classList.contains("snake")) ? placeFruit() : potentialFruitPixel.classList.add("fruit");
};

// Checks for directional button changes
document.addEventListener('keydown', (e) => {
    if(lastDirection != directionalKeys[e.key][0]) {
        console.log("yeah you pressed a thing");
        proposedDirection = directionalKeys[e.key][1]
    };
}, false)

// Checks if the snake eats the fruit
const checkFruitEaten = () => {
    let fruit = document.querySelector(".fruit");
    if(fruit.classList.contains("snake")) {
        score++;
        fruit.classList.remove("fruit");
        snakeEating = "true";
        placeFruit();
    };
};

// Checks if the snake bites itself by checking for duplicates in the array
const checkSelfSnakeBite = () => {
    let countDuplicates = snake.length - new Set( snake.map(JSON.stringify) ).size;
    countDuplicates <= 0 ? renderSnake() : gameStatus = endGame();
};

// Ends the game
const endGame = () => {
    clearInterval(gameClock);
    startButton.innerHTML = "Restart";
    startButton.classList.remove("active");
};

// add start and restart buttons
// add score for each fruit
// add timer


// head - up down right left
// straight body - up down right left
// corner - left right
// tail - up down right left

// head = current direction
// straight body = current direction
// corner = next move's direction is not equal to previous move's direction

// heads can become straight body, corner, tail

// straight body can become tail

// corner can become a tail

// tail can become blank