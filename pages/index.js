import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopUpWithForm.js";
import TodoCounter from "../components/ToDoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
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


const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: generateTodo,
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
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

formValidator.enableValidation();
