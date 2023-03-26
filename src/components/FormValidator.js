export default class FormValidator {
    constructor(data, elementForm) {
      this._elementForm = elementForm;
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._errorClass = data.errorClass;
      this._inputs = Array.from(this._elementForm.querySelectorAll(this._inputSelector));
      this._button = this._elementForm.querySelector(this._submitButtonSelector);
    }
    _setEventListenerInput () {
      this._toggleButtonSave();
      this._inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkValidation (input);
          this._toggleButtonSave ();
        })
      })
    }
    _checkValidation (input) {
   if (!input.validity.valid) {
    this._showInputError (input);
   } else {
    this._hideInputError (input);
   };
    }
    _showInputError(input) {
      input.classList.add(this._inputErrorClass);
      this._screnErrorElement(input).textContent = input.validationMessage;
      this._screnErrorElement(input).classList.add(this._errorClass);
    }
    _screnErrorElement(input) {
      const errorElement = document.querySelector(`#${input.id}-error`);
      return errorElement;
    }
    _hideInputError(input) {
      input.classList.remove(this._inputErrorClass);
      this._screnErrorElement(input).textContent = '';
      this._screnErrorElement(input).classList.remove(this._errorClass);
    }

    _hasInvalidInput () {
      return this._inputs.some((input) => {
        return !input.validity.valid;
      });
    }
    enableValidation() {
      this._elementForm.addEventListener('submit', (e) => e.preventDefault());
      this._setEventListenerInput();
  
    }
    _toggleButtonSave() {
      if (this._hasInvalidInput()) {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', true);
      } else {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled');
      };
    }
  }