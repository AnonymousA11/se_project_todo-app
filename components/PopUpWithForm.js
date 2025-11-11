import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super({popupSelector:popupSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._popupform = this._popupElement.querySelector(".popup__form");
        this._handleCheck = this._handleCheck;
        console.log(this._handleCheck);
    }


    _getInputValues() {
        const inputs = this._popupform.querySelectorAll(".popup__input");
        const values = {};
        inputs.forEach(input => {
            values[input.name] = input.value;
            
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupform.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
            this.clearInputs();
        });
    }

    clearInputs() {
        const inputs = this._popupform.querySelectorAll(".popup__input");
        inputs.forEach(input => {
            input.value = '';
        });
    }
}

export default PopupWithForm;