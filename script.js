const playArea = document.querySelector("#playArea");
const gridWidth = 10;
const gameSpeed = 200;
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
    snake.unshift({
        y: gridWidth / 2,
        x: gridWidth / 2,
        direction: proposedDirection,
        bodyPart: "head"
    },
    {
        y: gridWidth / 2,
        x: (gridWidth / 2) -1,
        direction: proposedDirection,
        bodyPart: "tail"
    });
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
    // clears the snake from the board
    let currentPixels = playArea.querySelectorAll(".snake");
    currentPixels.forEach((currentSnakePixel) => {
        currentSnakePixel.classList.remove("snake", "left", "right", "up", "down", "head", "tail", "body", "corner-oiio", "corner-iioo", "corner-ooii", "corner-iooi");
    });
    // adds the snake from the array to the board
    snake.forEach((section) => {
        let newSnakePixel = document.querySelector(`div[y="${section.y}"][x="${section.x}"]`);
        newSnakePixel.classList.add("snake", `${section.direction}`, `${section.bodyPart}`);
    });
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
    if(snake.length >= 3) {whichBodyPart();};
    // sets the coordinates of the head based on the current direction and postition of the snake
    switch(proposedDirection) {
        case "right":
            snake[0].x == gridWidth ? snake[0].x = 1 : ++snake[0].x;
            lastDirection = "right";
        break;
        case "left":
            snake[0].x == 1 ? snake[0].x = gridWidth : --snake[0].x;
            lastDirection = "left";
        break;
        case "up":
            snake[0].y == 1 ? snake[0].y = gridWidth : --snake[0].y;
            lastDirection = "up";
        break;
        case "down":
            snake[0].y == gridWidth ? snake[0].y = 1 : ++snake[0].y;
            lastDirection = "down";
    };
    // extends the snake if its eating
    if(snakeEating == "false") {
        snake.pop();
        snake[(snake.length) - 1].bodyPart = "tail";
        snake[(snake.length) - 1].direction = snake[(snake.length) - 2].direction;
    } else {
        snakeEating = "false";
    };
};

// works out what the body part of the section behind the snake's head is
const whichBodyPart = () => {
    if(snake[1].direction == snake[0].direction) {
        snake[1].bodyPart = "body"
    } else {
        switch(snake[1].direction) {
            case "right":
                switch(snake[0].direction) {
                    case "up":
                        snake[1].bodyPart = "corner-oiio"
                    break;
                    case "down":
                        snake[1].bodyPart = "corner-iioo"
                    break;
                }
            break;
            case "left":
                switch(snake[0].direction) {
                    case "up":
                        snake[1].bodyPart = "corner-ooii"
                    break;
                    case "down":
                        snake[1].bodyPart = "corner-iooi"
                    break;
                }
            break;
            case "up":
                switch(snake[0].direction) {
                    case "right":
                        snake[1].bodyPart = "corner-iooi"
                    break;
                    case "left":
                        snake[1].bodyPart = "corner-iioo"
                    break;
                }
            break;
            case "down":
                switch(snake[0].direction) {
                    case "right":
                        snake[1].bodyPart = "corner-ooii"
                    break;
                    case "left":
                        snake[1].bodyPart = "corner-oiio"
                    break;
                };
        };
    };
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
        sectionArray = [section.x, section.y];
        snakeCoordinates.unshift(sectionArray);
    });
    let countDuplicates = snakeCoordinates.length - new Set( snakeCoordinates.map(JSON.stringify) ).size;
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


// every turn you must clear the head 