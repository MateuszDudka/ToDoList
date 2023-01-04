const addTaskBtn = document.querySelector(".add-task-btn");
const inputTask = document.querySelector("#input-task");

let todo = localStorage.getItem("todo") || []; //tworze localstorage do przechowywawania zadań

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = inputTask.value;
  todo.push(inputValue);
  localStorage.setItem("todo", JSON.stringify(todo));
});
