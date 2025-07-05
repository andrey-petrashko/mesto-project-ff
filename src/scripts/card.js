import { deleteCard, likeCard, disLikeCard } from "./api";

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
  const likeCounter = cardElement.querySelector(".like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  let likeArray = [];
  if (cardData.likes) {
    likeArray = cardData.likes;
  }
  const likeCount = likeArray.length;
  likeCounter.textContent = likeCount;
  cardImage.src = cardData.link;
  cardImage.alt = "Фото " + cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  if (cardData.owner["_id"] === myId) {
    deleteButton.addEventListener("click", () =>
      onDeleteCard(cardElement, cardData["_id"])
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
    onLikeCard(likeButton, cardData["_id"], likeCounter)
  );
  cardImage.addEventListener("click", () => onOpenImagePopup(cardData));
  return cardElement;
};

export function handleLike(likeButton, cardId, likeCounter) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {

    likeCard(cardId)
      .then(function (data) {
        likeCounter.textContent = data.likes.length ? data.likes.length : 0;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.log("Ошибка добавления лайка:", error);
      });
  } else {

    disLikeCard(cardId)
      .then(function (data) {
        likeCounter.textContent = data.likes.length ? data.likes.length : 0;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.log("Ошибка удаления лайка:", error);
      });
  }
}

export function handleDelete(cardElement, cardId) {

  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log("Ошибка удаления карточки:", error);
    });
}
