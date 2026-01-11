import createTable from './_crtTable.js';

function setEventListeners(elements, event, fn) {
  document.querySelectorAll(elements).forEach(item => {
    item.addEventListener(event, fn)
  })
}


function sortTable(e) {
  e.preventDefault()
  const listItem = JSON.parse(localStorage.getItem('products-list')) || []
  const table = document.querySelector('.products-list__table')
  const tableParent = document.querySelector('.products-list__table').parentNode

  let collName = e.currentTarget.dataset.type
  let sortRevers = e.currentTarget.dataset.sort

  table.remove()
  switch (collName) {
    case 'name':
    case 'shelf':
      if(sortRevers === '0' ) {
        listItem.sort((prev, next) => prev[collName].localeCompare(next[collName]))
        sortRevers = '1'
      } else {
        listItem.sort((prev, next) => next[collName].localeCompare(prev[collName]))
        sortRevers = '0'
      }
      localStorage.setItem('products-list', JSON.stringify(listItem))
      tableParent.append(createTable())
      document.querySelector(`[data-type="${collName}"]`).dataset.sort = sortRevers
      break
    case 'weight':

      if(sortRevers === '0' ) {
        listItem.sort((prev, next) => prev[collName] - next[collName])
        sortRevers = '1'
      } else {
        listItem.sort((prev, next) => next[collName] - prev[collName])
        sortRevers = '0'
      }
      localStorage.setItem('products-list', JSON.stringify(listItem))
      tableParent.append(createTable())
      document.querySelector(`[data-type="${collName}"]`).dataset.sort = sortRevers
      break
    case 'date':
      if(sortRevers === '0' ) {
        listItem.sort((prev, next) => {
          let a = new Date(prev[collName])
          let b = new Date(next[collName])
          return a - b
        })
        sortRevers = '1'
      } else {
        listItem.sort((prev, next) => {
          let a = new Date(prev[collName])
          let b = new Date(next[collName])
          return b - a
        })
        sortRevers = '0'
      }
      localStorage.setItem('products-list', JSON.stringify(listItem))
      tableParent.append(createTable())
      document.querySelector(`[data-type="${collName}"]`).dataset.sort = sortRevers
      break
    default:
      tableParent.append(createTable())
      break
  }
  setEventListeners('.table-row-delete', 'click', deleteRow)
  setEventListeners('.table-name', 'click', sortTable)

}

function addListItem(dataObj) {
  const item = JSON.parse(localStorage.getItem('products-list')) || []
  item.push(dataObj)
  localStorage.setItem('products-list', JSON.stringify(item))
}

function deleteRow(e) {
  const currendId = Number(e.currentTarget.dataset.id)
  const currendRow = e.currentTarget.parentNode.parentNode

  const listItem = JSON.parse(localStorage.getItem('products-list')) || []
  let filterArr = []
  listItem.filter(item => {
    if(item.id !== currendId ) filterArr.push(item)
  })
  localStorage.setItem('products-list', JSON.stringify(filterArr))

  currendRow.remove()
}

export {
  addListItem,
  sortTable,
  deleteRow,
  setEventListeners
}
