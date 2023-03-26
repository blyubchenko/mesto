import { data } from "autoprefixer";

export default class Card {
    constructor(data, cardTemplate, userId, handleClickCard, handleLikeClick, handleDeleteIconClick) {
      this._title = data.name;
      this._alt = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._userId = userId;
      this._cardUserId = data.owner._id;
      this._data = data;
      this._imageId = data._id
      this._cardTemplate = cardTemplate;
      this._handleClickCard = handleClickCard;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
    }
   _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
      return cardElement;
   }
   //переключение состояния и изменение количества лайков
   switchLike(data) {
    this._likeCounter.textContent = data.likes.length
    this._likeBtn.classList.toggle('card__like-button_active');
   }
   //Отображение корзины
   _displayBasketBtn() {
    if(this._userId !== this._cardUserId){
      this._basketBtn.remove();
    }
   }
   //проверка наличия лайка
   _presenceLike(){
     if(this._likes.some((item) => item._id === this._userId)){
        this._likeBtn.classList.add('card__like-button_active');
     }
   }
   _setEventListeners() {
    this._likeBtn.addEventListener('click', (evt) => {
      this._handleLikeClick(evt, this._imageId);
    });
    this._basketBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._imageId, this._element);
    });
    this._image.addEventListener('click', () => {
      this._handleClickCard(this._data)
    });
   }
    createCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._basketBtn = this._element.querySelector('.card__basket-button');
    this._image = this._element.querySelector('.card__image');
    this._likeCounter.textContent = this._likes.length;
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._presenceLike();
    this._displayBasketBtn();
    this._element.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
   }
  }