const addTaskBtn = document.querySelector(".add-task-btn");
const inputTask = document.querySelector("#input-task");
const listUl = document.querySelector(".list-task-ul");

let todo = localStorage.getItem("todolist") | []; //tworze localstorage do przechowywawania zadań

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault(); //zatrzymuje odświeżanie
  let array = []; // tworzę nową tablicę
  array = JSON.parse(localStorage.getItem("todolist")) || []; //pobieram localstorage
  let inputValue = inputTask.value; //przypisuje do zmiennej wprowadzaną wartość
  array.push(inputValue); // wrzucam do localstorage(tablicy) wpisaną wartość
  localStorage.setItem("todolist", JSON.stringify(array)); //zachowuje nową wartość w localstorage
  displayTask();
});

let displayTask = () => {
  let toDoList = (array = JSON.parse(localStorage.getItem("todolist")) || []); //pobieram dane z localstorage
  let liToDo = ""; //zeruje listę ul
  toDoList.forEach((element) => {
    liToDo += `<li> ${element} <button>Edytuj</button> <button>Usuń</button> </li> `;
  }); //robię pętle po każdym elemencie localstorage i wyświetlam każdy element
  listUl.innerHTML = liToDo; //przypisuje elementy do listy ul
  inputTask.value = ""; //zeruje wartość w inpucie po dodaniu
};

let displayToDo = displayTask();
window.onload = displayToDo; //aby po załadowaniu strony(odświeżeniu strony) wyświetlały się zadania do zrobienia
