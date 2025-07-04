import "../pages/index.css";
import { createCard, handleDelete, handleLike } from "./card.js";
import {
  apiFunction
} from "./api.js";

import {
  prepareAnimation,
  handleOverlay,
  handleButtonClose,
  openPopup,
  closePopup
} from "./modals.js";
import { enableValidation, clearValidation } from "./validation.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const profileImageContainer = document.querySelector(
  ".profile__image-container"
);
const newCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const content = document.querySelector(".content");
const places__list = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileImage = document.querySelector(".profile__image");
const formPopupProfileEdit = popupProfileEdit.querySelector(".popup__form");
const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
const formChangeAvatar = popupChangeAvatar.querySelector(".popup__form");
const avatarInput = formChangeAvatar.querySelector(".popup__input_type_avatar");
const profileDescriptionInput = popupProfileEdit.querySelector(
  ".popup__input_type_description"
);
const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupNewCard.querySelector(".popup__form");
const profileNameInput = popupProfileEdit.querySelector(
  ".popup__input_type_name"
);
const profileTitle = document.querySelector(".profile__title");
const formNewPlace = document.forms["new-place"];
const formEditProfile = document.forms["edit-profile"];
const descriptionPictureInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkPictureInput = popupNewCard.querySelector(".popup__input_type_url");
const largeImagePopup = document.querySelector(".popup_type_image");
const largeImage = largeImagePopup.querySelector(".popup__image");
const imagePopupCaption = largeImagePopup.querySelector(".popup__caption");

formEditProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  const urlAdd = "/users/me";
  const profileData = {
    "name": profileNameInput.value,
    "about": profileDescriptionInput.value
  };
  const method = "PATCH";

  apiFunction(urlAdd, method, profileData)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      formEditProfile.reset();
      closePopup(popupProfileEdit);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
})

formChangeAvatar.addEventListener("submit", function (event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  const data = {
    "avatar": avatarInput.value,
  };
  const urlAdd = "/users/me/avatar";
  const method = "PATCH";

  apiFunction(urlAdd, method, data)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      formChangeAvatar.reset();
      closePopup(popupChangeAvatar);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении автара:", error);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
})

formNewPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  const urlAdd = "/cards/";
  const method = "POST";
  const newCardData = {
    "name": descriptionPictureInput.value,
    "link": linkPictureInput.value
  };

  apiFunction(urlAdd, method, newCardData)
    .then((data) => {
      const myId = data.owner["_id"];
      const cardElement = createCard(
        data,
        myId,
        handleDelete,
        handleLike,
        openImagePopup,
        cardTemplate);
      formNewPlace.reset();
      places__list.prepend(cardElement);
      closePopup(popupNewCard);
    })
    .catch((error) => {
      console.log("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
})

prepareAnimation(popups);

popups.forEach(function (element) {
  element.addEventListener("mousedown", handleOverlay);
  element.addEventListener("click", handleButtonClose);
});

profileEditButton.addEventListener("click", openPopupProfileEdit);

function openPopupProfileEdit() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  clearValidation(formPopupProfileEdit, validationConfig);
  openPopup(popupProfileEdit);
}

profileImageContainer.addEventListener("click", openPopupChangeAvatar);

function openPopupChangeAvatar() {
  clearValidation(formChangeAvatar, validationConfig);
  openPopup(popupChangeAvatar);
}

newCardButton.addEventListener("click", openPopupNewCard);

function openPopupNewCard() {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openPopup(popupNewCard);
}

function openImagePopup(cardData) {
  largeImage.src = cardData.link;
  largeImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(largeImagePopup);
}

enableValidation(validationConfig);

function initialPage() {

  const initialCardsUrlAdd = "/cards";
  const profileInfoUrlAdd = "/users/me";
  const method = "GET";

  Promise.all([apiFunction(initialCardsUrlAdd), apiFunction(profileInfoUrlAdd)])
    .then(([initialCards, profileInfo]) => {
      renderCard(initialCards, profileInfo._id);
      renderProfileInfo(profileInfo);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
}

initialPage();

function renderProfileInfo(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
}

function renderCard(initialCards, myId) {
  initialCards.forEach(function (elements) {
    const cardData = elements;
    const cardElement = createCard(
      cardData,
      myId,
      handleDelete,
      handleLike,
      openImagePopup,
      cardTemplate
    );
    places__list.append(cardElement);
  });
}