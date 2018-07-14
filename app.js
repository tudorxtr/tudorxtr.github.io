// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task!');
    } else {

        // Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

        // Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);

        M.toast({html: 'Task saved!', classes: 'light-blue'});
        taskInput.value = '';
    }
    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            M.toast({html: 'Task removed!', classes: 'light-blue'});

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove Tasks from Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){
    if(confirm('Are you sure?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

        M.toast({html: 'Tasks cleared!', classes: 'light-blue'});

        // Clear from Local Storage
        clearTasksFromLocalStorage();
    }
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
        console.log(item);
    });
}

// Add to Home Screen
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    btnAdd.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice
    .then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
    } else {
        console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
    });
});
  
window.addEventListener('appinstalled', (evt) => {
    app.logEvent('a2hs', 'installed');
});

