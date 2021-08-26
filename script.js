import { gridWidth, gameSpeed, snake } from './modules/settings.js';
import { renderGrid } from './modules/renderGrid.js';
import { renderSnake } from './modules/renderSnake.js';
import { placeFruit } from './modules/placeFruit.js';
import { determineBodyPart } from './modules/determineBodyPart.js';

const playArea = document.querySelector("#playArea");
const directionalKeys = {
    "d" : ["left", "right"],
    "a" : ["right", "left"],
    "w" : ["down", "up"],
    "s" : ["up", "down"]
};

var gameClock, proposedDirection, lastDirection, snakeEating, score;

// Creates the start button
playArea.innerHTML = `<button class="start-button">Start</button>`
var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    startButton.classList.add("active");
    startGame();
});
renderGrid();

// Creates the Score


// Starts the game
const startGame = () => {
    snakeEating = "false";
    proposedDirection = "right";
    score = 0;
    snake.length = 0;
    snake.unshift({
        y: gridWidth / 2,
        x: gridWidth / 2,
        direction: "right",
        bodyPart: "head"
    }, {
        y: gridWidth / 2,
        x: (gridWidth / 2) -1,
        direction: "right",
        bodyPart: "tail"
    });
    let fruit = playArea.querySelector(".fruit");
    if(fruit != null) {fruit.classList.remove("fruit")};
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

// Moves the snake
const moveSnake = () => {
    // adds a copy of the head to the front of the snake array
    snake.unshift({
        y: snake[0].y,
        x: snake[0].x,
        direction: proposedDirection,
        bodyPart: "head"
    });

    determineBodyPart(snake[0], snake[1]);

    let head = snake[0];
    // sets the coordinates of the head based on the current direction and postition of the snake
    switch(proposedDirection) {
        case "right":
            head.x == gridWidth ? head.x = 1 : ++head.x;
        break;
        case "left":
            head.x == 1 ? head.x = gridWidth : --head.x;
        break;
        case "up":
            head.y == 1 ? head.y = gridWidth : --head.y;
        break;
        case "down":
            head.y == gridWidth ? head.y = 1 : ++head.y;
    };
    lastDirection = proposedDirection;
    
    // extends the snake if its eating
    if(snakeEating == "false") {
        snake.pop();
        snake[(snake.length) - 1].bodyPart = "tail";
        snake[(snake.length) - 1].direction = snake[(snake.length) - 2].direction;
    } else {
        snakeEating = "false";
    };
};

// Checks for directional button changes
document.addEventListener('keydown', (e) => {
    if(!directionalKeys[e.key]) return;
    if(lastDirection != directionalKeys[e.key][0]) {
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
    let snakeCoordinates = []
    snake.forEach(section => {
        let sectionArray = [section.x, section.y];
        snakeCoordinates.unshift(sectionArray);
    });
    let countDuplicates = snakeCoordinates.length - new Set( snakeCoordinates.map(JSON.stringify) ).size;
    countDuplicates <= 0 ? renderSnake() : endGame();
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