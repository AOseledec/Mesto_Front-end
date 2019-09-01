import {Api} from './Api.js'

const url = {
    URL_BASE: 'https://praktikum.tk/cohort1',
    URL_USERS: '/users',
    TOKEN: '05085b6d-94ca-4d8c-9b9c-a218a21e8eeb',
    URL_ME: '/users/me',
    URL_CARDS: '/cards',
}
export const api = new Api({
  URL_BASE: url.URL_BASE,
  headers: {
    authorization: url.TOKEN,
    'Content-Type': 'application/json'
  }
});
