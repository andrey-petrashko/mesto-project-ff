const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "8d0b0fef-7fc0-4f9e-a81c-c75c92bbe32f",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getInitialCards = () => {
  return fetch(config.baseUrl + "/cards", { 
    headers: config.headers })
    .then(getResponseData)
};

export const getProfileInfo = () => {
  return fetch(config.baseUrl + "/users/me", { 
    headers: config.headers })
    .then(getResponseData)
};

export const deleteCard = (cardId) => {
  return fetch(config.baseUrl + "/cards/" + cardId, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData)
};


export const likeCard = (cardId) => { 
  return fetch(config.baseUrl + "/cards/likes/" + cardId, { 
    method: "PUT", 
    headers: config.headers, 
  }) 
    .then(getResponseData)
};

export const disLikeCard = (cardId) => { 
  return fetch(config.baseUrl + "/cards/likes/" + cardId, { 
    method: "DELETE", 
    headers: config.headers, 
  }) 
    .then(getResponseData)
};

export const patchProfileInfo = function (data) {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(getResponseData)
};

export const patchChangeAvatar = function (data) {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(getResponseData)
};

export const postNewPlace = function (data) {
  return fetch(config.baseUrl + "/cards/", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(getResponseData)
};