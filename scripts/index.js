const content = document.querySelector('.content');
const places__list = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link ;
  cardElement.querySelector('.card__image').alt = ('Фото '+ cardData.name);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
  const listItem = deleteButton.closest('.places__item');
  deleteCard(listItem);
  }); 
  return (cardElement);
}

function renderCard() {
  initialCards.forEach(function (elements) {
    const cardData = elements;
    const cardElement = createCard(cardData); 
    places__list.prepend(cardElement);
  });
}

function deleteCard(listItem) {
  listItem.remove();
}

renderCard();

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
