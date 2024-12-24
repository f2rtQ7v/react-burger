const baseApiUrl = 'https://norma.nomoreparties.space/api';

const ingredientsUrl = `${baseApiUrl}/ingredients`;

export function getIngredients() {
  return fetch(ingredientsUrl).then(r => r.ok ? r.json() : Promise.reject(`Ошибка: ${r.status}`));
}
