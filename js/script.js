window.addEventListener('DOMContentLoaded', ()=> {
    'use strict';

    const startBtn = document.querySelector('.start'),
          resetBtn = document.querySelector('.reset'),
          vehicle = document.querySelector('.car');
    
    function vehicleAnimation(){
        let position = -200,
        startAnimation;

        let animationHandler = (pause) => {
            if(pause === 'pause'){
                cancelAnimationFrame(startAnimation);
            }else{
                startAnimation = requestAnimationFrame(animationHandler);
                position+=2;
                vehicle.style.left = position * 2 + 'px'; 

                if(position > 500){
                cancelAnimationFrame(startAnimation);
                }
            }
            
            
        };

        let condition = false;
        startBtn.addEventListener('click', ()=> {
            if(!condition){
                condition = true;
                animationHandler();
            } else {
                condition = false;
                animationHandler('pause');
            }
        });


        resetBtn.addEventListener('click', () => {
            cancelAnimationFrame(startAnimation);
            position = -200;
            vehicle.style.left = "-200px";
            condition = false;
        });
    }
    vehicleAnimation();
});