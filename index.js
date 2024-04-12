//Display Function for rendering after each 
function displayTask(){
    var highPriorityContainer = document.getElementById(highPriorityContainer)
    var lowPriorityContainer = document.getElementById(lowPriorityContainer)
    highPriorityContainer.innerHTML = '';
    lowPriorityContainer.innerHTML ='';

    var today = new Date();

    highPriorityTasks.forEach(function (task, index){
        var taskItem = createTaskElement(task, index, 'high-priority')
   highPriorityContainer.appendChild(taskItem);
    });

    lowPriorityTasks.forEach(function (task, index){
        var taskItem = createTaskElement(task, index, 'lowPriority');
        lowPriorityContainer.appendChild(taskItem);
    });
    function createTaskElement(task, index, priorityClass){
        var taskItem = document.createElement('div');
        taskItem.className = 'todo-item';
        taskItem.classList.add(priorityClass);

        var checkbox = document.getElementById('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change, function(){
        task.done = this.checked;
        displayTask();
        saveTaskToLcalStorage();});

        var label = document.createElement('label');
        label.textContent = task.description + '(Deaadline:' + task.deadline +')';
        if(task.done){
            label.style.textDecoration = 'line-through';
        }

        var deleteButton = document.createElement('button');
        deleteButton.classButton = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', function(){
            if (priorityClass =='high-priority'){
                highPriorityTasks.splice(index, 1);
            } else {
                lowPriorityTasks.splice(index, 1);
            }
            displayTask();
            saveTaskToLcalStorage()
        });
        taskItem.appendChild();
        taskItem.appendChild(label);
        taskItem.appendChild(deleteButton);

        return taskItem;
    }

    //Saving to Local Storage
    function saveTaskToLcalStorage() {
        localStorage.setItem('highPriorityTask',JSON.stringify
        (highPriorityTasks));
        localStorage.setItem('lowPriorityTask', JSON.stringify 
        (lowPriorityTasks));
    }
    //Loading Tasks from Local Storage
    function loadTasksFromLocalStorage(){
        var storedHighPriorityTasks = localStorage.getItem
        ('highPriorityTasks');
        var storedLowPriorityTasks = localStorage.getItem
        ('lowPriorityTasks');

        if (storedHighPriorityTasks) {
            highPriorityTasks = JSON.parse(storedHighPriorityTasks);
        }
        if (storedHighPriorityTasks){
            lowPriorityTasks = JSON.parse(storedLowPriorityTasks);
        }
        displayTask();
    }
    // Adding New Task
    document.getElementById('addButton').addEventListener('click', function (){
        var taskInput = document.getElementById('taskInput');
        var deadlineInput = document.getElementById('deadlineInput');
        
        if (taskInput.value !== '') {
            var newTask = {
                description: taskInput.value,
                deadline: deadlineInput.value, //include the deadline value
                done: false,
            };
            if (deadlineInput.value !== '')
            var taskDeadline = new Date(deadlineInput.vale);
            var today = new Date();

           //Set the time of today's date to 23:59:59 to include the entire day
        
        today.setHours(23, 59, 59, 999);
    if(taskDeadline.getTime() <= today.getTime()){
     highPriorityTasks.push(newTask);
    } else{
        lowPriorityTasks.push(newTask);
    }
    } else {
        // If deadline not provided, consider it as a low priority
        lowPriorityTasks.push(newTask); 
    }

    displayTask();
    saveTaskToLcalStorage();

    taskInput = '';
   deadlineInput.value = ''; //Reset the deadline input value
    }
});
    loadTasksFromLocalStorage();
