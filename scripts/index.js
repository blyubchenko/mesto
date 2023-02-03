//Объявляю основные переменные
const profileEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const buttonsClose = document.querySelectorAll('.popup__button-close');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');
const popupProfile = document.querySelector('.popup_profile');

const popupViwer = document.querySelector('.popup_photo-viwer');
const popupViwerImage = popupViwer.querySelector('.popup__image');
const photoDescription = popupViwer.querySelector('.popup__description');

const cardTitle = document.querySelector('#title');
const cardLink = document.querySelector('#link');
const cardPhoto = document.querySelector('#form-photo');

const createPlace = document.querySelector('.profile__photo-button');
const popupPhoto = document.querySelector('.popup_photo');
const popupWraperViwer = document.querySelector('.popup__wraper')

//Реализую функцию открытия модального окна
function openPopup(item) {
  item.classList.add('popup_opened');
}

//Реализую функцию закрытия модального окна
function closePopup(item) {
  item.classList.remove('popup_opened');
}

//Реализовал функцию редактирования профиля
function handleFormSubmit(evt) {
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
function closeOnEscape(popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')){
      closePopup(popup);
     };
  });
};

//функция закрытия модального окно при клике по оверлею
function closeOnOverlay (popup) {
  popup.addEventListener('click', (evt) => {
 if (!evt.target.closest('.popup__container') && !popupWraperViwer.contains(evt.target))
    closePopup(popup);
  });
};

//Добавил обработчик закрытия модальных окон по крестику
buttonsClose.forEach((item) => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(popup))
  closeOnOverlay (popup);
  closeOnEscape(popup);
});

//Добавил слушателя для раедактирования профиля
formElement.addEventListener('submit', handleFormSubmit);

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
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').alt = item.alt;
  //добвыил функцию обработки лайка
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  //добавил функцию удаления карточки
  cardElement.querySelector('.card__basket-button').addEventListener('click', function () {
    cardElement.remove();
  });
  //добавил функцию открытия просмотрщика фото
  cardElement.querySelector('.card__image').addEventListener('click', () => {
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