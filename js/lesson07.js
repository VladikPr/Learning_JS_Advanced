document.addEventListener("DOMContentLoaded", function(){
    'use strict';

    let currentDate = new Date(),
        currentDay = currentDate.getDay(),
        week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
        div;

    week.forEach(function(item, i) {

        if ((i+1) == currentDay) {
            div = document.createElement('div');
            document.body.appendChild(div);
            div.textContent = item; 
            div.style.fontWeight = "bold";
        }else if(item === "Суббота" || item === "Воскресение"){
            div = document.createElement('div');
            document.body.appendChild(div);
            div.textContent = item; 
            div.style.fontStyle = "italic";
        }else{
            let div = document.createElement('div');
            document.body.appendChild(div)
            div.textContent = item; 
        }

    });

   



})