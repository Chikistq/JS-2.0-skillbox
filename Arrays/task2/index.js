const studentsGrowth = [188, 171, 165, 180, 175, 166, 177, 192]



/* оставил с первой задачи */
const lists = document.querySelector('.list')

function addList (arr) {
  for (const item of arr) {
    const li =  document.createElement('li')
    li.textContent = item
    lists.append(li)
  }
}

addList(studentsGrowth)

document.querySelector('.add').onclick = () => {
  // Добавил унарный +. Действительно promt пишет строкой
  const newGrowth = +prompt('Введите рост')
  if (!newGrowth) {
    alert('Рост не введён!')
  } else {
    lists.innerHTML =''
    studentsGrowth.push(newGrowth)
    addList(studentsGrowth)
  }
  return studentsGrowth
}
/* оставил с первой задачи */

document.querySelector('.filter').onclick = () => {
  const min = +prompt('Введите минимальный рост')
  let filter = studentsGrowth.filter(item => item >= min)
  lists.innerHTML =''
  addList(filter)
}
