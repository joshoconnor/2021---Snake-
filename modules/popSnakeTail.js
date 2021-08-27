import { snake } from './settings.js';

export const popSnakeTail = () => {
    snake.pop();
    snake[(snake.length) - 1].bodyPart = "tail";
    snake[(snake.length) - 1].direction = snake[(snake.length) - 2].direction;
};