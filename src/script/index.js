import "../pages/index.css"
import "../images/logo.svg"
import "../images/close.svg"
import {api} from './Backend.js'
import {
  handleValidate,
  sendNewCard,
  changeAvatar,
  sendData
} from './utils'
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


//Инициализация карточек
const user = {}

api.getUserInfo().then(res => {
  for (let key in res) {
    user[key] = res[key]
  }
  userInfoName.textContent = res.name;
  userInfoJob.textContent = res.about;
  userAvatar.style.backgroundImage  = `url(${res.avatar})`;
}).then(() => {
  api.getInitialCards()
  .then(res => {
    res.forEach(item => {
      cardList.addCard(item.name, item.link, item.owner._id, item._id, user._id);
    });
  })
  .catch(err => console.log(err));
})


function changeEditInfo(res) {
  console.log(res)
  console.log(res.name)

  userInfoName.textContent  = res.name;
  userInfoJob.textContent   = res.about;
}
/* Слушатели */

buttonUserInfo.addEventListener('click', () => {
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