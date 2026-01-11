// задача 2

function createTh(data) {
  const dist = (data.prodWeight * data.prodDist) / 10
  return `
          <tr class="prodItem-row">
            <td class="prodItem-td">${data.prodName}</td>
            <td class="prodItem-td">${data.prodWeight}</td>
            <td class="prodItem-td">${data.prodDist}</td>
            <td class="prodItem-td">${dist.toFixed(2)} руб.</td>
          </tr>
`
}

function getData(form) {
  const obj = {
    prodName: form.get('prodName'),
    prodWeight: form.get('prodWeight'),
    prodDist: form.get('prodDist')
  }
  return obj
}

const calcFormEl = document.querySelector('.calcForm')
calcFormEl.addEventListener('submit', (e) => {
  e.preventDefault()

  const formDt = new FormData(calcFormEl)
  const warn = document.querySelector('.warning')

  if(formDt.get('prodWeight') <= 0 || formDt.get('prodDist') <= 0) {
    warn.classList.remove('visually-hidden')
  } else {
    if(!warn.classList.contains('visually-hidden')) {
      warn.classList.add('visually-hidden')
    }

    const th = createTh(getData(formDt))
    const tBdy = document.querySelector('.product-table tbody')
    tBdy.insertAdjacentHTML('beforeend', th)

    calcFormEl.reset()
  }

})
