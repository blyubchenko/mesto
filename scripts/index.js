import Card from './Card.js';
import FormValidator from './FormValidator.js'
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

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'};

const validatorProfile = new FormValidator(object, popupProfile);
const validatorPhoto = new FormValidator(object, popupPhoto);

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

//Реализовал функцию редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

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

//функция закрытия модального окна по нажатию на Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//обработчик закрытия модальных окон по крестику и оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      };
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      };
  });
});

//Добавил слушателя для раедактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

const initialCards = [
  {
    name: 'Домбай',
    link: 'images/card/card_1.jpg',
    alt: 'Гора Домбай'
  },
  {
    name: 'Телецкое',
    link: 'images/card/card_2.jpg',
    alt: 'Телецкое озеро'
  },
  {
    name: 'Гамсутль',
    link: 'images/card/card_3.jpg',
    alt: 'Поселение Гамсутль в Дагестане'
  },
  {
    name: 'Ольхон',
    link: 'images/card/card_4.jpg',
    alt: 'Гора Шаманка на острове Ольхон'
  },
  {
    name: 'Камчатка',
    link: 'images/card/card_5.jpg',
    alt: 'Гейзеры на Камчатке'
  },
  {
    name: 'Саяны',
    link: 'images/card/card_6.jpg',
    alt: 'Горы Саяны'
  }
];

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#template').content;

function handleClickCard(dataViwer) {
  openPopup(popupViwer);
  popupViwerImage.src = dataViwer.link;
  photoDescription.textContent = dataViwer.name;
  popupViwerImage.alt = dataViwer.alt;
}
//добавляем карточки из массива
initialCards.forEach((card) => {
  const newCard = new Card(card, cardTemplate, handleClickCard)
  cardsElement.append(newCard.createCard());
})
//добавляем созданаю пользователем карточку
cardPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardData = {
    link: cardLink.value,
    name: cardTitle.value,
    alt: cardTitle.value
  }
  const card = new Card(cardData, cardTemplate, handleClickCard)
  cardsElement.prepend(card.createCard());
  closePopup(popupPhoto);
  evt.target.reset();
});