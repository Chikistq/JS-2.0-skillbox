import Delivery from './_Delivery.js';
import {$} from './utilits.js';

// delivery — доставляется;
// delivered — доставлен;
// canceled — отменён.


export default class EditDelivery extends Delivery{
  constructor(name, address, distance, status='') {
    super(name, address, distance,);
    this._delivered = status
  }

  createChangeBtn() {
    this.changeBtnEl = $('button', 'card__change', 'Изменить')

    this.changeBtnEl.addEventListener('click', () => {
      console.log(this)
      this.createChangeForm()
      this.form.classList.add('active')
    })
    return this.changeBtnEl
  }

  createCard(){
    super.createCard()
    this._delivered === 'delivered' ? this.$el.classList.add('delivered') : this.$el.classList.remove('delivered')
    this._delivered === 'canceled' ? this.$el.classList.add('canceled') : this.$el.classList.remove('canceled')


    this.$el.prepend(this.createChangeBtn())
    return this.$el
  }


  createChangeForm() {
    this.popup = $('div', 'popup')
    this.form = $('form', 'update')

    let formBody = `
      <p class="update__title">Изменить</p>
      <input type="text" class="update__name" name="name" value="${this.name}" placeholder="Имя" requared>
      <input type="text" class="update__address" name="address" value="${this.address}" placeholder="Адрес" requared>
      <input type="number" class="update__distance" name="distance"  value="${this.distance}" placeholder="Расстояние" requared>
      <select class="update__status" name="status" id="status">
        <option value="delivery" ${this._delivered === 'delivery' ? 'selected': ''}>Доставляется</option>
        <option value="delivered" ${this._delivered === 'delivered' ? 'selected': ''}>Доставлен</option>
        <option value="canceled" ${this._delivered === 'canceled' ? 'selected': ''}>Отменен</option>
      </select>
    </svg>
    </button>
    `

    this.btnUpdate = $('button', 'update__btn', 'Сохранить')
    this.btnUpdate.type = 'submit'
    this.btnClose = $('button', 'update__close')
    this.btnClose.type = 'button'
    this.btnClose.insertAdjacentHTML('beforeend', `<svg fill="currentColor" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>`)

    this.btnClose.addEventListener('click', (e) => {
      e.preventDefault()
      this.popup.remove()
    })

    this.form.insertAdjacentHTML('beforeend', formBody)
    this.form.append(this.btnUpdate, this.btnClose)

    this.popup.append(this.form)

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.update(e.target)
      this.popup.remove()

      this._delivered === 'delivered' ? this.$el.classList.add('delivered') : this.$el.classList.remove('delivered')
      this._delivered === 'canceled' ? this.$el.classList.add('canceled') : this.$el.classList.remove('canceled')

    })
    document.body.append(this.popup)
  }

  update(form) {
    const formData = new FormData(form)
    this.name = formData.get('name')
    this.cardNameEl.textContent = this.name
    this.address = formData.get('address')
    this.cardAddressEl.textContent = this.address
    this.distance = +formData.get('distance')
    this.cardDistanceEl.textContent = `${this.distance} км`
    this._delivered = formData.get('status')
  }

  static getTotalDistance(array) {
    let total = 0

    array.forEach(item => {

      if (item._delivered !=='canceled') {
        console.log('Item:', item.distance)

        total += item.distance
        console.log('Total:', total)
      }
    })
    return total
  }

  init() {
    return super.init()
  }


}
