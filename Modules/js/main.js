import {loader} from './_loader.js';
import {setEventListeners, sortTable} from './_localStr.js';


export async function init() {
  const appEl = document.querySelector('#app')
  const loaderEl = loader()
  appEl.innerHTML = ''
  appEl.append(loaderEl)

  const homePage = await import('./_crtHomePage.js')
  appEl.appendChild(homePage.default(appEl))
  loaderEl.remove()

  setEventListeners('.table-name', 'click', sortTable)
}

init()


