'use strict';

const todoControl = document.querySelector(".todo-control "), 
      headerInput = document.querySelector(".header-input"),
      todoList = document.querySelector(".todo-list"),
      todoCompleted = document.querySelector(".todo-completed");

function checkLocalStorage(){
    if(localStorage.getItem('toDoData') === null){
        let toDoData = [];
        localStorage.setItem('toDoData', JSON.stringify(toDoData)); 
        return toDoData;
    }else{
        let toDoData = JSON.parse(localStorage.getItem('toDoData'));
        return toDoData; 
    }
}


const render = function() {

    let todoData = checkLocalStorage();

    todoList.textContent = "";
    todoCompleted.textContent = "";

    todoData.forEach(function(item,i){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
        '<div class="todo-buttons">' +
				'<button class="todo-remove"></button>' +
				'<button class="todo-complete"></button>' +
        '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
         
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.setItem('toDoData', JSON.stringify(todoData));
            render();
        });

        const toDoRemove = li.querySelector('.todo-remove');
        toDoRemove.addEventListener('click', function(){
            todoData.splice(i,1);
            localStorage.setItem('toDoData', JSON.stringify(todoData));
            render();
        })

        
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    let todoData = checkLocalStorage();

    if (headerInput.value.trim() !== ""){
        const newTodo = {
            value: headerInput.value,
            completed: false  
        };
        todoData.push(newTodo);
        localStorage.setItem('toDoData', JSON.stringify(todoData));
    }
    
    headerInput.value = "";

    render();
});

render();



