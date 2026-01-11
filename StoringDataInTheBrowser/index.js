const validate = new JustValidate('.validate', {
  errorFieldCssClass: 'is-invalid',
  errorLabelStyle: {
    color: 'red',
    top: '-19px',
    position: 'relative',
    fontSize: '12px',
    left: '10px'
  },
})

validate
  .addField('#title', [
    {
      rule: 'required',
      errorMessage: 'Введите название фильма',
    },
    {
      rule: 'minLength',
      value: 3,
    },
  ])
  .addField('#genre', [
    {
      rule: 'required',
      errorMessage: 'Введите название жанра',
    },
  ])
  .addField('#releaseYear', [
    {
      rule: 'required',
      errorMessage: 'Введите год фильма',
    },
    {
      rule: 'number',
    },
  ])
  .onSuccess(handleFormSubmit)

function handleFormSubmit(e) {
  e.preventDefault()
  const formReset = document.querySelector('#film-form')

  const itemId = +new Date()
  const formEl = new FormData(formReset)
  const film = {
    id: itemId,
    title: formEl.get('title'),
    genre: formEl.get('genre'),
    releaseYear: formEl.get('releaseYear'),
    isWatched: formEl.get('isWatched'),
  }

  addFilmToLS(film)
  // if ( validate.onsuccess === true) console.log('f')

  formReset.reset()
}

function addFilmToLS(dataObj) {
  const film = JSON.parse(localStorage.getItem('films')) || []
  film.push(dataObj)
  localStorage.setItem('films', JSON.stringify(film))

  renderTable()
}

function renderTable() {
  const film = JSON.parse(localStorage.getItem('films')) || []
  const tableRow = document.querySelector('#film-tbody')
  tableRow.innerHTML = ''

  film.forEach( item => {
    const row = document.createElement('tr')
    row.setAttribute('data-id', item.id)
    row.insertAdjacentHTML('beforeend', `
        <td >${item.title}</td>
        <td >${item.genre}</td>
        <td >${item.releaseYear}</td>
        <td >${item.isWatched ? 'Да' : 'Нет'}</td>
        <td>
            <button class="changeBtn">Редактировать</button>
            <button class="deleteBtn">Удалить</button>
         </td>
    `)
    tableRow.appendChild(row)

  })
  // первоначально вешаем слушателb на кнопки "Редактировать и Удалить"
  setListeners('.changeBtn', 'click', changeFilm)
  setListeners('.deleteBtn', 'click', deleteRow)
}

function sotrTable(e) {
  e.preventDefault()
  const film = JSON.parse(localStorage.getItem('films')) || []
  const tableRow = document.querySelector('#film-tbody')
  tableRow.innerHTML = ''

  const sortType = document.querySelector('.sortType').value
  sortType === 'releaseYear'
    ? film.sort((prev, next) => prev[sortType] - next[sortType])
    : film.sort((prev, next) => prev[sortType].localeCompare(next[sortType]))
  localStorage.setItem('films', JSON.stringify(film))
  renderTable()
}

function deleteRow(e) {
  e.preventDefault()
  const currendId = Number(e.currentTarget.parentNode.parentNode.dataset.id)
  const currendRow = e.currentTarget.parentNode.parentNode

  const film = JSON.parse(localStorage.getItem('films')) || []
  let filterArr = []
  film.filter(item => {
    if(item.id !== currendId ) filterArr.push(item)
  })
  localStorage.setItem('films', JSON.stringify(filterArr))

  currendRow.remove()
}

