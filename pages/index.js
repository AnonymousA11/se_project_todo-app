import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithForm from '../components/PopUpWithForm.js';
import TodoCounter from '../components/ToDoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const formValidator = new FormValidator(validationConfig, addTodoForm);

// FormValidator already initialized earlier in the file.


const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (_getInputValues) => {
    const todo = generateTodo({
      id: uuidv4(),
      name: _getInputValues.name,
      completed: false,
      date: _getInputValues.date,
  });

  // Create a date object and adjust for timezone
  const date = new Date(_getInputValues.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  todosList.append(todo);
  formValidator.resetValidation();
}
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, 
  renderer: (item) => {
    //generate todo item
    //add it to Todo List 
    //refer to the foreach loop below for guidance
    const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
    return todo.getView();
  },
  containerSelector: ".todos__list"
});
//call section instances renderItems method
section.renderItems();  



const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
  // You can use todoId here if needed for further logic
}

function handleDelete(completed) {
  if (completed){
    todoCounter.updateCompleted(false);
  }
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};



addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  
});

addTodoCloseBtn.addEventListener("click", () => {
// Form submission is handled by PopupWithForm; no manual submit handler needed here.


});





document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
});



   

 



formValidator.enableValidation();

