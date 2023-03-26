import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popupForm.querySelector('.button-submit');
    this._submitButtonTitle = this._submitButton.textContent;
  }
  _getInputValues() {
    this._valuesForm = {};
    this._inputs.forEach((input) => {
      this._valuesForm[input.name] = input.value;
    });
    return this._valuesForm;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
  //функция ожидания загрузки
renderLoading(isLoading){
  if(isLoading){
    this._submitButton.textContent = 'Сохранение...';
  } else {
    this._submitButton.textContent = this._submitButtonTitle;
  }
}
}
