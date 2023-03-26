import card_1 from "../images/card/card_1.jpg";
import card_2 from "../images/card/card_2.jpg";
import card_3 from "../images/card/card_3.jpg";
import card_4 from "../images/card/card_4.jpg";
import card_5 from "../images/card/card_5.jpg";
import card_6 from "../images/card/card_6.jpg";

//Объявляю основные переменные
export const profileEdit = document.querySelector(".profile__edit-button");
export const avatarEdit = document.querySelector('.profile__avatar-button');
export const profileForm = document.querySelector(".popup__form");
export const popupProfile = document.querySelector(".popup_profile");
export const popupViwer = document.querySelector(".popup_photo-viwer");
export const createPlace = document.querySelector(".profile__photo-button");
export const popupPhoto = document.querySelector(".popup_photo");
export const popupAvatar = document.querySelector(".popup_avatar")
export const popups = document.querySelectorAll(".popup");
export const cardsElement = ".cards";
export const cardTemplate = "#template";
export const keyCodeEsc = "Escape";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const initialCards = [
  {
    name: "Домбай",
    link: card_1,
    alt: "Гора Домбай",
  },
  {
    name: "Телецкое",
    link: card_2,
    alt: "Телецкое озеро",
  },
  {
    name: "Гамсутль",
    link: card_3,
    alt: "Поселение Гамсутль в Дагестане",
  },
  {
    name: "Ольхон",
    link: card_4,
    alt: "Гора Шаманка на острове Ольхон",
  },
  {
    name: "Камчатка",
    link: card_5,
    alt: "Гейзеры на Камчатке",
  },
  {
    name: "Саяны",
    link: card_6,
    alt: "Горы Саяны",
  },
];
