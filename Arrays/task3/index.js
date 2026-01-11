const basket = ['яблоко', 'сок', 'огурец', 'капуста', 'вода', 'арбуз', 'молоко']

const lists = document.querySelector('.list')

function addList (arr) {
  arr.sort((prev, next) => prev > next ? 1 : -1)
  for (const item of arr) {
    const li =  document.createElement('li')
    li.textContent = item
    lists.append(li)
  }
}
addList(basket)


document.querySelector('.add').onclick = () => {
  const newProd = prompt('Добавить товар')
  if (!newProd && newProd !== null) {
    alert('Название товара не введено!')
  } else {
    lists.innerHTML =''
    basket.push(newProd)
    addList(basket)
  }
  return basket
}

