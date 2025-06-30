import "../pages/index.css";
import { createCard, handleDelete, handleLike } from "./card.js";


import {
  prepareAnimation,
  handleOverlayClick,
  openPopup,
  closePopup,
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

const content = document.querySelector(".content");
export const places__list = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileDescription = document.querySelector(".profile__description");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileImage = document.querySelector(".profile__image");
const formPopupProfileEdit = popupProfileEdit.querySelector(".popup__form");

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
const descriptiomPictureInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);

const linkPictureInput = popupNewCard.querySelector(".popup__input_type_url");
const largeImagePopup = document.querySelector(".popup_type_image");
const largeImage = largeImagePopup.querySelector(".popup__image");
const imagePopupCaption = largeImagePopup.querySelector(".popup__caption");

formEditProfile.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '8d0b0fef-7fc0-4f9e-a81c-c75c92bbe32f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileNameInput.value,
      about: profileDescriptionInput.value
    })
  })
    .then(function(res) {
      return res.json();
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      console.log(data);
    });






 // profileTitle.textContent = profileNameInput.value;
 // profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupProfileEdit);
});

formNewPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  const newCardData = {};
  newCardData.name = descriptiomPictureInput.value;
  newCardData.link = linkPictureInput.value;
  const cardElement = createCard(
    newCardData,
    handleDelete,
    handleLike,
    openImagePopup,
    cardTemplate
  );
  formNewPlace.reset();
  places__list.prepend(cardElement);
  closePopup(popupNewCard);
});

function renderCard(initialCards) {
  initialCards.forEach(function (elements) {
    const cardData = elements;
    const cardElement = createCard(
      cardData,
      handleDelete,
      handleLike,
      openImagePopup,
      cardTemplate
    );
    places__list.prepend(cardElement);
  });
}


const popups = document.querySelectorAll(".popup");
prepareAnimation(popups);

popups.forEach(function (element) {
  element.addEventListener("click", handleOverlayClick);
});

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", openPopupProfileEdit);

function openPopupProfileEdit() {
  clearValidation(formPopupProfileEdit, validationConfig);
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
}

const newCardButton = document.querySelector(".profile__add-button");
newCardButton.addEventListener("click", openPopupNewCard);

function openPopupNewCard() {
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
  openPopup(popupNewCard);
}

function openImagePopup(cardData) {
  largeImage.src = cardData.link;
  largeImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(largeImagePopup);
}

enableValidation(validationConfig);

fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
  headers: {
    authorization: '8d0b0fef-7fc0-4f9e-a81c-c75c92bbe32f'
  }
  })

  .then (function(res) {
    return res.json();
  })
  .then  ((data) => {
    renderCard(data);
  })

  fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
  headers: {
    authorization: '8d0b0fef-7fc0-4f9e-a81c-c75c92bbe32f'
  }
  })

  .then (function(res) {
    return res.json();
  })
  .then  ((data) => {
      profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
  })

  