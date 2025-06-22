import { cardTemplate, popupImage } from "./index.js";
import { openPopup } from "./popups.js";

export function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Фото " + cardData.name;
  cardImage.addEventListener("click", function () {
    openPopup(popupImage);
    const largeImage = document.querySelector(".popup__image");
    largeImage.src = cardData.link;
    largeImage.alt = "Фото " + cardData.name;
    const largeImageCaption = document.querySelector(".popup__caption");
    largeImageCaption.textContent = cardData.name;
  });

  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".places__item");
    deleteCard(listItem);
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  return cardElement;
}

function deleteCard(listItem) {
  listItem.remove();
}
