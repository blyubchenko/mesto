import Card from './Card.js';
import FormValidator from './FormValidator.js'
import {validationConfig, initialCards} from './constans.js'

//Объявляю основные переменные
const profileEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__button-close');
const nameInput = profileForm.querySelector('#name');
const jobInput = profileForm.querySelector('#job');
const popupProfile = document.querySelector('.popup_profile');

const popupViwer = document.querySelector('.popup_photo-viwer');
const popupViwerImage = popupViwer.querySelector('.popup__image');
const photoDescription = popupViwer.querySelector('.popup__description');

const cardTitle = document.querySelector('#title');
const cardLink = document.querySelector('#link');
const cardPhoto = document.querySelector('#form-photo');

const createPlace = document.querySelector('.profile__photo-button');
const popupPhoto = document.querySelector('.popup_photo');
const popupWraperViwer = document.querySelector('.popup__wraper');
const popups = document.querySelectorAll('.popup');

const cardsElement = document.querySelector('.cards');
const cardTemplate = '#template';

const  keyCodeEsc = 'Escape';

const validatorProfile = new FormValidator(validationConfig, popupProfile);
const validatorPhoto = new FormValidator(validationConfig, popupPhoto);

//Реализую функцию открытия модального окна
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//Реализую функцию закрытия модального окна
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//функция закрытия модального окна по нажатию на Escape
function closeByEscape(evt) {
  if (evt.key === keyCodeEsc) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//Реализовал функцию редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

//функция открытия окна просмотрщика
function handleClickCard(dataViwer) {
  openPopup(popupViwer);
  popupViwerImage.src = dataViwer.link;
  photoDescription.textContent = dataViwer.name;
  popupViwerImage.alt = dataViwer.alt;
}

//функция инициализации и добавления карточки
function addCard (card, cardTemplate, handleClickCard) {
  const newCard = new Card(card, cardTemplate, handleClickCard)
  cardsElement.prepend(newCard.createCard());
}

//добавляем карточки из массива
initialCards.forEach((card) => {
  addCard(card, cardTemplate, handleClickCard);
})

//добавление созданой пользователем карточки
cardPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardData = {
    link: cardLink.value,
    name: cardTitle.value,
    alt: cardTitle.value
  }
  addCard(cardData, cardTemplate, handleClickCard);
  closePopup(popupPhoto);
  evt.target.reset();
});

//обработчик закрытия модальных окон по крестику и оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      };
  });
});

//добавил слушателей для открытия модальных окон
createPlace.addEventListener('click', () => {
  openPopup(popupPhoto);
  validatorPhoto.enableValidation();
});
profileEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  validatorProfile.enableValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Добавил слушателя для раедактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);