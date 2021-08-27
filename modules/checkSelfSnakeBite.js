import { snake } from './settings.js';
import { renderSnake } from './renderSnake.js';
import { endGame } from '../script.js';

export const checkSelfSnakeBite = () => {
    let snakeCoordinates = []
    snake.forEach(section => {
        let sectionArray = [section.x, section.y];
        snakeCoordinates.unshift(sectionArray);
    });
    let countDuplicates = snakeCoordinates.length - new Set( snakeCoordinates.map(JSON.stringify) ).size;
    countDuplicates <= 0 ? renderSnake() : endGame();
};