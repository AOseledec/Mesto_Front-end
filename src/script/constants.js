import {CardList} from './Cardlist.js'
import {Popup} from './Popup.js'

/* Переменные */

const cardList = new CardList( document.querySelector('.places-list'), /*[],*/ document.getElementById('img'));

const buttonUserInfo      = document.getElementById('editInfoButton');
const buttonAddNewCard    = document.getElementById('addNewCard');

const popupAddNewCard     = new Popup(document.getElementById('card'), buttonAddNewCard);
const popupEditInfo       = new Popup(document.getElementById('edit'), buttonUserInfo);
const popupAvatar         = new Popup(document.getElementById('avatar'), userAvatar);

const formAddNewCard      = popupAddNewCard.form;
const formEditInfo        = popupEditInfo.form;
const formAvatar          = popupAvatar.form;

const userInfoName        = document.querySelector('.user-info__name');
const userInfoJob         = document.querySelector('.user-info__job');
const userAvatar          = document.querySelector('.user-info__photo');

export {
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
}