export default class Card {
    constructor(data, cardTemplate, handleClickCard) {
      this._title = data.name;
      this._link = data.link;
      this._alt = data.alt;
      this._data = data;
      this._cardTemplate = cardTemplate;
      this._handleClickCard = handleClickCard;
    }
   _getTemplate() {
    const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
      return cardElement;
   }
   _switchLike() {
    this._likeBtn.classList.toggle('card__like-button_active');
   }
   _deleteCard() {
    this._element.remove();
   }
   
   _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._switchLike();
    });
    this._basketBtn.addEventListener('click', () => {
      this._deleteCard();
    });
    this._image.addEventListener('click', () => {
      this._handleClickCard(this._data)
    });
   }
    createCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._basketBtn = this._element.querySelector('.card__basket-button');
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._element.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
   }
  }