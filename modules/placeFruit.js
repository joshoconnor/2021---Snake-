import { gridWidth } from './settings.js';

export const placeFruit = () => {
    let y = Math.floor(Math.random() * gridWidth) + 1;
    let x = Math.floor(Math.random() * gridWidth) + 1;
    let fruit = document.querySelector(`div[y="${y}"][x="${x}"]`);
    (fruit.classList.contains("snake")) ? placeFruit() : fruit.classList.add("fruit");
};