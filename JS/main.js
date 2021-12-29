// typing effect script
if ($(".text-slider1").length == 1) {
    var typed_strings = "Productivity++"
    var typed = new Typed(".text-slider1", {
        strings: typed_strings.split(", "),
        typeSpeed: 80,
        loop: true,
        backDelay: 900,
        backSpeed: 30,
    });
}
const toDoInput = document.querySelector('.todo-input');
const priorityInput = document.querySelector('.todo-input1');
const deadlineInput = document.querySelector('.todo-input2');
const time_lengthInput = document.querySelector('.todo-input3');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

function addToDo(event) {
    event.preventDefault();
    if (toDoInput.value === '' || priorityInput.value === '' || deadlineInput.value === '' || time_lengthInput.value === '') {
        alert("You must write something!");
    } 
    else {
        let todo = toDoInput.value;
        let priority = priorityInput.value;
        let deadline = deadlineInput.value;
        let time_length = time_lengthInput.value;
        
        savelocal(todo, priority, deadline, time_length);
        getTodos();

        toDoInput.value = '';
        priorityInput.value = '';
        deadlineInput.value = '';
        time_lengthInput.value = '';
    }
}   


function deletecheck(event){
    const item = event.target;
    if(item.classList[0] === 'delete-btn')
    {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }
}

function savelocal(todo, priority, deadline, time_length) {
    let todos, priorities, deadlines, time_lengths;
    if(localStorage.getItem('todos') === null) {
        todos = [];
        priorities = [];
        deadlines = [];
        time_lengths = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
        priorities = JSON.parse(localStorage.getItem('priorities'));
        deadlines = JSON.parse(localStorage.getItem('deadlines'));
        time_lengths = JSON.parse(localStorage.getItem('time_lengths'));
    }
    todos.push(todo);
    priorities.push(priority);
    deadlines.push(deadline);
    time_lengths.push(time_length);

    for(var i = 0; i < todos.length; i++){ 
        for(var j = 0; j < ( todos.length - i -1 ); j++){
          if(parseInt(priorities[j]) > parseInt(priorities[j+1])){
                var temp1 = todos[j]
                todos[j] = todos[j + 1]
                todos[j+1] = temp1

                var temp2 = priorities[j]
                priorities[j] = priorities[j + 1]
                priorities[j+1] = temp2

                var temp3 = deadlines[j]
                deadlines[j] = deadlines[j + 1]
                deadlines[j+1] = temp3

                var temp4 = time_lengths[j]
                time_lengths[j] = time_lengths[j + 1]
                time_lengths[j+1] = temp4
          }
          else if(parseInt(priorities[j]) == parseInt(priorities[j+1]))
          {
                if(parseInt(deadlines[j]) > parseInt(deadlines[j+1]))
                {
                    var temp1 = todos[j]
                    todos[j] = todos[j + 1]
                    todos[j+1] = temp1
    
                    var temp2 = priorities[j]
                    priorities[j] = priorities[j + 1]
                    priorities[j+1] = temp2
    
                    var temp3 = deadlines[j]
                    deadlines[j] = deadlines[j + 1]
                    deadlines[j+1] = temp3
    
                    var temp4 = time_lengths[j]
                    time_lengths[j] = time_lengths[j + 1]
                    time_lengths[j+1] = temp4
                }
          }
        }
      }
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('priorities', JSON.stringify(priorities));
    localStorage.setItem('deadlines', JSON.stringify(deadlines));
    localStorage.setItem('time_lengths', JSON.stringify(time_lengths));
}

function getTodos() {
    let todos, priorities, deadlines, time_lengths;
    if(localStorage.getItem('todos') === null) {
        todos = [];
        priorities = [];
        deadlines = [];
        time_lengths = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
        priorities = JSON.parse(localStorage.getItem('priorities'));
        deadlines = JSON.parse(localStorage.getItem('deadlines'));
        time_lengths = JSON.parse(localStorage.getItem('time_lengths'));
    }
    
    while(toDoList.firstChild ){
        toDoList.removeChild(toDoList.firstChild );
    }
    todos.forEach(function(todo) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `todo`);
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `button`);
        toDoDiv.appendChild(checked);
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `button`);
        toDoDiv.appendChild(deleted);
        toDoList.appendChild(toDoDiv);
    });
}

function removeLocalTodos(todo){
    let todos, priorities, deadlines, time_lengths;
    if(localStorage.getItem('todos') === null) {
        todos = [];
        priorities = [];
        deadlines = [];
        time_lengths = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
        priorities = JSON.parse(localStorage.getItem('priorities'));
        deadlines = JSON.parse(localStorage.getItem('deadlines'));
        time_lengths = JSON.parse(localStorage.getItem('time_lengths'));
    }
    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    priorities.splice(todoIndex, 1);
    deadlines.splice(todoIndex, 1);
    time_lengths.splice(todoIndex, 1);
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('priorities', JSON.stringify(priorities));
    localStorage.setItem('deadlines', JSON.stringify(deadlines));
    localStorage.setItem('time_lengths', JSON.stringify(time_lengths));
}
