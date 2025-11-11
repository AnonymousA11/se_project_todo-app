class Todo {
  constructor(data, selector,handleCheck,handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  getView() {
    this._todoElement = this._templateElement.content
    .querySelector(".todo")
    .cloneNode(true);
  const todoNameEl = this._todoElement.querySelector(".todo__name");
  const todoDate = this._todoElement.querySelector(".todo__date");
  const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

  todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    todoDate.textContent = dueDate.toLocaleDateString();

 this._generateCheckboxEl();

 this._setEventListeners();
  return this._todoElement;
  }


  _setEventListeners(){
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);
      this._todoElement.remove();
      
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompleted();
      this._handleCheck(this._data.completed);
    });
  }

  _generateCheckboxEl(){

     this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
     this._todoLabel = this._todoElement.querySelector(".todo__label");

     this._todoCheckboxEl.checked = this._data.completed;

     this._todoCheckboxEl.id = `todo-${this._data.id}`;
     this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

  }

  _toggleCompleted(){
    this._data.completed = !this._data.completed;
  }



  
}

export default Todo;