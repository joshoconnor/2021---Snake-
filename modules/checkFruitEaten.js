import { editScore, score } from "../script.js";
import { placeFruit } from "./placeFruit.js";
import { popSnakeTail } from "./popSnakeTail.js";

export const checkFruitEaten = () => {
    let fruit = document.querySelector(".fruit");
    if(fruit.classList.contains("snake")) {
        editScore(score + 1);
        fruit.classList.remove("fruit");
        placeFruit();
    } else {
        popSnakeTail();
    }
};