export class Api {
    constructor(options) {
      // тело конструктора
      this.url      = options.baseUrl;
      this.headers  = options.headers;
      this.user     = this.getUserInfo(); 
    }
  
    // Формируем запрос на сервер
    sendRequest(url, method, body) {
      return fetch(`${this.url}${url}`, {
              method: method.toUpperCase(), 
              headers: this.headers,
        body: JSON.stringify(body)
          })
      .then(res => {
          if(res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => Promise.reject(err));
    }
  
    // загружаем с сервера начальный набор карточек
    getInitialCards() {
      this.sendRequest('/cards','get')
      // .then(res => res.filter(item => item.owner._id == this.user._id)) // Удалить строку для отображения всех карточек
      .then(res => {
        res.forEach(item => {
          cardList.addCard(item.name, item.link, item.owner._id);
        });
      })
      .catch(err => console.log(err));
    }
  
    // получаем информацию о пользователе
    getUserInfo() {
      this.sendRequest('/users/me', 'get').then(res => {
        this.user = res;
        userInfoName.textContent          = res.name;
        userInfoJob.textContent           = res.about;
        userAvatar.style.backgroundImage  = `url(${res.avatar})`;
      }).catch(err => console.log(err));
    }
  
    // добавляем карточку
    addNewCard(body) {
      return this.sendRequest('/cards', 'POST', body);  
    }
    
    // отправляем информацию о пользователе
    setUserInfo(body) {  
      return this.sendRequest('/users/me', 'PATCH', body);
    }
  
    setUserAvatar(body) {
      return this.sendRequest('/users/me/avatar','PATCH', body/*{avatar: ''}*/);
    }
  
    deleteCard() {
  
    }
  
    setLikeCard() {
      return this.sendRequest('/cards/like/cardId', 'PUT', body);
    }
  
    
    // другие методы работы с API
}