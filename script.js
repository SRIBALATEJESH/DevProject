// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add to DOM
    addTaskToDOM(task);

    // Save to localStorage
    saveTasks();

    // Clear input
    taskInput.value = '';
    taskInput.focus();
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
        li.classList.add('completed');
    }
    li.id = task.id;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${escapeHtml(task.text)}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add event listeners
    const checkbox = li.querySelector('.task-checkbox');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach((item) => {
        tasks.push({
            id: item.id,
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((task) => {
            addTaskToDOM(task);
        });
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}