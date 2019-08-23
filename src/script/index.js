import "../pages/index.css";
import "../images/logo.svg"
import "../images/close.svg";

import {CardList} from './Cardlist.js';
import {Popup} from './Popup.js';
import {Api} from './Api.js';


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
  baseUrl: 'https://praktikum.tk/cohort1',
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json'
  }
});

export const cardList = new CardList( document.querySelector('.places-list'), /*[],*/ document.getElementById('img'));

const buttonUserInfo      = document.getElementById('editInfoButton');
const buttonAddNewCard    = document.getElementById('addNewCard');

const popupAddNewCard     = new Popup(document.getElementById('card'), buttonAddNewCard);
const popupEditInfo       = new Popup(document.getElementById('edit'), buttonUserInfo);
const popupAvatar         = new Popup(document.getElementById('avatar'), userAvatar);

const formAddNewCard      = popupAddNewCard.form;
const formEditInfo        = popupEditInfo.form;
const formAvatar          = popupAvatar.form;

const buttonSubmitNewCard = formAddNewCard.elements.button;
const buttonSubmitEditInfo= formEditInfo.elements.button;
const buttonSubmitAvatar  = formAvatar.elements.button;

export const userInfoName        = document.querySelector('.user-info__name');
export const userInfoJob         = document.querySelector('.user-info__job');
export const userAvatar          = document.querySelector('.user-info__photo');


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

export {api as indexApi};