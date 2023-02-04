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
createPlace.addEventListener('click', () => openPopup(popupPhoto));
profileEdit.addEventListener('click', () => {
  openPopup(popupProfile);
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

//функция создающая карточку
function createCard (item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardImage.alt = item.alt;
  //добвыил функцию обработки лайка
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  //добавил функцию удаления карточки
  cardElement.querySelector('.card__basket-button').addEventListener('click', function () {
    cardElement.remove();
  });
  //добавил функцию открытия просмотрщика фото
  cardImage.addEventListener('click', () => {
    openPopup(popupViwer)
    popupViwerImage.src = item.link;
    photoDescription.textContent = item.name;
    popupViwerImage.alt = item.alt;
  });
  return cardElement;
}
//добавляем карточки из массива
initialCards.forEach((card) => {
  cardsElement.append(createCard(card));
})
//добавляем созданаю пользователем карточку
cardPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = {
    link: cardLink.value,
    name: cardTitle.value,
    alt: cardTitle.value
  }
  cardsElement.prepend(createCard(card));
  closePopup(popupPhoto);
  evt.target.reset();
});