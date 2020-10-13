window.addEventListener('DOMContentLoaded',function() {
    'use strict';
    //lesson 02
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
    
    //lesson 03
    let lang = 'ru';
    let weekDays;
    //1
    //a
    if (lang == 'ru'){
        weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        weekDays.forEach(function(i){
            console.log(i);
        });
    }else if (lang == 'en'){
        weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        weekDays.forEach(function(i){
            console.log(i);
        });
    };

    //b
    switch(lang) {
        case 'ru':
            console.log(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']);
            break
        case 'en':
            console.log(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
    };

    //c
    lang = 'ru';
        weekDays = {
            'ru':['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            'en':['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        };

        console.log(weekDays[lang])

    //2
    let namePerson = prompt("ВВедите свое имя", "");
    
    namePerson = 'Артем' ? console.log("директор") : namePerson = 'Максим' ? console.log("преподователь") : console.log("студент"); 

        

});

