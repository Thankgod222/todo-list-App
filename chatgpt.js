const form = document.getElementById("form");
const input = document.getElementById("form-input");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Listen for adding new tasks
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  addTaskToDOM(text, false);    // create UI
  saveTaskToLocalStorage(text); // store it

  input.value = "";
});

// Add a task to localStorage
function saveTaskToLocalStorage(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Master function to build each <span> task
function addTaskToDOM(text, isCompleted) {
  const span = document.createElement("span");
  span.classList.add("todo-form");

  // Create icons
  const icon = document.createElement("ion-icon");
  icon.setAttribute("name", isCompleted ? "checkbox" : "square-outline");

  const editIcon = document.createElement("ion-icon");
  editIcon.setAttribute("name", "create-outline");
  editIcon.classList.add("edit-icon");
  editIcon.style.marginLeft = "10px";

  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "trash-outline");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.style.marginLeft = "10px";

  const saveIcon = document.createElement("ion-icon");
  saveIcon.setAttribute("name", "save-outline");
  saveIcon.classList.add("save-icon");
  saveIcon.style.marginLeft = "10px";

  // Text node
  const textNode = document.createTextNode(" " + text);

  // Add everything to span
  span.appendChild(icon);
  span.appendChild(editIcon);
  span.appendChild(deleteIcon);
  span.appendChild(saveIcon);
  span.appendChild(textNode);

  // Mark complete if needed
  if (isCompleted) span.classList.add("completed");

  // ===== EVENTS =====

  // Toggle complete
  icon.addEventListener("click", function (e) {
    e.stopPropagation();

    span.classList.toggle("completed");

    // change icon
    if (span.classList.contains("completed")) {
      icon.setAttribute("name", "checkbox");
    } else {
      icon.setAttribute("name", "square-outline");
    }

    updateLocalStorage();
  });

  // Edit
  editIcon.addEventListener("click", function (e) {
    e.stopPropagation();

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = text;
    span.replaceChild(inputField, textNode);
    inputField.focus();

    inputField.addEventListener("blur", function () {
      const newText = inputField.value.trim();
      const newTextNode = document.createTextNode(" " + newText);
      span.replaceChild(newTextNode, inputField);
      updateLocalStorage();
    });
  });

  // Delete
  deleteIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    todoList.removeChild(span);
    updateLocalStorage();
  });

  todoList.appendChild(span);
}

// Update everything in localStorage
function updateLocalStorage() {
  const spans = document.querySelectorAll(".todo-form");
  const tasks = [];

  spans.forEach(span => {
    const text = span.textContent.trim();
    const completed = span.classList.contains("completed");
    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
