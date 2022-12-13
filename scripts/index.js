//Объявляю основные переменные
let editProfile = document.querySelector('.profile__edit-button');
let profilName = document.querySelector('.profile__title');
let profilJob = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__input');
let jobInput = formElement.querySelector('.popup__input:last-child');

//Реализую функцию открытия модального окна
function popupOpen() {
  document.querySelector('.popup').classList.add('popup_opened');
  nameInput.value = profilName.textContent;
  jobInput.value = profilJob.textContent;
}
//Добавил слушателя для открытия модального окна
editProfile.addEventListener('click', popupOpen);

//Реализую функцию закрытия модального окна
let closeBotton = document.querySelector('.popup__botton-close');

function popupClose() {
  document.querySelector('.popup').classList.remove('popup_opened');
}
//Добавил слушателя для закрытия модального окна
closeBotton.addEventListener('click', popupClose);

//Реализовал функцию редактирования профиля
function handleFormSubmit (evt) {
    evt.preventDefault();

    profilName.textContent = nameInput.value;

    profilJob.textContent = jobInput.value;

    popupClose();
}
//Добавил слушателя для раедактирования профиля
formElement.addEventListener('submit', handleFormSubmit);
