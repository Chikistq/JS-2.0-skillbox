
// Задача 1
function resultsHtml (obj) {
  return `
  <h1 class="results__title">Результаты опроса</h1>
  <p class="results__user">Имя пользователя: <span>${obj.userName}</span></p>
  <p class="results__email">E-mail: <span>${obj.userEmail}</span></p>
  <p class="results__gender">Пол: <span>${obj.userGender}</span></p>
  <p class="results__rating">Оценка: <span>${obj.userRange}</span></p>
  <p class="results__interest">Интересы пользователя: <span>${obj.userInterest}</span></p>
  <p class="results__comment">Доп. комментарии: <span>${obj.userComments}</span></p>
  `
}

const resultsEl = document.querySelector('.results')

// собрали данные из формы
// по полям не стал заморачиваться с валидацией из JS. установил required в html.
// привык валидацию формы натягивать через сторонние библиотеки. Например -
function getInput(form) {

  const formEl = new FormData(form)
  const obj = {
    userName: formEl.get('userName'),
    userEmail: formEl.get('userEmail'),
    userGender: 'Не указан',
    userRange: formEl.get('userRange'),
    userInterest: [] || '',
    userComments: formEl.get('userComments') || ''
  }

  document.querySelectorAll('.ch-btn').forEach( (item) => {
    if(item.checked) {
      obj.userInterest.length > 0
        ? obj.userInterest.push(` ${item.value}`)
        : obj.userInterest.push(item.value)
    }
  })

  document.querySelectorAll('.radio-btn').forEach( (item) => {
    if(item.checked) {
      obj.userGender = item.value
    }
  })
  return obj
}


const formEl = document.querySelector('#form')

formEl.addEventListener('submit', (e) => {
  e.preventDefault()
  resultsEl.innerHTML = ''
  resultsEl.insertAdjacentHTML('beforeend', resultsHtml(getInput(formEl)))
})



