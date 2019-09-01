export class Popup {
    constructor(popup, buttonOpenPopup) {
      
      this.popup              = popup
      this.contentPopup       = this.popup.querySelector('.popup__content')
      this.buttonClose        = this.popup.querySelector('.popup__close')
      this.img                = document.createElement('img')
  
      if(!!buttonOpenPopup){
        this.buttonOpenPopup  = buttonOpenPopup
        this.buttonOpenPopup.addEventListener('click', () => {this.open()})
      }    
  
      if(!this.contentPopup.classList.contains('.popup__img')){
        this.form = this.contentPopup.querySelector('.popup__form')
      }
  
      this.buttonClose.addEventListener('click', () => {this.close()})
    }
    
    open() {
      this.popup.classList.add('popup_is-opened')
    }
  
    openImage(url, popup){
      this.img.src = url
      this.img.classList.add('popup__img')
      this.contentPopup.appendChild(this.img)
      popup.open()
    }
  
    close() {
      if(this.contentPopup.classList.contains('popup__img')){
        this.contentPopup.removeChild(this.img)
      } else {
        this.form.reset()
      }
      this.popup.classList.remove('popup_is-opened')
    }
  
}