function changeFilm(e) {
  e.preventDefault()
  const currendRowId = Number(e.currentTarget.parentNode.parentNode.dataset.id)
  const currendRow = e.currentTarget.parentNode.parentNode
  const filmsArr = JSON.parse(localStorage.getItem('films')) || []
  const film = filmsArr.find( (item) => item.id === currendRowId)

  const createChangeForm = (rowData) => {
    const form = document.createElement('div')
    form.classList.add('popup')
    form.classList.add('validate')
    form.insertAdjacentHTML('beforeend',
      `
     <div class="p-container">
        <form id="film-form" class="popup-form">
          <label  class="just-validate-error-field"  for="title">Название: 
            <input type="text" id="title" name="title" value="${rowData.title}"/>
          </label>
          <label  class="just-validate-error-field"  for="genre">Жанр:
            <input type="text" id="genre" name="genre"  value="${rowData.genre}"/>
          </label>
          <label  class="just-validate-error-field"  for="releaseYear">Год:
            <input type="text" id="releaseYear" name="releaseYear"  value="${rowData.releaseYear}"/>
          </label>
          <label for="isWatched">Успели посмотреть?</label>
            <input  class="checkbox" type="checkbox" id="isWatched" name="isWatched" ${rowData.isWatched === 'Да' ? 'checked' : ''}/>
          <div class="buttons">
              <button id="updateBtn" type="submit">Обновить</button>
              <button id="cancelBtn">Отменить редактирование</button>
          </div>
        </form>
      </div>
    `)
    document.body.appendChild(form)
    return form
  }


  const activePopup = createChangeForm(film)



  function deleteChangeForm(e) {
    e.preventDefault()
    activePopup.remove()
  }

  function updateRow(e) {
    e.preventDefault()
//   найти индекс ел в массиве. Т.е. по порядку.
//   перезаписать его новым значением и обновить сроку в Доме и локалсторедж
    const currentRowIndex = filmsArr.indexOf(film)
    const updateFilmData = new FormData(document.querySelector('.popup-form'))

    //   сохранить элемент до изменения в новый массив в SessionStorage. чтобы потом можно было откатить изменения.
    const changedFilms = JSON.parse(sessionStorage.getItem('changedFilms')) || []
    changedFilms.push(film)
    sessionStorage.setItem('changedFilms', JSON.stringify(changedFilms))
//     активируем кнопку возврата
    document.querySelector('#cancelBtn').disabled = false

//    обновили элемент в массиве, записали в LocalStorage
    filmsArr[currentRowIndex].title = updateFilmData.get('title')
    filmsArr[currentRowIndex].genre = updateFilmData.get('genre')
    filmsArr[currentRowIndex].releaseYear = updateFilmData.get('releaseYear')
    filmsArr[currentRowIndex].isWatched = updateFilmData.get('isWatched') ? 'Да' : 'Нет'
    localStorage.setItem('films', JSON.stringify(filmsArr))

//    отразили обновленные данные в Dom в нужной строке
    Array.from(currendRow.children).map( (item, index) => {
      if (index === 0) item.textContent = updateFilmData.get('title')
      if (index === 1) item.textContent = updateFilmData.get('genre')
      if (index === 2) item.textContent = updateFilmData.get('releaseYear')
      if (index === 3) item.textContent = updateFilmData.get('isWatched') ? 'Да' : 'Нет'
    })
    activePopup.remove()
  }

  // setListeners(activePopup, 'submit', updateRow)    // закоментил и вставил ее в JustValidate. Сработала валидация.
  const validate = new JustValidate('.popup-form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      color: 'red',
      top: '-10px',
      position: 'relative',
      fontSize: '12px',
      left: '10px'
    },
  })

  validate
    .addField('#title', [
      {
        rule: 'required',
        errorMessage: 'Введите название фильма',
      },
      {
        rule: 'minLength',
        value: 3,
      },
    ])
    .addField('#genre', [
      {
        rule: 'required',
        errorMessage: 'Введите название жанра',
      },
    ])
    .addField('#releaseYear', [
      {
        rule: 'required',
        errorMessage: 'Введите год фильма',
      },
      {
        rule: 'number',
      },
    ])
    .onSuccess(updateRow)

  setListeners('#cancelBtn', 'click', deleteChangeForm)

}

function cancelChange(e) {
//   отмену изменений положил в SessionStorage, чтобы сбрасывать сессию
  e.preventDefault()
  let lastChangedFilms = JSON.parse(sessionStorage.getItem('changedFilms')) || []
  const lastItem = lastChangedFilms.length - 1

  const lastChangedRowId = lastChangedFilms[lastItem].id
  const lastChangedRow = document.querySelector(`[data-id="${lastChangedRowId}"]`)
  Array.from(lastChangedRow.children).map( (item, index) => {
    if (index === 0) item.textContent = lastChangedFilms[lastItem].title
    if (index === 1) item.textContent = lastChangedFilms[lastItem].genre
    if (index === 2) item.textContent = lastChangedFilms[lastItem].releaseYear
    if (index === 3) item.textContent = lastChangedFilms[lastItem].isWatched ? 'Да' : 'Нет'
  })

  if(lastChangedFilms.length > 1) {
    lastChangedFilms.splice(lastItem, 1)
  } else {
    lastChangedFilms = []
  }
  sessionStorage.setItem('changedFilms', JSON.stringify(lastChangedFilms))

//     выключаем кнопку возврата если история изменений опустела
  if(lastChangedFilms.length === 0) {
    document.querySelector('#cancelBtn').disabled = true
  }
}

function setListeners(selector, listener, callback) {
  // если Selector уже является Dom node'ой, то сразу слушатель. Иначе ищем его.
  if(selector instanceof Object) {
    selector.addEventListener(listener, callback)
  } else {
    let elsArray = document.querySelectorAll(selector)
    elsArray.forEach((elem) => {
      elem.addEventListener(listener, callback)
    })
  }
}

renderTable()
setListeners('#sortBtn', 'click', sotrTable)
setListeners('#cancelBtn', 'click', cancelChange)
// setListeners('#film-form', 'submit', handleFormSubmit)


