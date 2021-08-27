import { proposedDirection } from '../script.js';
import { snake, gridWidth } from './settings.js';

export const coordinateHead = () => {
    switch(proposedDirection) {
        case "right":
            snake[0].x == gridWidth ? snake[0].x = 1 : ++snake[0].x;
        break;
        case "left":
            snake[0].x == 1 ? snake[0].x = gridWidth : --snake[0].x;
        break;
        case "up":
            snake[0].y == 1 ? snake[0].y = gridWidth : --snake[0].y;
        break;
        case "down":
            snake[0].y == gridWidth ? snake[0].y = 1 : ++snake[0].y;
    };
};