import { gridWidth } from './settings.js';

export const renderGrid = () => {
    for(let i = 0; i < (gridWidth * gridWidth); i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.setAttribute("y", `${Math.trunc((i / gridWidth) + 1)}`);
        pixel.setAttribute("x", `${i + 1 <= gridWidth ? i + 1 : (i + 1) - (gridWidth * (pixel.getAttribute("Y") - 1))}`);
        playArea.append(pixel);
    };
};