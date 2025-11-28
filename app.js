const forms = document.getElementById("form");
const input = document.getElementById("form-input");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

forms.addEventListener("submit", function (e) {
  e.preventDefault(); // stops page from reloading

  // get the text from input
  const taskInput = input.value.trim();
  if (taskInput === "") return;

  addTaskToDOM(taskInput, false); // create UI
  saveTaskToLocalStorage(taskInput); // store it

  // Clear the input
  input.value = "";
});

// Add a task to localStorage
function saveTaskToLocalStorage(taskInput) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ taskInput: taskInput, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task.taskInput, task.completed));
}

// Create the task element
function addTaskToDOM(taskInput) {
  const span = document.createElement("span");
  span.classList.add("todo-form");
  // span.innerHTML = taskInput;
  // console.log(span.innerHTML);

  // Create the checkbox icon
  const icon = document.createElement("ion-icon");
  icon.setAttribute("name", "square-outline");

  // Create edit icon
  const editIcon = document.createElement("ion-icon");
  editIcon.setAttribute("name", "create-outline");
  editIcon.classList.add("edit-icon");
  editIcon.style.display = "inline-block";
  editIcon.style.marginLeft = "10px";

  // Create delete icon
  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "trash-outline");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.style.display = "inline-block";
  deleteIcon.style.marginLeft = "10px";

  //Create saved icon
  const saveIcon = document.createElement("ion-icon");
  saveIcon.setAttribute("name", "save-outline");
  saveIcon.classList.add("save-icon");
  saveIcon.style.display = "inline-block";
  saveIcon.style.marginLeft = "10px";

  // Create the text node
  const textNode = document.createTextNode(" " + taskInput);

  // Put icon + text inside the span
  // Create wrapper for icons
  const iconRow = document.createElement("div");
  iconRow.classList.add("icon-row");
  span.appendChild(icon);
  span.appendChild(editIcon);
  span.appendChild(deleteIcon);
  span.appendChild(saveIcon);
  // span.appendChild(textNode);

  // Create wrapper for text
  const textRow = document.createElement("div");
  textRow.classList.add("text-row");
  textRow.appendChild(textNode);

  // Add both rows to the span
  span.appendChild(iconRow);
  span.appendChild(textRow);

  // Mark complete if needed
  // if (isCompleted) span.classList.add("completed");

  //  Add click event to toggle complete/incomplete
  span.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent triggering edit when clicking checkbox
    // Toggle a CSS class
    span.classList.toggle("completed");

    // Check if it now has 'completed' class
    if (span.classList.contains("completed")) {
      // Change icon to checked
      icon.setAttribute("name", "checkbox");
    } else {
      // Change icon back to empty square
      icon.setAttribute("name", "square-outline");
    }
    updateLocalStorage();
  });

  // Add click event to edit icon
  editIcon.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent triggering complete/incomplete

    // Always find the current textRow inside span
    const textRow = span.querySelector(".text-row");
    const currentText = textRow.textContent.trim();

    // const currentText = span.textContent.trim();
    const inputField = document.createElement("input");
    inputField.type = "text";

    inputField.value = currentText;
    inputField.classList.add("edit-input");

    span.replaceChild(inputField, textRow);
    inputField.focus();
    updateLocalStorage();
  });

  // Add click event to save icon
  saveIcon.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent triggering complete/incomplete
    const inputField = span.querySelector("input");
    if (inputField) {
      const newText = inputField.value.trim();

      if (newText !== "") {
        // New text container
        const newTextRow = document.createElement("div");
        newTextRow.classList.add("text-row");
        newTextRow.textContent = " " + newText;
        // const newTextNode = document.createTextNode(" " + newText);
        span.replaceChild(newTextRow, inputField);
      }
    }
    updateLocalStorage();
  });

  // Add click event to delete icon
  deleteIcon.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent triggering complete/incomplete
    todoList.removeChild(span);
    updateLocalStorage();
  });

  // Add to the list
  todoList.appendChild(span);
}

// Update everything in localStorage
function updateLocalStorage() {
  const spans = document.querySelectorAll(".todo-form");
  const tasks = [];

  spans.forEach((span) => {
    const taskInput = span.textContent.trim();
    const completed = span.classList.contains("completed");
    tasks.push({ taskInput, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
