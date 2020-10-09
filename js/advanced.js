window.addEventListener('DOMContentLoaded',function() {
    'use strict';
    // Variables declaration
    let num = 266219;

    //Calculate the sum of all characters in one number
    function sumCalculate(number){
        let a = number.toString();
        let sumNumber = 1;
        for (let i = 0; i < a.length; i++) {
            sumNumber = +a[i] * sumNumber;
        }
        return sumNumber;
    }
    
    console.log(sumCalculate(num)); //1296
    console.log(sumCalculate(num) ** 3); //2176782336
    console.log((sumCalculate(num) ** 3).toString().substr(0,2)); //21
    

});

