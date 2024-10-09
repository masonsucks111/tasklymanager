let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Dark mode toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// Load dark mode preference
if (JSON.parse(localStorage.getItem('darkMode'))) {
    document.body.classList.add('dark');
}

// Add a new task
function addTask() {
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;
    const tags = document.getElementById("task-tags").value.split(",").map(tag => tag.trim());
    const category = document.getElementById("task-category").value;
    const recurring = document.getElementById("task-recurring").checked;

    if (title && date) {
        const task = { title, desc, date, priority, tags, category, recurring, completed: false };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        clearForm();
    } else {
        alert("Please enter a task title and due date.");
    }
}

// Render tasks
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", task.priority.toLowerCase());
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.desc}</p>
            <p><strong>Due:</strong> ${task.date}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <p><strong>Tags:</strong> ${task.tags.join(", ")}</p>
            <p><strong>Recurring:</strong> ${task.recurring ? "Yes" : "No"}</p>
            <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        if (task.completed) {
            taskDiv.style.textDecoration = "line-through";
            taskDiv.style.opacity = 0.6;
        }
        taskList.appendChild(taskDiv);
    });
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Clear form
function clearForm() {
    document.getElementById("task-title").value = '';
    document.getElementById("task-desc").value = '';
    document.getElementById("task-date").value = '';
    document.getElementById("task-priority").value = 'High';
    document.getElementById("task-tags").value = '';
    document.getElementById("task-category").value = 'Work';
    document.getElementById("task-recurring").checked = false;
}

// Initial render of tasks
renderTasks();
