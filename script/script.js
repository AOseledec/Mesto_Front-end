
/* Классы */

class Card {

  constructor(title, url, idCard) {
    this.cardElement = this.create(title,url, idCard);
    this.idCard = idCard;
  }
  
  remove(event) {
    event.target.closest('.place-card').parentElement.removeChild(this.cardElement);
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  create(title, url, idCard) {

    const cardContainer = document.createElement('div');
    const cardImageContainer = document.createElement('div');
    const cardButtonDelete = document.createElement('button');
    const cardDescriptionContainer = document.createElement('div');
    const cardTitleElement = document.createElement('h3');
    const cardButtonLike = document.createElement('button');

    cardContainer.classList.add('place-card');
    cardImageContainer.classList.add('place-card__image');
    cardImageContainer.style.backgroundImage = `url(${url})`;
    cardButtonDelete.classList.add('place-card__delete-icon');
    cardDescriptionContainer.classList.add('place-card__description');
    cardTitleElement.classList.add('place-card__name');
    cardTitleElement.textContent = title;
    cardButtonLike.classList.add('place-card__like-icon');

    if(idCard === api.user._id){
      cardButtonDelete.classList.add('place-card__delete-icon_display-block');
    }

    cardImageContainer.appendChild(cardButtonDelete);
    cardDescriptionContainer.appendChild(cardTitleElement);
    cardDescriptionContainer.appendChild(cardButtonLike);
    cardContainer.appendChild(cardImageContainer);
    cardContainer.appendChild(cardDescriptionContainer);


    cardButtonLike.addEventListener('click', this.like);
    cardButtonDelete.addEventListener('click', (event) => {this.remove(event);});
    return cardContainer;
  }

}
class CardList {
  constructor(container, /*listCards,*/ popup) {
    this.container  = container;
    // this.listCards  = listCards;
    this.popupImage = new Popup(popup);
    
    this.container.addEventListener('click', this.openImagePopup.bind(this));
    // this.render();
  }

  addCard(title, url, idCard) {
    const { cardElement } = new Card(title, url, idCard);
    this.container.appendChild(cardElement);
  }

  // render() {
  //   this.listCards.forEach(element => {
  //     this.addCard(element.name, element.link);
  //   });
  // }

  openImagePopup(event){
    if(event.target.classList.contains('place-card__image')){
      this.popupImage.openImage(event.target.style.backgroundImage.slice(5,-2),this.popupImage);
    }
  }

}

class Popup {
  constructor(popup, buttonOpenPopup) {
    
    this.popup              = popup;
    this.contentPopup       = this.popup.querySelector('.popup__content');
    this.buttonClose        = this.popup.querySelector('.popup__close');
    this.img                = document.createElement('img');

    if(!!buttonOpenPopup){
      this.buttonOpenPopup  = buttonOpenPopup;
      this.buttonOpenPopup.addEventListener('click', event => {this.open(event);});
    }    

    if(!this.contentPopup.classList.contains('.popup__img')){
      this.form = this.contentPopup.querySelector('.popup__form');
    }

    this.buttonClose.addEventListener('click', event => {this.close(event);});
  }
  
  open() {
    this.popup.classList.add('popup_is-opened');
  }

  openImage(url, popup){
    this.img.src = url;
    this.img.classList.add('popup__img');
    this.contentPopup.appendChild(this.img);
    popup.open();
  }

