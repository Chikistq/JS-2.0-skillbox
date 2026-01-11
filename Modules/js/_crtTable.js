import {deleteRow, setEventListeners, sortTable} from './_localStr.js';

const tableHead = `
              <thead>
                 <tr>
                    <th class="table-name" data-sort="0" data-type="name">Название</th>
                    <th class="table-name" data-sort="0" data-type="shelf">Полка</th>
                    <th class="table-name" data-sort="0" data-type="weight">Вес</th>
                    <th class="table-name" data-sort="0" data-type="date">Время хранения</th>
                    <th class="table-name" data-sort="0"></th>
                 </tr>
              </thead>
`

const tableBody = document.createElement('tbody')

const tableRow = (data) => {
  const btn = document.createElement('button')
  btn.classList.add('table-row-delete', 'btn')
  btn.setAttribute('data-id', data.id)
  btn.textContent = 'Удалить'
  btn.addEventListener('click', deleteRow)

  const lastColl = document.createElement('td')
  lastColl.classList.add('table-col', 'col-last')
  lastColl.append(btn)

  const tdItems = `
        <td class="table-col">${data.name}</td>
        <td class="table-col">${data.shelf}</td>
        <td class="table-col">${data.weight}</td>
        <td class="table-col">${data.date}</td>
  `
  const row = document.createElement('tr')
  row.insertAdjacentHTML('beforeend', tdItems)
  row.appendChild(lastColl)

  return row
}

export default function createTable() {
  const tableEl = document.createElement('table')
  tableEl.classList.add('products-list__table')
  tableEl.insertAdjacentHTML('beforeend', tableHead)


  const itemList = JSON.parse(localStorage.getItem('products-list')) || []
  if (itemList.length < 1) {
    tableBody.insertAdjacentHTML('beforeend', `
      <tr><td>Список пуст</td><td></td><td></td><td></td><td></td></tr>
    `)
  } else {

    tableBody.innerHTML = ''
    itemList.forEach(item => {
      tableBody.append(tableRow(item))
    })
  }
  tableEl.appendChild(tableBody)


  setEventListeners('.table-name', 'click', (e)=> {
    console.log('dddd')
    sortTable(e)
  })
  return tableEl
}
