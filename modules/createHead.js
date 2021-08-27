import { proposedDirection } from '../script.js';
import { snake } from './settings.js';

export const createHead = () => {
    snake.unshift({
        y: snake[0].y,
        x: snake[0].x,
        direction: proposedDirection,
        bodyPart: "head"
    });
};