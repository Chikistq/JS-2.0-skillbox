let app = document.querySelector('.app')
let urlArrCat = ['./image/cat1.jpg', './image/cat2.jpg', './image/cat3.jpg']
let urlArrDog = ['./image/dog1.jpg', './image/dog2.jpg', './image/dog3.jpg']


function createImg(arr) {
  let div = document.createElement('div')
  arr.forEach(url => {
    let img = document.createElement('img')
    img.src = url
    div.append(img)
  })
  const lastChld = app.lastElementChild
  app.insertBefore(div, lastChld)
}


const barId = (time) => {
  let div = document.createElement('div')
  div.classList.add('prg-br')
  div.style.transitionDuration = `${time/1000}s`
  app.append(div)
  return div
}


/* код для первой задачи. Для третьей переписал его */
// const dogsId = () => {
//   const promise = new Promise((resolve) => {
//     resolve(urlArrDog)
//   })
//     .then(result => createImg(result))
// }

// const catsId = () => {
//   const promise = new Promise((resolve) => {
//     resolve(urlArrCat)
//   })
//     .then(result => createImg(result))
// }

const dogsId = () => {
  createImg(urlArrDog)
}

const catsId = () => {
  createImg(urlArrCat)
}

function delay() {
  return (Math.floor(Math.random() * (5 - 2 + 1)) + 2)*1000
}


// вариант 1

const progress = (time, progressBarId, tamerId) => {
  return new Promise(resolve => {

      const prBar = progressBarId(time)
      setTimeout(() => {
        prBar.style.transform = 'scaleX(1)'
      })

      setTimeout(() => {
        tamerId()
        resolve()
      }, time)
  })
}

// const progress = (time, progressBarId, tamerId) => {
//   return new Promise(resolve => {
//
//     setTimeout(() => {
//     const prBar = progressBarId(time)
//
//       requestAnimationFrame(() => {
//         prBar.style.transform = 'scaleX(1)'
//       })
//
//       setTimeout(() => {
//         tamerId()
//         resolve()
//       }, time)
//     }, 0)
//   })
// }



progress(delay(), barId, catsId)
  .then(()=> {
      return  progress(delay(), barId, dogsId)
  })

