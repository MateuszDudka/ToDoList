const addTaskBtn = document.querySelector(".add-task-btn");
const inputTask = document.querySelector("#input-task");
const listDiv = document.querySelector("#list-tasks"); //pobieranie elementów z htmla

let todos = JSON.parse(localStorage.getItem("listTask")) || []; //tworzenie localstorage do przechowywawania zadań

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault(); //zatrzymuje odświeżanie strony
  const todotask = {
    task: inputTask.value,
  }; //tworzenie obiektu w celu przypisywania do zmiennej podanego zadania
  todos.push(todotask); // wrzucanie do localstorage(tablicy) wpisaną wartość
  localStorage.setItem("listTask", JSON.stringify(todos)); //zapisywanie nowej wartości w localstorage
  inputTask.value = ""; //czyszczenie inputa po dodaniu zadania
  displayTask(); //funkcja odpowiadająca za wyświetlanie zadań
});

let displayTask = () => {
  listDiv.innerHTML = ""; //czyszczenie listy

  todos.forEach((todotask) => {
    const taskItem = document.createElement("div"); //tworzenie elementu htmla
    taskItem.classList.add("task-item"); //dodawanie klasy do elementu htmla

    const contentTask = document.createElement("div"); //tworze elementu htmla
    const actionsDisplay = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    contentTask.innerHTML = `<input type="text" value="${todotask.task}" readonly>`; //dodanie do elementu htmla danego zadania w celu wyświetlenia w postaci inputa
    editBtn.innerHTML = "Edytuj"; //dodanie treści przycisku
    deleteBtn.innerHTML = "Usuń"; //dodanie treści przycisku

    contentTask.classList.add("todo-content");
    actionsDisplay.classList.add("actions");
    editBtn.classList.add("edit");
    deleteBtn.classList.add("delete"); //każdy element ma swoją klasę

    actionsDisplay.appendChild(editBtn);
    actionsDisplay.appendChild(deleteBtn);
    taskItem.appendChild(contentTask);
    taskItem.appendChild(actionsDisplay);

    listDiv.appendChild(taskItem); // wrzucanie do htmla

    editBtn.addEventListener("click", (e) => {
      const input = contentTask.querySelector("input"); //pobieranie inputa z content
      input.removeAttribute("readonly"); //usuwanie atrybuty odpowiadającego tylko za odczytywanie
      input.focus(); //uruchmienie możliwości wpisywania w inputa
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true); //ponowne ustawienie atrybuty readonly
        todotask.task = e.target.value; //przypisanie treści docelowego zadania
        localStorage.setItem("listTask", JSON.stringify(todos)); //zapisanie w localstorage
        displayTask(); //wyświetlanie
      });
    });

    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todotask); //filtracja na tablice w celu usunięcia elementów
      localStorage.setItem("listTask", JSON.stringify(todos));
      displayTask();
    });
  });
};
displayTask();

//todos - localstorage(tablica obiektów)
//todotask - obiekt do którego zostaje przypisana treść zadania
