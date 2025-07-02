const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "8d0b0fef-7fc0-4f9e-a81c-c75c92bbe32f",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(config.baseUrl + "/cards", { headers: config.headers })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    });
};

export const getProfileInfo = () => {
  return fetch(config.baseUrl + "/users/me", { headers: config.headers })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    });
};

export const deleteCard = (cardId) => {
  fetch(config.baseUrl + "/cards/" + cardId, {
    method: "DELETE",
    headers: config.headers,
  }).then(function (res) {
    return res.json();
  });
};

export const likeCard = (cardId, method) => {
  return fetch(config.baseUrl + "/cards/likes/" + cardId, {
    method: method,
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      const counter = Array.from(data.likes).length;
      return counter;
    });
};

export const patchProfileInfo = function (name, about) {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(function (response) {
    return response.json();
  });
};

export const patchChangeAvatar = function (avatarUrl) {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(function (response) {
    return response.json();
  });
};

export const postNewPlace = function (name, link) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-41/cards", {
    method: "POST",
    headers: {
      authorization: "8d0b0fef-7fc0-4f9e-a81c-c75c92bbe32f",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(function (response) {
    return response.json();
  });
};
