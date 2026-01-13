const giftArr = [
  {
    title: "Скидка 20% на первую покупку в нашем магазине!",
    icon: "https://uidevelop.ru/s/gift.png"
  },
  {
    title: "Скидка 10% на всё!",
    icon: "https://uidevelop.ru/s/gift.png"
  },
  {
    title: "Подарок при первой покупке в нашем магазине!",
    icon: "https://uidevelop.ru/s/gift.png"
  },
  {
    title: "Бесплатная доставка для вас!",
    icon: "https://uidevelop.ru/s/gift.png"
  },
  {
    title: "Сегодня день больших скидок!",
    icon: "https://uidevelop.ru/s/gift.png"
  }
]

const promocodeObj = {
  promocode: 'PROM50',
  gift: 'Скидка 50%'
}




const popup = function () {

  // возвращает из массива рандомную скидку
  function getGift (arr) {
    let min = 1;
    let max = arr.length

    let random = Math.floor(Math.random()* (max-min +1)+min)
    return arr[random-1]

  }

  // создание модального окна, взависимости от кнопки (popup или promo)
  const createPopup = function(type, obj='') {
    const popupEl = document.createElement('div')
    popupEl.classList.add('popup')
    document.body.appendChild(popupEl)

    /* выбор верстки */
    let popupHtml = ''
    if(type === 'promo') {
      popupHtml = `
      <div class="p-container promo">
        <form class="promoForm" action="#"  method="post">
        <label class="popup__label" for="popup__input">
          <input class="popup__input" id="popup__input" type="text" value="" name="popup__input" placeholder="ПРОМОКОД">
          <a href="#" class="popup__btn closeBtn">Применить</a>
        </label>
        </form>
        <span class="popup__promo">Промокод применен! Скидка 50%</span>
       <svg class="close" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>Close SVG Icon</title><path fill="red" d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"/></svg>
       </div>


  `
    }
    if(type === 'popup') {
      popupHtml = `
    <div class="p-container">
      <img class="popup__img" src="${obj.icon}" alt="Подарок">
      <div class="popup__contant">
          <h3 class="popup__title">${obj.title}</h3>
      <a href="#" class="popup__btn closeBtn">Отлично!</a>
      </div>
  `
    }
    /* выбор верстки конец */

    popupEl.insertAdjacentHTML('beforeend', popupHtml)
    return popupEl
  }

//   проверяем куки, если есть промокод. возвращаем его значение
  const cheakCookies = function() {

    // собрали куки в объект
    const getCookies = () => {
      return document.cookie.split('; ').reduce((acc, item) => {
        const [key, value] = item.split('=')
        acc[decodeURIComponent(key)]=decodeURIComponent(value)
        return acc
      }, {})
    }

    // проверили по нашему "ключу" есть ли промокод. Если да - вернули его значения
    let cookArr = getCookies()
    if(cookArr['promo']) {
      return cookArr['promo']
    }
  }


  return {
    /* возвращает 2 метода:
    * 1.вызов модалки со скидками
    * 2.вызов модалки с промокодом
    *  */
    initPopup() {
      // рандомную скидку получили
      const randomGift = getGift(giftArr)

      // проверка на клик создано ли модальное окно, чтобы не плодить их количество, пока идут 3 секунды.
      const test = document.querySelector('.popup')

      if (!test) {
        // создали Модалку. Функция возвращает сам EL, чтобы потом его по новой не искать в Доме.
        const active = createPopup('popup', randomGift)

        setTimeout(() => {
          active.classList.add('active')
          const closeBtn = document.querySelector('.closeBtn')
          closeBtn.addEventListener('click', (e)=> {
            e.preventDefault()
            active.remove()   // удаляем собственно по нажатию
          })
        }, 3000)
      }

    },

    initPromo() {

      const active = createPopup('promo')  // создали
      active.classList.add('active')            // показали пользователю

      /* если куки есть = вставили в инпут, проявили надпись. */
      const inputEl = document.querySelector('.popup__input')
      const lastPromo = cheakCookies()
      if(lastPromo) {
        inputEl.value = lastPromo
        document.querySelector('.popup__promo').style.display = 'block'
      }
      /* если куки есть = вставили в инпут, проявили надпись. */


      const closeBtn = document.querySelector('.closeBtn')
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault()

      if (promocodeObj.promocode === inputEl.value) {
          document.querySelector('.popup__promo').style.display = 'block'
          document.cookie = `${decodeURIComponent('promo')}=${decodeURIComponent(inputEl.value)}`
        } else {
          document.querySelector('.popup__promo').style.display = 'none'
        inputEl.value = ''
        }
      })

      // добавил закрытие и удаление модалки
      document.querySelector('.close').addEventListener('click', (e) => {
        e.preventDefault()
        active.remove()
      })
    }
  }

}


/* Собственно сами кнопки */
document.querySelector('#init-popup').addEventListener('click', (e) => {
  e.preventDefault()
  popup().initPopup()
})

document.querySelector('#init-promo').addEventListener('click', (e) => {
  e.preventDefault()
  popup().initPromo()
})

