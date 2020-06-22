import {
  api
} from './Backend'
import {
  cardList,
  buttonUserInfo,
  buttonAddNewCard,
  popupAddNewCard,
  popupEditInfo,
  popupAvatar,
  formAddNewCard,
  formEditInfo,
  formAvatar,
  userInfoName,
  userInfoJob,
  userAvatar
} from './constants'

function validate(element) {

  const errorElement = document.querySelector(`#error-${element.id}`)

  // вывод сообщения об ошибке
  if (!element.checkValidity()) {
    errorElement.textContent = element.validationMessage;
    // добавляем класс ошибке/ стилизуем сообщение об ошибке
    activateError(errorElement);

    return false;
  }
  return true;
}

function activateError(element) {
  element.parentNode.classList.add('popup__span-error');
}

function resetError(element) {
  const input = document.querySelector(`#error-${element.id}`);
  input.parentNode.classList.remove('popup__span-error');
  input.textContent = '';
}

function checkInputs(event) {
  const parent = event.target.parentElement.elements;
  const inputs = Array.from(parent);

  return inputs.every(element => validate(element));
}


function activateButton(button) {
  button.disabled = false;
  button.classList.add('popup__button_is-active');
}

function disabledButton(button) {
  button.disabled = true;
  button.classList.remove('popup__button_is-active');
}

function switchButton(bool, button) {
  if (!bool) {
    disabledButton(button);
  } else {
    activateButton(button);
  }
}

function handleValidate(event) {

  const buttonSubmit = event.target.parentElement.elements.button;

  switchButton(checkInputs(event), buttonSubmit);

  resetError(event.target);

  validate(event.target);

}

function sendNewCard(res) {
  cardList.addCard(res.name, res.link, res._id, res.owner._id);
}

function changeAvatar(res) {
  userAvatar.style.backgroundImage = `url(${res.avatar})`;
}

function sendData(event, body, popup, callback) {
  /** описание функции
   * event  - собыите отправки формы
   * body   - тело запроса на сервер
   * popup  - форма отправки 
   * callback- действия при положительном ответе сервера связан с response
   */
  event.preventDefault();
  const {
    button
  } = event.target;

  //при отправке данных меняем значение кнопки 
  renderLoading(true, button);

  switch (event.target.name) {
    case 'newCard':
      api.addNewCard(body)
        .then(res => callback(res))
        .catch(err => console.log(err))
        .finally(() => {
          disabledButton(button);
          renderLoading(false, button, '+');
          popup.close();
        });
      break;
    case 'editInfo':
      api.setUserInfo(body)
        .then(res => {
          userInfoName.textContent = res.name;
          userInfoJob.textContent = res.about;
          userAvatar.style.backgroundImage = `url(${res.avatar})`;
          return res
        })
        .then(res => callback(res))
        .catch(err => console.log(err))
        .finally(() => {
          disabledButton(button);
          renderLoading(false, button, 'Сохранить');
          popup.close();
        });
      break;
    case 'avatar':
      api.setUserAvatar(body)
        .then(res => callback(res))
        .catch(err => console.log(err))
        .finally(() => {
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
  button.innerText = isLoading ? 'Загрузка...' : innerText
}

export {
  validate,
  activateError,
  resetError,
  checkInputs,
  activateButton,
  disabledButton,
  switchButton,
  handleValidate,
  sendNewCard,
  changeAvatar,
  sendData,
  renderLoading
}