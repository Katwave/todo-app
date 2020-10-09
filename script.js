// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");

// EVENTS
window.addEventListener("load", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
todoFilter.addEventListener("click", filterTodos);

// FUNCTIONS

function addTodo(e) {
  e.preventDefault();

  // Create a container for the list items elements
  const todo_list_elements = document.createElement("div");
  todo_list_elements.classList.add("todo-list-elements");

  // Create a list item
  const new_item = document.createElement("li");
  new_item.innerText = todoInput.value;
  todo_list_elements.appendChild(new_item);

  // Check button
  const todo_checked = document.createElement("button");
  todo_checked.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
  // Below function runs when the check button is clicked
  checkButton(todo_checked, new_item, todo_list_elements);

  // Delete button
  const todo_delete = document.createElement("button");
  todo_delete.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
  //   Delete the element when the button is clicked
  deleteButton(todo_delete, todo_list_elements);

  // Append the check and delete buttons to the todo div element
  todo_list_elements.appendChild(todo_checked);
  todo_list_elements.appendChild(todo_delete);

  // Append the todo div to the unordered list and
  // save the todo items to the local storage
  if (todoInput.value) {
    todoList.appendChild(todo_list_elements);
    saveToLocalStorage(todoInput.value);
  }

  //   Removing the text inside the input field
  todoInput.value = "";
}

// Toggle the delete button
const deleteButton = (delete_btn, todo_items_container) => {
  delete_btn.addEventListener("click", (e) => {
    e.preventDefault();
    todo_items_container.classList.toggle("remove-item");
    deleteFromLocalStorage(todo_items_container);
  });
};

// Toggle the check button
const checkButton = (check_btn, new_item, todo_list_container_element) => {
  check_btn.addEventListener("click", (e) => {
    e.preventDefault();
    new_item.classList.toggle("checked");
    todo_list_container_element.classList.toggle("completed");
  });
};

// Delete the todo div
function deleteItem(e) {
  const item = e.target;
  const todoDiv = item.parentElement;
  todoDiv.addEventListener("animationend", () => {
    todoDiv.remove();
  });
}

// Filtering the todos
function filterTodos(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    console.log(todo.classList.length);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "unchecked":
        if (todo.classList.length === 1) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "checked":
        if (todo.classList.length === 2) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Save to local storage
function saveToLocalStorage(todo) {
  let todoItems;
  if (localStorage.getItem("todo-items") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todo-items"));
  }

  todoItems.push(todo);
  localStorage.setItem("todo-items", JSON.stringify(todoItems));
}

// Get todos from localStorage
function getTodos() {
  let todoItems;
  if (localStorage.getItem("todo-items") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todo-items"));
  }
  todoItems.forEach((todo) => {
    //   Putting items from local storage into the div of todos

    // Create a container for the list items elements
    const todo_list_elements = document.createElement("div");
    todo_list_elements.classList.add("todo-list-elements");

    // Create a list item
    const new_item = document.createElement("li");
    new_item.innerText = todo;
    todo_list_elements.appendChild(new_item);

    // Create the delete and Checked buttons
    const todo_checked = document.createElement("button");
    //   Add styling when the button is clicked
    checkButton(todo_checked, new_item, todo_list_elements);
    todo_checked.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
    const todo_delete = document.createElement("button");
    //   Delete the element when the button is clicked
    deleteButton(todo_delete, todo_list_elements);
    todo_delete.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    todo_list_elements.appendChild(todo_checked);
    todo_list_elements.appendChild(todo_delete);

    // APPEND THE LIST CONTAINER WITH ELEMENTS TO THE UL TAG
    todoList.appendChild(todo_list_elements);
  });
}

// Delete items from local storage
function deleteFromLocalStorage(todo) {
  let todoItems;
  if (localStorage.getItem("todo-items") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todo-items"));
  }

  const todoIndex = todo.children[0].innerText;
  todoItems.splice(todoItems.indexOf(todoIndex), 1);
  localStorage.setItem("todo-items", JSON.stringify(todoItems));
}
