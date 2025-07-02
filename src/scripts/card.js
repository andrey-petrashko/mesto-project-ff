export const createCard = (
  cardData,
  myId,
  onDeleteCard,
  onLikeCard,
  onOpenImagePopup,
  cardTemplate
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Фото " + cardData.name;
  const cardOwner = cardData.owner["_id"];
  console.log(cardOwner, myId);
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardOwner === myId) {
    const cardId = cardData['_id'];
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement, cardId));
  }
  else {deleteButton.style.display = 'none';}

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => onLikeCard(likeButton));
  cardImage.addEventListener("click", () => onOpenImagePopup(cardData));
  return cardElement;
};

export function handleLike(likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}
import { deleteCard } from "./api";

export function handleDelete(cardElement, cardId) {
  deleteCard(cardId);
  const listItem = cardElement.closest(".places__item");
  listItem.remove();
}
