import { snake } from './settings.js';

export const renderSnake = () => {
    // clears the snake from the board
    let currentSnakePixels = playArea.querySelectorAll(".snake");
    currentSnakePixels.forEach((snakePixel) => {
        snakePixel.classList.remove("snake", "left", "right", "up", "down", "head", "tail", "body", "corner-oiio", "corner-iioo", "corner-ooii", "corner-iooi");
    });
    // adds the snake from the array to the board
    snake.forEach((section) => {
        let newSnakePixel = document.querySelector(`div[y="${section.y}"][x="${section.x}"]`);
        newSnakePixel.classList.add("snake", `${section.direction}`, `${section.bodyPart}`);
    });
};