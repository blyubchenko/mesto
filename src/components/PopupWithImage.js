import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupViwerImage = this._popupElement.querySelector('.popup__image');
    this._photoDescription = this._popupElement.querySelector('.popup__description');
  }
  open({name, link}) {
    this._popupViwerImage.src = link;
    this._photoDescription.textContent = name;
    this._popupViwerImage.alt = name;
    super.open();
  }
}