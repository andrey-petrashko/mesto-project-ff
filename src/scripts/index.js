import "../pages/index.css";
import { createCard, handleDelete, handleLike } from "./card.js";
import { initialCards } from "./cards.js";
import {
  prepareAnimation,
  handleOverlayClick,
  openPopup,
  closePopup,
} from "./modals.js";

const content = document.querySelector(".content");
export const places__list = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const profileDescription = document.querySelector(".profile__description");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileDescriptionInput = popupProfileEdit.querySelector(
  ".popup__input_type_description"
);

const popupNewCard = document.querySelector(".popup_type_new-card");
const profileNameInput = popupProfileEdit.querySelector(".popup__input_type_name");
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
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
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
    openImagePopup
  );
  formNewPlace.reset();
  places__list.prepend(cardElement);
  closePopup(popupNewCard);
});

function renderCard() {
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

renderCard();
const popups = document.querySelectorAll(".popup");
prepareAnimation(popups);

popups.forEach(function (element) {
  element.addEventListener("click", handleOverlayClick);
});

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", openPopupProfileEdit);

function openPopupProfileEdit() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
}

const newCardButton = document.querySelector(".profile__add-button");
newCardButton.addEventListener("click", openPopupNewCard);

function openPopupNewCard() {
  openPopup(popupNewCard);
}

function openImagePopup(cardData) {
  largeImage.src = cardData.link;
  largeImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(largeImagePopup);
}
