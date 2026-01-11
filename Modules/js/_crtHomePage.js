import {loader} from './_loader.js';
import createTable from './_crtTable.js';
import {deleteRow, setEventListeners, sortTable} from './_localStr.js';

export default function createHomePage(container) {
  const loaderEl = loader()

  const introEl = document.createElement('div')
  introEl.classList.add('products-list')
  const wrapper = document.createElement('div')
  wrapper.classList.add('products-list__wrapper')

  const elTitle = document.createElement('h1')
  elTitle.classList.add('products-list__title')
  elTitle.textContent = 'Склад'

  const btnEl = document.createElement('button')
  btnEl.classList.add('products-list__btn', 'btn')
  btnEl.textContent = 'Добавить запись'

  wrapper.append(elTitle, btnEl)
  introEl.appendChild(wrapper)

  btnEl.addEventListener('click', async (e) => {
    e.preventDefault()
    introEl.remove()

    container.innerHTML = ''
    container.append(loaderEl)

    const createAddForm = await import('./_crtNewEntry.js')
    container.appendChild(createAddForm.default())
    loaderEl.remove()
  })



  introEl.appendChild(createTable())
  return introEl
}
