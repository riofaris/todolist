//SELECTORS!
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT-LISTENERS!
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo); 
todoList.addEventListener('click', DeleteCheck);
filterOption.addEventListener('click', filterTodo);


//FUNCTIONS!
//prevent form from submitting
function addTodo(event){
    event.preventDefault();
//Todo Div
const todoDiv = document.createElement('div');
todoDiv.classList.add("todo");
//Create LI
const newTodo = document.createElement('li');
newTodo.innerText = todoInput.value;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);
//Add TODO to LocalStorage
saveLocalTodos(todoInput.value);
//Completed button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//Trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
//Append To list
todoList.appendChild(todoDiv);
//Clear TODO INPUT VALUE
todoInput.value = "";
};


function DeleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });   
    }
    //Check TODO
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
//Filter Function
function filterTodo(e) {
  const  todos =  todoList.childNodes;
  todos.forEach(function(todo) {
      switch(e.target.value){
          case "all":
              todo.style.display = "flex";
            break;
          case "completed":
              if(todo.classList.contains("completed")){
                  todo.style.display = "flex";
              } else {
                  todo.style.display = "none";
              }
              break;
          case "uncompleted":
              if(!todo.classList.contains("completed")) {
                  todo.style.display = "flex";
              } else {
                  todo.style.display = "none";
              }
              break;
         }
      });  
};

//Save to local
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Todo Div
const todoDiv = document.createElement('div');
todoDiv.classList.add("todo");
//Create LI
const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);

//Completed button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);
//Trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
//Append To list
todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
