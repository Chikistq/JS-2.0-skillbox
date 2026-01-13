import {$} from './utilits.js';


export default class Delivery {

  constructor(name, address, distance) {
    this.name = name
    this.address = address
    this.distance = distance
  }

  $el = ''

  createCard() {

    const cardEl = $('div', 'card')

    const titleName = $('span', 'card__descr', 'Имя')
    const titleAddress = $('span', 'card__descr', 'Адрес')
    const titleDistance = $('span', 'card__descr', 'Расстояние')



    this.cardNameEl = $('p', 'card__buyer-name', this.name)
    this.cardAddressEl = $('p', 'card__buyer-address', this.address)
    this.cardDistanceEl = $('p', 'card__buyer-distance', `${this.distance} км`)

    cardEl.append(titleName, this.cardNameEl, titleAddress, this.cardAddressEl, titleDistance, this.cardDistanceEl)

    this.$el = cardEl
  }


  init() {

    let wrapper = document.querySelector('.card__wrap')
    this.createCard()

    if(wrapper) {
      wrapper.append(this.$el)
    } else {
      wrapper = $('div', 'card__wrap')
      wrapper.append(this.$el)
    }


    return wrapper
  }

}
