export const BASE_URL = 'https://back.mestoproject.nomoredomains.rocks';

// Регистрация / авторизация пользователя
const authApi = (password, email, path) => {
  return fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const authApiToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export {authApiToken, authApi};