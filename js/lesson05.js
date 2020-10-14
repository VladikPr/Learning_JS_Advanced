window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //1
    let arr = ['1200', '22560', '9000', '456782', '9999', '200300', '48956'];

    arr.forEach(function(item){
        if (item[0] == '2'){
            console.log(item);
        }else if (item[0] == '4') {
            console.log(item);
        }
    });



    //2
    let num=[];

    for (let i = 2; i <= 100; i++){
        if(i==2){
            num.push(i);
        }else{
            for (let x = 2; x < i; x++){
                if(i % x == 0){
                    break
                }else if(i == x + 1){
                 num.push(i);
                }
            }
        }
    };
    
    console.log(num);


})


