export function $(el, className, text=''){
  let elem = document.createElement(el)
  elem.classList.add(className)
  elem.textContent = text
  return elem
}


// export function getFormData(form) {
//
// }
