
export const createCard = (
  cardData,
  myId,
  onDeleteCard,
  onLikeCard,
  onOpenImagePopup,
  cardTemplate
) => {
  const likeArray = Array.from(cardData.likes);
  const cardId = cardData['_id'];
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Фото " + cardData.name;
  const cardOwner = cardData.owner["_id"];
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardOwner === myId) {
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement, cardId));
  }
  else {deleteButton.style.display = 'none';}
  likeArray.forEach(function (element) {
    if (element['_id'] === myId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  
  likeButton.addEventListener("click", () => onLikeCard(likeButton, cardId));
  cardImage.addEventListener("click", () => onOpenImagePopup(cardData));
  return cardElement;
};

import { likeCard } from "./api";

export function handleLike(likeButton, cardId) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.add("card__like-button_is-active");
    const method = 'PUT';
    function delLike (input) {
      console.log(input);
    }
    delLike(likeCard(cardId, method));
  
  } 
  else {
    const method = 'DELETE';
    likeButton.classList.remove("card__like-button_is-active");
    function delLike (input) {
      console.log(input);
    }
    delLike(likeCard(cardId, method));

  }
}
import { deleteCard } from "./api";

export function handleDelete(cardElement, cardId) {
  deleteCard(cardId);
  const listItem = cardElement.closest(".places__item");
  listItem.remove();
}
