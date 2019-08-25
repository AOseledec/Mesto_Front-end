import {Api} from './Api.js'

const url = {
    base: 'https://praktikum.tk/cohort1',
    urlUsers: '/users',
    token: '05085b6d-94ca-4d8c-9b9c-a218a21e8eeb',
    urlMe: '/users/me',
    urlCards: '/cards',
}
export const api = new Api({
  baseUrl: url.base,
  headers: {
    authorization: url.token,
    'Content-Type': 'application/json'
  }
});