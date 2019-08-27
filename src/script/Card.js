export class Card {

    constructor(title, url, idCard, user_id) {
      this.user_id = user_id
      this.idCard = idCard
      this.title = title
      this.url = url
      this.cardElement = this.create()
    }
    
    remove(event) {
      event.target.closest('.place-card').parentElement.removeChild(this.cardElement)
    }
  
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked')
    }
  
    create() {
  
      const cardContainer = document.createElement('div')
      const cardImageContainer = document.createElement('div')
      const cardButtonDelete = document.createElement('button')
      const cardDescriptionContainer = document.createElement('div')
      const cardTitleElement = document.createElement('h3')
      const cardButtonLike = document.createElement('button')
  
      cardContainer.classList.add('place-card')
      cardImageContainer.classList.add('place-card__image')
      cardImageContainer.style.backgroundImage = `url(${this.url})`
      cardButtonDelete.classList.add('place-card__delete-icon')
      cardDescriptionContainer.classList.add('place-card__description')
      cardTitleElement.classList.add('place-card__name')
      cardTitleElement.textContent = this.title
      cardButtonLike.classList.add('place-card__like-icon')
  
      console.log(this.idCard === this.user_id)
      if(this.idCard === this.user_id){
        cardButtonDelete.classList.add('place-card__delete-icon_display-block')
      }
  
      cardImageContainer.appendChild(cardButtonDelete)
      cardDescriptionContainer.appendChild(cardTitleElement)
      cardDescriptionContainer.appendChild(cardButtonLike)
      cardContainer.appendChild(cardImageContainer)
      cardContainer.appendChild(cardDescriptionContainer)
  
  
      cardButtonLike.addEventListener('click', this.like)
      cardButtonDelete.addEventListener('click', (event) => {this.remove(event)})
      return cardContainer
    }
  
}