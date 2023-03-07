import { Popup } from './Popup.js'
import { popupViwerImage, photoDescription } from './index.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupViwerImage = popupViwerImage;
    this._photoDescription = photoDescription;
  }
  open({name, link}) {
    this._popupViwerImage.src = link;
    this._photoDescription.textContent = name;
    this._popupViwerImage.alt = name;
    super.open();
  }
}