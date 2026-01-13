import Delivery from './_Delivery.js';
import EditDelivery from './_EditDelivery.js';
import {$} from './utilits.js';


const app = document.querySelector('.app')

const deliveryArr = [
  new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
  new Delivery("Дмитрий", "ул. Задачная, д. 7", 3),
  new EditDelivery("Игнат", "ул. Московская, д. 13", 2, 'delivered'),
  new EditDelivery("Женя", "ул. Ломоносова, д. 1", 10),
  new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, 'canceled')
];



deliveryArr.forEach( item => {
  app.append(item.init())
})


const totalWrap = $('div', 'totalWrap')
const totalBtn = $('button', 'totalBtn', 'Общее расстояние')
totalBtn.type = 'button'
totalWrap.append(totalBtn)
const totalDescr = $('p', 'totalDescr')

app.append(totalWrap)
totalBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const total = EditDelivery.getTotalDistance(deliveryArr)
  totalDescr.textContent = `Общее расстояние: ${total} км`
  totalWrap.append(totalDescr)
})

