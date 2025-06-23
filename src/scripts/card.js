import { cardTemplate } from "./index.js";

export const createCard = (
  cardData,
  onDeleteCard,
  onLikeCard,
  onOpenImagePopup
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Фото " + cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.addEventListener("click", onOpenImagePopup);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDeleteCard(cardElement));

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

export function handleDelete(cardElement) {
  const listItem = cardElement.closest(".places__item");
  listItem.remove();
}
