const content = document.querySelector('.content');
const places__list = content.querySelector('.places__list');

function addCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link ;
  cardElement.querySelector('.card__title').textContent = name ;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
  const listItem = deleteButton.closest('.places__item');
  deleteCard(listItem);
  }); 
  places__list.append(cardElement);
}

function deleteCard(listItem) {
  listItem.remove();
}

initialCards.forEach(function (elements) {
  const link = elements.link;
  const name = elements.name;
  addCard(link, name);
});



// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
