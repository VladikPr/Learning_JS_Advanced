'use strict';


const listItems = document.getElementById('list-items'),
      inputText = document.getElementById('input-text'),
      btn = document.getElementById('btn');

function newLi(){
    if (inputText.value.trim() !== "") {
        let li = document.createElement('li');
        li.textContent = inputText.value;
        listItems.append(li);
        inputText.value = "";
    }
    
}

btn.addEventListener('click', function(event){
    event.preventDefault();
    newLi();
    btn.blur();
});