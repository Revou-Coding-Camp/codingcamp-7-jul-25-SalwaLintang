const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const filterInput = document.getElementById('filter-input');

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = todoDate.value;

    if (task === '' || date === '') {
        alert('Please fill in both the task and date fields!');
        return;
    }

    addTodo(task, date);
    todoInput.value = '';
    todoDate.value = '';
});

function addTodo(task, date) {
    const li = document.createElement('li');
    li.textContent = `${task} (Due: ${date})`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

filterInput.addEventListener('keyup', function () {
    const filter = filterInput.value.toLowerCase();
    const items = todoList.getElementsByTagName('li');
    Array.from(items).forEach(function (item) {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? '' : 'none';
    });
});
