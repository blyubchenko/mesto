import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popupElement.querySelector(".popup__form");
    }
    open(cardId, cardElement) {
      super.open();
      this._cardId = cardId;
      this._card = cardElement;
    }
    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._cardId, this._card);
      });
    }
  }