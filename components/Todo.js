class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector("#todo-template");
  }

  getView() {
    this._todoElement = this._todoTemplate.content
    .querySelector(".todo")
    .cloneNode(true);
  const todoNameEl = this._todoElement.querySelector(".todo__name");
  const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
  const todoLabel = this._todoElement.querySelector(".todo__label");
  const todoDate = this._todoElement.querySelector(".todo__date");
  const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

  todoNameEl.textContent = this._data.name;
  // TODO: ASSIGN COMPLETED STATUS
  todoCheckboxEl.checked = this._data.completed;

  todoCheckboxEl.id = `todo-${this._data.id}`;
  todoLabel.setAttribute("for", `todo-${this._data.id}`);


  return this._todoElement;
  }
}

export default Todo;