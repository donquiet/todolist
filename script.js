document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addButton = document.getElementById('add-task-button');

    addButton.addEventListener('click', addTask);
    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                taskList.removeChild(newTask);
                saveTasks();
            };
            newTask.appendChild(deleteButton);
            taskList.appendChild(newTask);
            taskInput.value = '';
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.childNodes.forEach(task => {
            tasks.push(task.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            savedTasks.forEach(taskText => {
                const newTask = document.createElement('li');
                newTask.textContent = taskText;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => {
                    taskList.removeChild(newTask);
                    saveTasks();
                };
                newTask.appendChild(deleteButton);
                taskList.appendChild(newTask);
            });
        }
    }
});