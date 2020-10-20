window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    
    let longTime = document.createElement('div');
    let shortTime = document.createElement('div');
    let empty = document.createElement('div');

    longTime.style.fontWeight = "bold";
    shortTime.style.fontWeight = "bold";
    empty.style.height = "30px";

    document.body.insertAdjacentElement('beforeend', longTime);
    document.body.insertAdjacentElement('beforeend', empty);
    document.body.insertAdjacentElement('beforeend', shortTime);

    function twoCharacters(number){
        
        console.log();
        if ((number.toString()).length < 2){
            return ("0"+number);
        }else{
            return number;
        }
    }

    function getTime(){
        
        let appTimer = {
            currentDate: new Date(),
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth() + 1,
            currentDay: new Date().getDay(),
            currentDayDate: new Date().getDate(),
            currentHour: new Date().getHours(),
            currentMinute: new Date().getMinutes() + 1,
            currentSeconds: new Date().getSeconds() + 1,  
        hourEnd: function() {
            let time = appTimer.currentDate.getHours();

            if (time === 1 || time === 21) {
                return "час";
            }else if ((time > 1 && time <=4) || (time > 21 && time <=24)) {
                return "часа";
            }else if (time > 4 || time < 21) {
                return "часов";
            }
        },
        minuteEnd: function(){
            let time = appTimer.currentDate.getMinutes();
            
            if (time === 1 || time === 21 || time === 31 || time === 41 || time === 51){
                return "минута";
            } else if ((time >= 2 && time <=4 ) || (time >= 22 && time <=24 ) || (time >= 32 && time <=34 )  || (time >= 42 && time <=44 ) || (time >= 52 && time <=54 )) {
                return "минуты";
            }else{
                return "минут";
            }
        },
        secondEnd: function(){
            let time = appTimer.currentDate.getSeconds();
            if (time === 1 || time === 21 || time === 31 || time === 41 || time === 51){
                return "секунда";
            } else if ((time >= 2 && time <=4 ) || (time >= 22 && time <=24 ) || (time >= 32 && time <=34 )  || (time >= 42 && time <=44 ) || (time >= 52 && time <=54 )) {
                return "секунды";
            }else{
                return "секунд";
            }
        },
        getCurrentMonth: function(){
            let monthYear;
            const month = ["","января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

            month.forEach((item, i)=>{
                if(i === appTimer.currentMonth){

                    monthYear = item;
                }
            });

            return monthYear;

        },
        getCurrentDay: function(){
            let day;
            const week = ["","Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"];

            week.forEach((item, i)=>{
                if(i === appTimer.currentDay){
                    day = item;
                }
            });

            return day;
        },
        
    }

    return appTimer
    }
   
    function updateClock(a) {
        let timer = getTime();

        if(a === 1){
            longTime.textContent = `a) Сегодня ${timer.getCurrentDay()}, ${timer.currentDayDate} ${timer.getCurrentMonth()} ${timer.currentYear} года, ${timer.currentHour} ${timer.hourEnd()} ${timer.currentMinute} ${timer.minuteEnd()} ${timer.currentSeconds} ${timer.secondEnd()}`;
        }else if (a === 2) {
            shortTime.textContent = `b) ${twoCharacters(timer.currentDayDate)}.${twoCharacters(timer.currentMonth)}.${timer.currentYear} - ${twoCharacters(timer.currentHour)}:${twoCharacters(timer.currentMinute)}:${twoCharacters(timer.currentSeconds)}`
        }
        
        


    }

    setInterval(() => {
        updateClock(1);
        updateClock(2);
    }, 1000);

    


})
