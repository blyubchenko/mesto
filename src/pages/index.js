import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  validationConfig,
  initialCards,
  profileEdit,
  popupProfile,
  createPlace,
  popupPhoto,
  cardsElement,
  cardTemplate,
} from "../utils/constans.js";
import Section from "../components/Section.js";

import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//функция открытия окна просмотрщика
function handleClickCard(dataViwer) {
  popupWithImage.open(dataViwer);
}
//Функция заполняющая инпуты формы данными о пользователе
function inputsFill() {
  popupProfile.querySelectorAll(".popup__input").forEach((input) => {
    input.value = userInfo.getUserInfo()[`${input.getAttribute("name")}`];
  });
}
//функция создающая карточку
function makeCard(cardData) {
  const newCard = new Card(cardData, cardTemplate, handleClickCard);
  return newCard;
}

const validatorProfile = new FormValidator(validationConfig, popupProfile);
const validatorPhoto = new FormValidator(validationConfig, popupPhoto);
validatorProfile.enableValidation();
validatorPhoto.enableValidation();

const popupWithImage = new PopupWithImage(".popup_photo-viwer");
popupWithImage.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const item = makeCard(data);
      cardList.addItem(item.createCard());
    },
  },
  cardsElement
);

cardList.renderItems();

const userInfo = new UserInfo({
  userName: ".profile__title",
  job: ".profile__subtitle",
});

const profileEditPopup = new PopupWithForm(
  ".popup_profile",
  ({ name, job }) => {
    userInfo.setUserInfo({ name, job });
    profileEditPopup.close();
  }
);

profileEdit.addEventListener("click", () => {
  profileEditPopup.open();
  inputsFill();
});

profileEditPopup.setEventListeners();

const cardAddingPopup = new PopupWithForm(".popup_photo", ({ link, title }) => {
  const newCardData = {
    link: link,
    name: title,
    alt: title,
  };
  const newCard = makeCard(newCardData);
  cardList.addItem(newCard.createCard());
  cardAddingPopup.close();
});

createPlace.addEventListener("click", () => {
  cardAddingPopup.open();
});

cardAddingPopup.setEventListeners();
