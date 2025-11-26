const forms = document.getElementById("form");
const input = document.getElementById("form-input");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage when page loads
// document.addEventListener("DOMContentLoaded", loadTasks);

forms.addEventListener("submit", function (e) {
  e.preventDefault(); // stops page from reloading

  // get the text from input
  const taskInput = input.value.trim();
  if (taskInput === "") return;

  // addTaskToDOM(text, false); // create UI
  // saveTaskToLocalStorage(text); // store it

  // Clear the input
  input.value = "";
});

// Create the task element
const span = document.createElement("span");
span.classList.add("todo-form");
// span.innerHTML = taskInput;
// console.log(span.innerHTML);

//save to local storage
localStorage.setItem("task", taskInput);

//get from local storage

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
span.appendChild(icon);
span.appendChild(editIcon);
span.appendChild(deleteIcon);
span.appendChild(saveIcon);
span.appendChild(textNode);

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
});

// Add click event to edit icon
editIcon.addEventListener("click", function (e) {
  e.stopPropagation(); // Prevent triggering complete/incomplete
  const currentText = span.textContent.trim();
  const inputField = document.createElement("input");
  inputField.type = "text";

  inputField.value = currentText;
  span.replaceChild(inputField, textNode);
  inputField.focus();
});

// Add click event to save icon
saveIcon.addEventListener("click", function (e) {
  e.stopPropagation(); // Prevent triggering complete/incomplete
  const inputField = span.querySelector("input");
  if (inputField) {
    const newText = inputField.value.trim();

    if (newText !== "") {
      const newTextNode = document.createTextNode(" " + newText);
      span.replaceChild(newTextNode, inputField);
    }
  }
});

// Add click event to delete icon
deleteIcon.addEventListener("click", function (e) {
  e.stopPropagation(); // Prevent triggering complete/incomplete
  todoList.removeChild(span);
});

// Add to the list
todoList.appendChild(span);
