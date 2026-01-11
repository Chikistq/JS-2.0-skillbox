// задача 3

const cardNameInp = document.querySelector('.cardName')
const cardNameEl = document.querySelector('.card')
const cardSelect = document.querySelector('.cardColor')

cardNameInp.addEventListener('input', (e)=> {
  cardNameEl.textContent = e.currentTarget.value
})

cardSelect.addEventListener('change', (e)=> {
  document.querySelector('.userCard').style.backgroundColor = cardSelect.value
})

cardNameInp.addEventListener('focus', (e)=> {
  cardNameInp.classList.add('active')
})

cardNameInp.addEventListener('blur', (e)=> {
  cardNameInp.classList.remove('active')
})
