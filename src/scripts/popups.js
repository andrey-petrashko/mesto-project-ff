export function prepareAnimation(popups) {
  popups.forEach(function (element) {
    element.classList.add("popup_is-animated");
  });
}

function handleEsc(event, popupItem) {
  if (event.key === "Escape") {
    closePopup(popupItem);
  }
}

export function openPopup(popupItem) {
  popupItem.classList.remove("popup_is-animated");
  popupItem.classList.add("popup_is-opened");

  const handleEsc = (event) => {
    if (event.key === "Escape") {
      closePopup(popupItem);
    }
  };
  window.addEventListener("keydown", handleEsc);
  popupItem.handleEsc = handleEsc;

  const handleClick = (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close")
    ) {
      closePopup(popupItem);
    }
  };
  popupItem.addEventListener("click", handleClick);
  popupItem.handleClick = handleClick;
}

export function closePopup(popupItem) {
  window.removeEventListener("keydown", popupItem.handleEsc);
  popupItem.removeEventListener("click", popupItem.handleClick);
  popupItem.classList.remove("popup_is-opened");
  popupItem.classList.add("popup_is-animated");
}
