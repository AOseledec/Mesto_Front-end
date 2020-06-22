export class Api {
  constructor(options) {
    this.url = options.URL_BASE
    this.headers = options.headers
  }

  async sendRequest(url, method, body) {
    try {
      const res = await fetch(`${this.url}${url}`, {
        method: method.toUpperCase(),
        headers: this.headers,
        body: JSON.stringify(body)
      });
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  getInitialCards() {
    return this.sendRequest('/cards', 'get');
  }


  getUserInfo() {
    return this.sendRequest('/users/me', 'get');
  }

  userInfo() {
    return this.getUserInfo()
      .then((res) => {
        const obj = {};
        for (let key in res) {
          obj[key] = res[key];
        }
        return obj;
      })
  }

  addNewCard(body) {
    return this.sendRequest('/cards', 'POST', body);
  }

  setUserInfo(body) {
    return this.sendRequest('/users/me', 'PATCH', body);
  }

  setUserAvatar(body) {
    return this.sendRequest('/users/me/avatar', 'PATCH', body);
  }

  deleteCard() {
    return this.sendRequest('/cards/delete/cardId', 'DELETE', body);
  }

  setLikeCard() {
    return this.sendRequest('/cards/like/cardId', 'PUT', body);
  }
}