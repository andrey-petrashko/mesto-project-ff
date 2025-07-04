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

export const apiFunction = function (urlAdd, method, data) {
  return fetch(config.baseUrl + urlAdd, {
    method: method,
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(getResponseData)
};

