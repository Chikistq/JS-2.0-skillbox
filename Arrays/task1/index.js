const books = ['Война и мир', 'Горе от ума', 'Ася', 'Шантарам', 'Противостояние']

const lists = document.querySelector('.bookshelf')

// решил попробовать решение, отличное от предложенного в видеоуроках.. с присвоением Id для каждого элемента через dataset
function addBook (arr) {
  for (const item in arr) {
    const li =  document.createElement('li')
    li.textContent = arr[item]
    li.dataset.id = item
    lists.append(li)
  }
}

addBook(books)

document.querySelector('.addBook').onclick = () => {
  const newBook = prompt('Введите название книги')
  if (!newBook) {
    alert('Название книги не введено!')
  } else {
/*  я понимаю, что стирание и отрисовка всего массива по новой не самая лучшая идея,
но что то быстро не придумал, как создавать новый элемент без дублирования кода, вроде createEl....li в текущей реализации..
Не стал теперь время */
    lists.innerHTML =''
    books.push(newBook)
    addBook(books)
  }
  return books
}

let lastFind = ''
document.querySelector('.sBook').onclick = () => {
  const newBook = prompt('Введите название книги')

  if (!newBook) {
    alert('Название книги не введено!')
  } else {
    let find = books.findIndex(item => item.toLowerCase() === newBook.toLowerCase())
    if (find === -1) {
      alert('Книга не найдена!')
    } else {
      // добавлен сброс выделения текста
      lastFind ? lastFind.style.color = 'inherit' : null
      document.querySelector(`[data-id="${find}"]`).style.color = 'red'
      lastFind = document.querySelector(`[data-id="${find}"]`)
      return lastFind
    }
  }
}
