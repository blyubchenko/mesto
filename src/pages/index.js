import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  validationConfig,
  profileEdit,
  popupProfile,
  createPlace,
  popupPhoto,
  cardsElement,
  cardTemplate,
  avatarEdit,
  popupAvatar,
} from "../utils/constans.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";

const api = new Api("https://nomoreparties.co/v1/cohort-62", {
  authorization: "8dd1a51b-906e-408a-a644-b2150f8e3873",
  "Content-Type": "application/json",
});

//отрисовка первоначальных данных
api
  .getAllData()
  .then((res) => {
    const [initialCards, userData] = res;
    initialCards.reverse();
    cardList.renderItems(initialCards, userData._id);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });

//Функция заполняющая инпуты формы данными о пользователе
function inputsFill() {
  popupProfile.querySelectorAll(".popup__input").forEach((input) => {
    input.value = userInfo.getUserInfo()[`${input.getAttribute("name")}`];
  });
}
//функция открытия окна просмотрщика
function handleClickCard(dataViwer) {
  popupWithImage.open(dataViwer);
}
//нажатие на кнопку лайк
function handleLikeClick(evt, cardId, card) {
  if (evt.target.classList.contains("card__like-button_active")) {
    api
      .disLike(cardId)
      .then((res) => {
        card.switchLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        card.switchLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//нажатие на кнопку удаления
function handleDeleteIconClick(cardId, element) {
  confirmDeletePopup.open(cardId, element);
}
//функция создающая карточку
function makeCard(cardData, userId) {
  const newCard = new Card(
    cardData,
    cardTemplate,
    userId,
    handleClickCard,
    handleLikeClick,
    handleDeleteIconClick
  );
  return newCard.createCard();
}

//валидация форм
const validatorProfile = new FormValidator(validationConfig, popupProfile);
const validatorPhoto = new FormValidator(validationConfig, popupPhoto);
const validatorAvatar = new FormValidator(validationConfig, popupAvatar);
validatorProfile.enableValidation();
validatorPhoto.enableValidation();
validatorAvatar.enableValidation();

//экземпляр окна просмотрщика
const popupWithImage = new PopupWithImage(".popup_photo-viwer");
popupWithImage.setEventListeners();

//отрисовка и добавление карточек в разметку
const cardList = new Section(
  {
    renderer: (data, userId) => {
      const item = makeCard(data, userId);
      cardList.addItem(item);
    },
  },
  cardsElement
);

const userInfo = new UserInfo({
  userName: ".profile__title",
  job: ".profile__subtitle",
  avatar: ".profile__avatar",
});

//попап подтверждения действия удаления
const confirmDeletePopup = new PopupWithSubmit(
  ".popup_confirmation",
  (cardId, element) => {
    api.cardDelete(cardId).then(() => {
      element.deleteCard();
      confirmDeletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
);
confirmDeletePopup.setEventListeners();

//смена аватара
const avatarEditPopup = new PopupWithForm(".popup_avatar", (avatarImage) => {
  avatarEditPopup.renderLoading(true);
  api
    .replaceAvatar(avatarImage)
    .then((newAvatar) => {
      userInfo.setUserInfo(newAvatar);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => avatarEditPopup.renderLoading(false));
});
avatarEdit.addEventListener("click", () => {
  avatarEditPopup.open();
  validatorAvatar.toggleButtonSave();
});
avatarEditPopup.setEventListeners();
//попап редактирования профиля
const profileEditPopup = new PopupWithForm(".popup_profile", (formData) => {
  profileEditPopup.renderLoading(true);
  api
    .editUserInfo(formData)
    .then((formData) => {
      userInfo.setUserInfo(formData);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profileEditPopup.renderLoading(false));
});

profileEdit.addEventListener("click", () => {
  profileEditPopup.open();
  inputsFill();
});

profileEditPopup.setEventListeners();

const cardAddingPopup = new PopupWithForm(".popup_photo", (cardData) => {
  cardAddingPopup.renderLoading(true);
  api
    .createNewCard(cardData)
    .then((cardData) => {
      const newCard = makeCard(cardData, cardData.owner._id);
      cardList.addItem(newCard);
      cardAddingPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => cardAddingPopup.renderLoading(false));
});

createPlace.addEventListener("click", () => {
  cardAddingPopup.open();
  validatorPhoto.toggleButtonSave();
});

cardAddingPopup.setEventListeners();
