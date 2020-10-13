window.addEventListener("DOMContentLoaded", function(){
    
    'use strict';
    
    let personInput = "    Hello World!   ";
    function checkType(data){
        if (typeof data != 'string'){
            return ("Entered value is not a string!")
        } else {
            let placeholder = data.replace(/ +/g, ' ').trim();
            if (placeholder.length > 30) {
                return (placeholder.substr(0,29) + "...")
            }else{
                return placeholder
            }
        }
    }

    console.log(checkType(personInput));
})