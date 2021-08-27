import { gridWidth, gameSpeed, snake } from './modules/settings.js';
import { renderGrid } from './modules/renderGrid.js';
import { placeFruit } from './modules/placeFruit.js';
import { coordinateHead } from './modules/coordinateHead.js';
import { createHead } from './modules/createHead.js';
import { checkSelfSnakeBite } from './modules/checkSelfSnakeBite.js';
import { determineBodyPart } from './modules/determineBodyPart.js';
import { checkFruitEaten } from './modules/checkFruitEaten.js';

export var gameClock, proposedDirection, lastDirection, score;
export const editScore = (newScore) => {
    score = newScore;
};

// Creates the start button
const playArea = document.querySelector("#playArea");
playArea.innerHTML = `<button class="start-button">Start</button>`

// Listens for the click to start the game
var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
    startButton.classList.add("active");
    startGame();
});

renderGrid();

// Checks for directional button changes
const directionalKeys = {
    "d" : ["left", "right"],
    "a" : ["right", "left"],
    "w" : ["down", "up"],
    "s" : ["up", "down"]
};
document.addEventListener('keydown', (e) => {
    if(!directionalKeys[e.key]) return;
    if(lastDirection != directionalKeys[e.key][0]) {
        proposedDirection = directionalKeys[e.key][1]
    };
}, false);

const startGame = () => {
    proposedDirection = "right";
    score = 0;
    snake.length = 0;
    snake.unshift({
        y: gridWidth / 2,
        x: (gridWidth / 2) - 1,
        direction: "right",
        bodyPart: "head"
    }, {
        y: gridWidth / 2,
        x: (gridWidth / 2) -2,
        direction: "right",
        bodyPart: "tail"
    });
    placeFruit();
    gameClock = setInterval(gameLoop, gameSpeed);
};

const gameLoop = () => {
    createHead();
    coordinateHead();
    determineBodyPart(snake[0], snake[1]);
    lastDirection = proposedDirection;
    checkFruitEaten();
    checkSelfSnakeBite();
};

export const endGame = () => {
    clearInterval(gameClock);
    let fruit = playArea.querySelector(".fruit");
    fruit.classList.remove("fruit");
    startButton.innerHTML = "Restart";
    startButton.classList.remove("active");
};