  close() {
    if(this.contentPopup.classList.contains('popup__img')){
      this.contentPopup.removeChild(this.img);
    } else {
      this.form.reset();
    }
    this.popup.classList.remove('popup_is-opened');
  }

}

class Api {
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


/* Функции */

function validate(element) {

  const errorElement = document.querySelector(`#error-${element.id}`);
  
  // вывод сообщения об ошибке
  if(!element.checkValidity()) {
      errorElement.textContent = element.validationMessage;
      // добавляем класс ошибке/ стилизуем сообщение об ошибке
      activateError(errorElement);
      
      return false;
  }
  return true;
}


// -------------------Активация ошиби---------------------
function activateError(element) {
  element.parentNode.classList.add('popup__span-error');
}

//---------------------Сброс ошибки---------------------------
function resetError(element) {
  const input = document.querySelector(`#error-${element.id}`);
  input.parentNode.classList.remove('popup__span-error');
  input.textContent = '';
}


//---------------Проверка импутов------------------ 
function checkInputs(event){
  const parent = event.target.parentElement.elements;
  const inputs = Array.from(parent);

  return inputs.every(element => validate(element));
}


function activateButton (button) {
  button.disabled = false;
  button.classList.add('popup__button_is-active');
}

function disabledButton (button) {
  button.disabled = true;
  button.classList.remove('popup__button_is-active');
}

function switchButton(bool, button) {
  if(!bool){
    disabledButton (button);
  } else {
    activateButton (button);
  }
}

function handleValidate(event) {
  
  const buttonSubmit = event.target.parentElement.elements.button;
  
  switchButton(checkInputs(event), buttonSubmit);
  
  resetError(event.target);
  
  validate(event.target);
  
}

function sendNewCard(res) {
  cardList.addCard(res.name, res.link);
}

function changeEditInfo(res) {
  userInfoName.textContent  = res.name;
  userInfoJob.textContent   = res.about;
}

function changeAvatar(res) {
  userAvatar.style.backgroundImage = `url(${res.avatar})`;
}

function sendData(event, body, popup, callbak) {
  /** описание функции
   * event  - собыите отправки формы
   * body   - тело запроса на сервер
   * popup  - форма отправки 
   * callbak- действия при положительном ответе сервера связан с response
   */
  event.preventDefault();
  const button  = event.target.button; 

  //при отправке данных меняем значение кнопки 
  renderLoading(true, button);
switch (event.target.name) {
  case 'newCard':
    api.addNewCard(body)
    .then(res => callbak(res))
    .catch(err => console.log(err))
    .finally(()=>{
      disabledButton(button);
      renderLoading(false, button, '+');
      popup.close();
    });
    break;
  case 'editInfo':
    api.setUserInfo(body)
    .then(res => callbak(res))
    .catch(err => console.log(err))
    .finally(()=>{
      disabledButton(button);
      renderLoading(false, button, 'Сохранить');
      popup.close();
    });
    break;
  case 'avatar':
    api.setUserAvatar(body)
    .then(res => callbak(res))
    .catch(err => console.log(err))
    .finally(()=>{
      disabledButton(button);
      renderLoading(false, button, 'Сохранить');
      popup.close();
    });
    break;

  default:
    console.log('Что-то пошло не так');
    break;
}
}

function renderLoading(isLoading, button, innerText) {
  if(isLoading){
    button.innerText = 'Загрузка...';  
  } else {
    button.innerText = innerText;  
  }
}

/* Переменные */
const myToken             = '05085b6d-94ca-4d8c-9b9c-a218a21e8eeb';
const urlUsers            = '/users';
const urlMe               =  urlUsers + '/me';
const urlCards            = '/cards';

const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort1',
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json'
  }
});

const cardList = new CardList( document.querySelector('.places-list'), /*[],*/ document.getElementById('img'));

const buttonUserInfo      = document.getElementById('editInfoButton');
const buttonAddNewCard    = document.getElementById('addNewCard');
const userAvatar          = document.querySelector('.user-info__photo');

const popupAddNewCard     = new Popup(document.getElementById('card'), buttonAddNewCard);
const popupEditInfo       = new Popup(document.getElementById('edit'), buttonUserInfo);
const popupAvatar         = new Popup(document.getElementById('avatar'), userAvatar);

const formAddNewCard      = popupAddNewCard.form;
const formEditInfo        = popupEditInfo.form;
const formAvatar          = popupAvatar.form;

const buttonSubmitNewCard = formAddNewCard.elements.button;
const buttonSubmitEditInfo= formEditInfo.elements.button;
const buttonSubmitAvatar  = formAvatar.elements.button;

const userInfoName        = document.querySelector('.user-info__name');
const userInfoJob         = document.querySelector('.user-info__job');
const userPhoto           = document.querySelector('.user-info__photo');


api.getInitialCards();
/* Слушатели */

buttonUserInfo.addEventListener('click', ()=>{
  popupEditInfo.open();
  formEditInfo.elements.inputFirst.value = userInfoName.textContent;
  formEditInfo.elements.inputSecond.value = userInfoJob.textContent;
});


formAddNewCard.addEventListener('submit', event => sendData(event, {
    name: formAddNewCard.elements.inputFirst.value,
    link: formAddNewCard.inputSecond.value
  }, popupAddNewCard, sendNewCard)
);

formEditInfo.addEventListener('submit', event => sendData(event, {
  name: formEditInfo.elements.inputFirst.value,
  about: formEditInfo.elements.inputSecond.value
  }, popupEditInfo, changeEditInfo)
);

formAvatar.addEventListener('submit', event => sendData(event, {
    avatar: formAvatar.elements.inputFirst.value, 
  }, popupAvatar, changeAvatar)
);

formAddNewCard.elements.inputFirst.addEventListener('input', handleValidate);
formEditInfo.elements.inputSecond.addEventListener('input', handleValidate);
formAddNewCard.elements.inputSecond.addEventListener('input', handleValidate);
formEditInfo.elements.inputFirst.addEventListener('input', handleValidate);
formAvatar.elements.inputFirst.addEventListener('input', handleValidate);

/*
  Отлично, теперь все реализовано правильно

*/