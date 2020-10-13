window.addEventListener("DOMContentLoaded", function(){
    
    'use strict';
    
    let personInput = "dasdas sdd";
    function checkType(data){
        if (isNaN(data) && data.match(/\d/g) === null){
            let placeholder = data.replace(/ +/g, ' ').trim();
            if (placeholder.length > 30) {
                return (placeholder.substr(0,29) + "...")
            }else{
                return placeholder
            }
        } else {
            return ("Entered value is not a string!")
        }
    }

    console.log(checkType(personInput));

   
})