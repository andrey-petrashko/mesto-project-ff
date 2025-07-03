export function prepareAnimation(popups) {
  popups.forEach(function (element) {
    element.classList.add("popup_is-animated");
  });
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

export function handleOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target.closest(".popup"));
  }
}

export function handleButtonClose(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.closest(".popup"));
  }
}

export function openPopup(popupItem) {
  popupItem.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEsc);
}

export function closePopup(popupItem) {
  popupItem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEsc);
}
