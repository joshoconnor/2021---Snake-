const playArea = document.querySelector("#playArea");
const gridWidth = 10;
const gameSpeed = 200;
const snake = [
    [gridWidth / 2, gridWidth / 2],
    [gridWidth / 2, (gridWidth / 2) - 1]
];
var intervalID;
var direction = "right";
var snakeEating = "false";

// Creates the grid with x and y coordinates
for(let i = 0; i < (gridWidth * gridWidth); i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("y", `${Math.trunc((i / gridWidth) + 1)}`);
    pixel.setAttribute("x", `${i + 1 <= gridWidth ? i + 1 : (i + 1) - (gridWidth * (pixel.getAttribute("Y") - 1))}`);
    playArea.append(pixel);
};

// Starts the game
const startGame = () => {
    renderSnake();
    placeFruit();
    intervalID = setInterval(addTime, gameSpeed);
};

// Creates the gameclock
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
    switch(direction) {
        case "right":
            snake[0][1] == gridWidth ? snake[0][1] = 1 : ++snake[0][1];
        break;
        case "left":
            snake[0][1] == 1 ? snake[0][1] = gridWidth : --snake[0][1];
        break;
        case "up":
            snake[0][0] == 1 ? snake[0][0] = gridWidth : --snake[0][0];
        break;
        case "down":
            snake[0][0] == gridWidth ? snake[0][0] = 1 : ++snake[0][0];
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
document.onkeydown = checkKey;
function checkKey(e) {
    if(e.keyCode == '68' && direction != "left") {
        direction = "right";
    }
    else if(e.keyCode == '65' && direction != "right") {
        direction = "left";
    }
    else if(e.keyCode == '87' && direction != "down") {
        direction = "up";
    }
    else if(e.keyCode == '83' && direction != "up") {
        direction = "down";
    };
};

// Checks if the snake eats the fruit
const checkFruitEaten = () => {
    let fruit = document.querySelector(".fruit");
    if(fruit.classList.contains("snake")) {
        fruit.classList.remove("fruit");
        snakeEating = "true";
        placeFruit();
    };
};

// Checks if the snake bites itself
const checkSelfSnakeBite = () => {
    // kills snake if it bites itself by checking for duplicates in the array
    let countDuplicates = snake.length - new Set( snake.map(JSON.stringify) ).size;
    console.log(countDuplicates)
    countDuplicates <= 0 ? renderSnake() : gameStatus = endGame();
};

// Ends the game
const endGame = () => {
    clearInterval(intervalID);
};

// add start and restart buttons
// add score for each fruit
// add timer