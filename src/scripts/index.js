import "../pages/index.css";
import { createCard } from "./card.js";
import { initialCards } from "./cards.js";

const content = document.querySelector(".content");
export const places__list = content.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

function renderCard() {
  initialCards.forEach(function (elements) {
    const cardData = elements;
    const cardElement = createCard(cardData);
    places__list.prepend(cardElement);
  });
}

renderCard();

import { prepareAnimation, openPopup, closePopup } from "./popups.js";
const popups = document.querySelectorAll(".popup");

prepareAnimation(popups);

const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", function (event) {
  const nameInput = popupProfileEdit.querySelector(".popup__input_type_name");
  const nameTextArea = document.querySelector(".profile__title");
  nameInput.value = nameTextArea.textContent;

  const profileDescriptionInput = popupProfileEdit.querySelector(
    ".popup__input_type_description"
  );
  const profileDescription = document.querySelector(".profile__description");
  profileDescriptionInput.value = profileDescription.textContent;

  const submitButton = popupProfileEdit.querySelector(".popup__button");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    nameTextArea.textContent = nameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(popupProfileEdit);
  });

  openPopup(popupProfileEdit);
});

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardButton = document.querySelector(".profile__add-button");
newCardButton.addEventListener("click", function (event) {
  openPopup(popupNewCard);
  const submitButton = popupNewCard.querySelector(".popup__button");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const descriptiomPictureInput = popupNewCard.querySelector(
      ".popup__input_type_card-name"
    );
    const linkPictureInput = popupNewCard.querySelector(
      ".popup__input_type_url"
    );
    const newCardData = {};

    newCardData.name = descriptiomPictureInput.value;
    newCardData.link = linkPictureInput.value;

    const cardElement = createCard(newCardData);
    places__list.prepend(cardElement);
    closePopup(popupNewCard);
  });
});

export const popupImage = document.querySelector(".popup_type_image");