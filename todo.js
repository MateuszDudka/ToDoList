const addTaskBtn = document.querySelector(".add-task-btn");
const inputTask = document.querySelector("#input-task");
let listDiv = document.querySelector("#list-tasks");

let todos = JSON.parse(localStorage.getItem("todolist")) || []; //tworze localstorage do przechowywawania zadań

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault(); //zatrzymuje odświeżanie
  const todo = {
    content: inputTask.value,
  };
  todos.push(todo); // wrzucam do localstorage(tablicy) wpisaną wartość
  localStorage.setItem("todolist", JSON.stringify(todos)); //zapisuje nową wartość w localstorage

  displayTask();
}); // dodawanie zadań do localstorage działa

let displayTask = () => {
  listDiv.innerHTML = "";

  todos.forEach((todo) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const content = document.createElement("div"); //tworze elemeny htmla
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edytuj";
    deleteButton.innerHTML = "Usuń";

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete"); //każde ma swoją klasę

    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    taskItem.appendChild(content);
    taskItem.appendChild(actions); // wrzucam do htmla

    listDiv.appendChild(taskItem);

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input"); //bo jest content.innerHTML = `input ......`
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todolist", JSON.stringify(todos));
        displayTask();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todolist", JSON.stringify(todos));
      displayTask();
    });
  });
};
displayTask();
