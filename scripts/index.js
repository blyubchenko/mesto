//Объявляю основные переменные
let editProfile = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let closeBotton = document.querySelector('.popup__button-close');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
const popup = document.querySelector('.popup');

//Реализую функцию открытия модального окна
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}


//Реализую функцию закрытия модального окна
function popupClose() {
  popup.classList.remove('popup_opened');
}

//Реализовал функцию редактирования профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}

//Добавил слушателя для открытия модального окна
editProfile.addEventListener('click', popupOpen);
//Добавил слушателя для закрытия модального окна
closeBotton.addEventListener('click', popupClose);
//Добавил слушателя для раедактирования профиля
formElement.addEventListener('submit', handleFormSubmit);
