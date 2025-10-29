class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
  }

  _showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElementId = `#${inputElement.id}-error`;
  const errorElement = formElement.querySelector(errorElementId);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

  _hideInputError = (formElement, inputElement, settings) => {
  const errorElementId = `#${inputElement.id}-error`;
  const errorElement = formElement.querySelector(errorElementId);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

  _checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings,
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

_toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

_setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector,
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

enableValidation = (settings) => {
  const formElement = document.querySelector(settings.formSelector);
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  setEventListeners(formElement, settings);
};

 resetValidation() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

}

export default FormValidator;





  

  

  

  