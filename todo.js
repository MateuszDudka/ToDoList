const addTaskBtn = document.querySelector(".add-task-btn");
const inputTask = document.querySelector("#input-task");
const listUl = document.querySelector(".list-task-ul");

let todo = localStorage.getItem("todolist") | []; //tworze localstorage do przechowywawania zadań

addTaskBtn.addEventListener("click", (e, index) => {
  e.preventDefault(); //zatrzymuje odświeżanie
  let array = []; // tworzę nową tablicę
  array = JSON.parse(localStorage.getItem("todolist")) || []; //pobieram localstorage
  let inputValue = inputTask.value; //przypisuje do zmiennej wprowadzaną wartość
  inputValue.setAttribute("index", `${index++}`);
  array.push(inputValue); // wrzucam do localstorage(tablicy) wpisaną wartość
  localStorage.setItem("todolist", JSON.stringify(array)); //zachowuje nową wartość w localstorage
  displayTask();
});

let displayTask = () => {
  let toDoList = (array = JSON.parse(localStorage.getItem("todolist")) || []); //pobieram dane z localstorage
  let liToDo = ""; //zeruje listę ul
  //const li = createElement("li");

  toDoList.forEach((element, index) => {
    liToDo += `<li class="newIdLi"> ${element} <button id="edit" onClick="editTask()">Edytuj</button> <button>Usuń</button> </li> `;
  }); //robię pętle po każdym elemencie localstorage i wyświetlam każdy element
  listUl.innerHTML = liToDo; //przypisuje elementy do listy ul
  inputTask.value = ""; //zeruje wartość w inpucie po dodaniu
};

let displayToDo = displayTask();
window.onload = displayToDo; //aby po załadowaniu strony(odświeżeniu strony) wyświetlały się zadania do zrobienia

let editTask = () => {
  const editBtn = document.getElementById("edit");
  const li = document.querySelector(".newIdLi");
  console.log(li.textContent);
  let toDoList = (array = JSON.parse(localStorage.getItem("todolist")) || []);

  toDoList.forEach((element) => {
    if (editBtn.textContent == "Edytuj") {
      editBtn.innerText = "Zapisz";
    } else {
      editBtn.innerText = "Edytuj";
    }
  });
  //listUl.forEach((element) => {});
};
editTask();

//problem jest w tym że nie różnią się "id", czyli każde nowe zadanie ma takie samo id jakie pierwsze
//czyli muszę zrobić coś aby przydzielać każdemu nowemu zadaniu przydzielać kolejne id (inkrementacja id(index++))
