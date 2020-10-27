'use strict';

const wrapper = document.querySelector('.wrapper'),
    color = document.getElementById('color'),
    change = document.getElementById('change');


function generateHexColor(){
    let newColor = "#",
        symbols = "0123456789abcdef";

    for (let i = 0; i < 6; i++){
        newColor = newColor + symbols[Math.floor(Math.random() * 16)];
    }
    color.textContent = newColor;
    change.style.color = newColor;
    wrapper.style.backgroundColor = newColor;
}

change.addEventListener('click', generateHexColor);
