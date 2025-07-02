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
      return (data);
    });
};

export const getProfileInfo = () => {
  return fetch(config.baseUrl + "/users/me", { headers: config.headers })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return (data);
    });
};

export const deleteCard = (cardId) => {
  fetch(config.baseUrl + "/cards/" + cardId, { 
    method: 'DELETE',
    headers: config.headers })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

export const likeCard = (cardId, method) => {
  fetch(config.baseUrl + "/cards/likes/" + cardId, { 
    method: method,
    headers: config.headers })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const counter = (Array.from(data.likes)).length;
      return (counter);

    });
}