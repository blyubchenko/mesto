//Объявляю основные переменные
const profileEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const bottonClose = document.querySelectorAll('.popup__button-close');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');
const popup = document.querySelector('.popup');

const photoViwer = document.querySelector('.popup_photo-viwer');
const photoViwerLink = photoViwer.querySelector('.popup__photo');
const photoDescription = photoViwer.querySelector('.popup__description');

const cardTitle = document.querySelector('#title');
const cardLink = document.querySelector('#link');
const cardPhoto = document.querySelector('#form-photo');

const createPlace = document.querySelector('.profile__photo-button');
const popupPhoto = document.querySelector('.popup_photo');

//Реализую функцию открытия модального окна
function openPopup(item) {
  item.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
  closePopup(popup);
}

//добавил слушателей для открытия модальных окон
createPlace.addEventListener('click', () => openPopup(popupPhoto));
profileEdit.addEventListener('click', () => openPopup(popup));
//Добавил слушателей для закрытия модальных окон
bottonClose.forEach((item) => { item.addEventListener('click', () => closePopup(popup)) });
bottonClose.forEach((item) => { item.addEventListener('click', () => closePopup(popupPhoto)) });
bottonClose.forEach((item) => { item.addEventListener('click', () => closePopup(photoViwer)) });
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
// создаем карточки при загрузке страницы
const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#template').content;

initialCards.forEach(item => {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  //получаем данные из массива
  cardElement.querySelector('.card__photo').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__photo').alt = item.alt;
  //добвыил функцию обработки лайка
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  //добавил функцию удаления карточки
  cardElement.querySelector('.card__basket-button').addEventListener('click', function () {
    cardElement.remove();
  });
  //добавил функцию открытия просмотрщика фото
  cardElement.querySelector('.card__photo').addEventListener('click', () => {
    openPopup(photoViwer)
    photoViwerLink.src = item.link;
    photoDescription.textContent = item.name;
  });
  // наполняем содержимым
  cardsElement.append(cardElement);
});

//функция добавления новой карточки
function renderCard(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__photo').src = cardLink.value;
  cardElement.querySelector('.card__title').textContent = cardTitle.value;
  //добвыил функцию обработки лайка
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  //добавил функцию удаления карточки
  cardElement.querySelector('.card__basket-button').addEventListener('click', function () {
    cardElement.remove();
  });

  //добавил функцию открытия просмотрщика фото
  cardElement.querySelector('.card__photo').addEventListener('click', () => {
    openPopup(photoViwer)
    photoViwerLink.src = cardElement.querySelector('.card__photo').src;
    photoDescription.textContent = cardElement.querySelector('.card__title').textContent;
  });
  //добавление созданой карточки перед существующими
  cardsElement.prepend(cardElement);
  closePopup(popupPhoto);
}

cardPhoto.addEventListener('submit', renderCard);