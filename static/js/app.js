async function fetchTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.done) li.style.textDecoration = "line-through";
        li.onclick = () => toggleTask(task.id);
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById('new-task');
    const text = input.value.trim();
    if (text) {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        input.value = '';
        fetchTasks();
    }
}

async function toggleTask(id) {
    await fetch(`/tasks/${id}`, { method: 'PUT' });
    fetchTasks();
}

window.onload = fetchTasks;
