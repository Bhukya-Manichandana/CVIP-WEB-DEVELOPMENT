const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let todos = [];

function displayTasks() {
  taskList.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = todo.task;
    listItem.classList.toggle("completed", todo.completed);

    const editButton = createButton("edit", index);
    editButton.addEventListener("click", () => editTask(index));

    const deleteButton = createButton("delete", index);
    deleteButton.addEventListener("click", () => deleteTask(index));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    listItem.addEventListener("click", () => toggleCompleted(index));
    listItem.addEventListener("contextmenu", (e) => deleteTask(e, index));
    taskList.appendChild(listItem);
  });
}

function createButton(action, index) {
  const button = document.createElement("button");
  button.textContent = action === "edit" ? "Edit" : "Delete";
  button.classList.add(action);
  return button;
}

function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  displayTasks();
}

function editTask(index) {
  const newTask = prompt("Edit the task:", todos[index].task);
  if (newTask !== null && newTask.trim() !== "") {
    todos[index].task = newTask.trim();
    displayTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    todos.splice(index, 1);
    displayTasks();
  }
}

taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && taskInput.value.trim() !== "") {
    todos.push({ task: taskInput.value.trim(), completed: false });
    taskInput.value = "";
    displayTasks();
  }
});

displayTasks();
