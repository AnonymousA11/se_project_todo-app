import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
            
        });
    }

   
}

export default PopupWithForm;