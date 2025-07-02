import { likeCard, deleteCard } from "./api";

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
  const cardOwner = cardData.owner["_id"];
  const likeCounter = cardElement.querySelector(".like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardId = cardData["_id"];
  let likeArray = [];

  if (cardData.likes) {
    likeArray = Array.from(cardData.likes);
  }
  const likeCount = likeArray.length;
  likeCounter.textContent = likeCount;

  cardImage.src = cardData.link;
  cardImage.alt = "Фото " + cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  if (cardOwner === myId) {
    deleteButton.addEventListener("click", () =>
      onDeleteCard(cardElement, cardId)
    );
  } else {
    deleteButton.style.display = "none";
  }
  likeArray.forEach(function (element) {
    if (element["_id"] === myId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  likeButton.addEventListener("click", () =>
    onLikeCard(likeButton, cardData.cardId, likeCounter)
  );
  cardImage.addEventListener("click", () => onOpenImagePopup(cardData));
  return cardElement;
};

export function handleLike(likeButton, cardId, likeCounter) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    const method = "PUT";
    likeButton.classList.add("card__like-button_is-active");
    likeCard(cardId, method).then((counter) => {
      likeCounter.textContent = counter;
    });
  } else {
    const method = "DELETE";
    likeButton.classList.remove("card__like-button_is-active");
    likeCard(cardId, method).then((counter) => {
      likeCounter.textContent = counter;
    });
  }
}

export function handleDelete(cardElement, cardId) {
  deleteCard(cardId);
  const listItem = cardElement.closest(".places__item");
  listItem.remove();
}
