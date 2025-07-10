document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");
  const addBtn = document.getElementById("add-btn");
  const list = document.getElementById("todo-list");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const filterBtn = document.getElementById("filter-btn");

  let todos = [];
  let showCompleted = true;

  function renderTodos() {
    list.innerHTML = "";
    const filtered = showCompleted ? todos : todos.filter(todo => !todo.completed);

    if (filtered.length === 0) {
      list.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
      return;
    }

    filtered.forEach((todo, index) => {
      const row = document.createElement("tr");
      if (todo.completed) row.classList.add("completed");

      row.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.completed ? "Done" : "Pending"}</td>
        <td>
          <button onclick="completeTodo(${index})">${todo.completed ? "Undo" : "Done"}</button>
          <button onclick="deleteTodo(${index})">Delete</button>
        </td>
      `;

      list.appendChild(row);
    });
  }

  window.completeTodo = function(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  };

  window.deleteTodo = function(index) {
    todos.splice(index, 1);
    renderTodos();
  };

  addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
      alert("Please enter a task and date.");
      return;
    }

    todos.push({ task, date, completed: false });
    input.value = "";
    dateInput.value = "";
    renderTodos();
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      todos = [];
      renderTodos();
    }
  });

  filterBtn.addEventListener("click", () => {
    showCompleted = !showCompleted;
    filterBtn.textContent = showCompleted ? "FILTER" : "SHOW ALL";
    renderTodos();
  });

  renderTodos();
});