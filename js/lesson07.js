document.addEventListener("DOMContentLoaded", function(){
    'use strict';

    let currentDate = new Date(),
        currentDay = currentDate.getDay(),
        week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"];

    week.forEach(function(item, i) {

        if ((i+1) == currentDay) {
            console.log(item.bold()); 
        }else if(item === "Суббота" || item === "Воскресение"){
            console.log(item.italics());
        }else{
            console.log(item);
        }
    });

   



})