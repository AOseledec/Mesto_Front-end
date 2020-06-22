export class Card {

    constructor(title, url, owner_id, card_id, user_id) {
      this.owner_id = owner_id
      this.user_id = user_id
      this.card_id = card_id
      this.title = title
      this.url = url
      
      this.cardElement = this.create()

      this.onLike = this.like.bind(this)
      this.onDelete = this.removeCard.bind(this)

      this.deleteButton = this.cardElement.querySelector('.place-card__delete-icon')
      this.likeButton = this.cardElement.querySelector('.place-card__like-icon')

      this.likeButton.addEventListener('click', this.onLike)
      if(!!this.deleteButton) {
        this.deleteButton.addEventListener('click', this.onDelete)
      }
    }
  
    create() {
  
      const cardContainer = document.createElement('div')
      const cardImageContainer = document.createElement('div')
      const cardDescriptionContainer = document.createElement('div')
      const cardTitleElement = document.createElement('h3')
      const cardButtonLike = document.createElement('button')
      
      cardContainer.classList.add('place-card')
      cardImageContainer.classList.add('place-card__image')
      cardImageContainer.style.backgroundImage = `url(${this.url})`
      cardDescriptionContainer.classList.add('place-card__description')
      cardTitleElement.classList.add('place-card__name')
      cardTitleElement.textContent = this.title
      cardButtonLike.classList.add('place-card__like-icon')
      


      if(this.owner_id == this.user_id){
        const cardButtonDelete = document.createElement('button')
        cardButtonDelete.classList.add('place-card__delete-icon')
        cardButtonDelete.classList.add('place-card__delete-icon_display-block')

        cardImageContainer.appendChild(cardButtonDelete)
      }
      cardDescriptionContainer.appendChild(cardTitleElement)
      cardDescriptionContainer.appendChild(cardButtonLike)
      cardContainer.appendChild(cardImageContainer)
      cardContainer.appendChild(cardDescriptionContainer)

      return cardContainer
    }

    removeCard() {
      this.deleteButton.removeEventListener('click', this.onDelete)
      this.likeButton.removeEventListener('click', this.onLike)
      this.cardElement.remove()
    }
  
    like() {
      this.likeButton.classList.toggle('place-card__like-icon_liked')
    }
  
}