import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';


const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {

  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const todo = generateTodo({
    id: uuidv4(),
    name: name,
    completed: false,
    date: dateInput,
  });

 // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    todosList.append(todo);

// Removed unnecessary Enter key handler to avoid unexpected DOM modifications
    closeModal(addTodoPopup);

    formValidator.resetValidation();


});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});



document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    closeModal(openPopup);
  }
});



   

 


const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

