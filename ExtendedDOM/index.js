const app = document.querySelector('.app')

function createEL(tagName, className) {
  const newEl = document.createElement(tagName)
  newEl.classList.add(className)
  return newEl
}

function createH1(info) {
  const h1 = createEL('h1', info[0])
  h1.textContent = info[1]
  return h1
}


// task 1
const task1 = {
  info: ['task1__Title', 'Задача 1'],
  cars: ['car1.webp','car2.webp','car3.webp'],
  activItemId: '',
  create() {
    const createLi = ((link) => {
      const listItem = createEL('li', 'carList__item')
      const img = createEL('img', 'prev')
      img.setAttribute('src', `./img/${link}`)
      listItem.append(img)
      return listItem
    })

    const task1 = createEL('div', 'task1')
    const carList = createEL('ul', 'carList')

    task1.append(carList)

    this.cars.map((car) => {
      carList.append(createLi(car))
    })

    task1.append(createH1(this.info))
    task1.appendChild(carList)

    const fullImg = createEL('img', 'fullImg')
    fullImg.setAttribute('src', `./img/${this.cars[0]}`)
    task1.appendChild(fullImg)
    return task1
  },

  listeners() {
    const liList = document.querySelectorAll('.carList__item')
    liList.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        this.activItemId = e.target.getAttribute('src')
        document.querySelector('.fullImg').setAttribute('src', this.activItemId)
      })
    })
  }

}

// task2

const task2 = {
  info: ['task2__Title', 'Задача 2'],
  liHtml: `<li class="listItem">Новый элемент списка</li>`,
  lastElem: null,
  create() {
    const task2 = createEL('div', 'task2')
    const list = createEL('ul', 'elemList')
    const btnAdd = createEL('button', 'btnAdd')
    const btnDelete = createEL('button', 'btnDelete')
    btnAdd.textContent = 'Добавить элемент'
    btnDelete.textContent = 'Удалить элемент'

    task2.append(createH1(this.info))
    task2.append(list)
    task2.append(btnAdd)
    task2.append(btnDelete)


    return task2
  },

  listeners() {
    const list = document.querySelector('.elemList')
    const btnAdd = document.querySelector('.btnAdd')
    btnAdd.onclick = (e) => {
      e.preventDefault()
      list.insertAdjacentHTML('beforeend', this.liHtml)
    }
    const btnDelete =  document.querySelector('.btnDelete')
    btnDelete.onclick = (e) => {
      e.preventDefault()
      list.lastChild.remove()
    }
  }
}

// task3

const task3 = {
  info: ['task3__Title', 'Задача 3'],
  prices: [100, 670, 110, 243, 550, 50, 1020, 300],

  create() {
    const task3 = createEL('div', 'task3')
    const list = createEL('ul', 'priceList')
    const btnUp = createEL('button', 'btnUp')
    const btnDown = createEL('button', 'btnDown')
    btnUp.textContent = 'Сортировать по возрастанию'
    btnDown.textContent = 'Сортировать по убыванию'

    this.prices.map((number) => {
      const price = document.createElement('li')
      price.textContent = number
      list.append(price)
    })

    task3.append(createH1(this.info))
    task3.append(list)
    task3.append(btnUp)
    task3.append(btnDown)


    return task3
  },

  listeners() {
    const list = document.querySelector('.priceList')

    function sortPrice(listEl, arr, method) {
      if (method === 'up') arr.sort((prev, next) => prev - next)
      if (method === 'down') arr.sort((prev, next) => next - prev)

      listEl.innerHTML = ''
      arr.map((number) => {
        const price = document.createElement('li')
        price.textContent = number
        listEl.append(price)
      })
      return listEl
    }

    const btnUp = document.querySelector('.btnUp')
    btnUp.onclick = (e) => {
      e.preventDefault()
      sortPrice(list, this.prices, 'up')
    }
    const btnDown =  document.querySelector('.btnDown')
    btnDown.onclick = (e) => {
      e.preventDefault()
      sortPrice(list, this.prices, 'down')
    }
  }
}


app.append(task1.create())
app.append(task2.create())
app.append(task3.create())


task1.listeners()
task2.listeners()
task3.listeners()
