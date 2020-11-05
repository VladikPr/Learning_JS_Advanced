'use strict';

const inputField = document.querySelector('.input-field'),
    output = document.querySelector('.output');


    const debounce = (fn, delay) =>{
        let timeoutID;
        return (...args) => {
            if(timeoutID){
                clearTimeout(timeoutID);
            }

            timeoutID = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    inputField.addEventListener('input', debounce((e)=> {
            output.textContent = inputField.value;
    }, 300));




