import {addListItem} from './_localStr.js';
import {init} from './main.js';

export default function createAddForm() {
  const form = `
    <h1 class="products-form__title">Добавить запись</h1>
    <label for="name">
      <input class="products-form__text" id='name' name="name" type="text"  placeholder="Название" required>
    </label>
    <label for="shelf">
      <input class="products-form__text" id='shelf' name="shelf" type="text"  placeholder="Полка" required>
    </label>
    <label for="weight">
      <input class="products-form__text" id='weight' name="weight" type="text"  placeholder="Вес" required>
    </label>
    <label for="date">
      <input class="products-form__text" id='date' name="date" type="date" required>
    </label>
    <button class="products-form__btn btn" type="submit">Добавить запись</button>
`

  const formEl = document.createElement('form')
  formEl.classList.add('products-form')

  formEl.insertAdjacentHTML('beforeend', form)

  formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(formEl)

    const listItem = {
      id: +new Date(),
      name: formData.get('name'),
      shelf: formData.get('shelf'),
      weight: formData.get('weight'),
      date: formData.get('date'),
    }

    addListItem(listItem)
    init()
  })


  return formEl
}
