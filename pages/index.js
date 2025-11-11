import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopUpWithForm.js";
import TodoCounter from "../components/ToDoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
const todoList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const formValidator = new FormValidator(validationConfig, addTodoForm);

// FormValidator already initialized earlier in the file.

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formValues) => {
    const todo = generateTodo({
      id: uuidv4(),
      name: formValues.name,
      completed: false,
      date: formValues.date,
    });

    // Create a date object and adjust for timezone
    const date = new Date(formValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    section.addItem(todo);
    todoCounter.updateTotal(true);
    formValidator.resetValidation();
  },
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
  containerSelector: ".todos__list",
});
//call section instances renderItems method
section.renderItems();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
  // You can use todoId here if needed for further logic
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateTotal(false);
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

formValidator.enableValidation();
