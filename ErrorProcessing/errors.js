// задача 1
function hello() {
  console.log('Skill');
}
try {
  helo();
} catch(err) {
  console.error(err);
}
console.log('complete');


// задача 2
function greeting() {
  const username = prompt("Введите имя пользователя");
  if(!username) {
    throw new Error('Имя обязательно для заполнения')
  }
}
try {
  greeting();
} catch(error) {
  alert(error.message);
}



// задача 3
function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError';
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError';
  throw error;
}

function testErrorScope(fn) {
  try {
    try {
      fn();
    } catch (error) {
      if (error.name === 'LocalError') {
        console.log('Обнаружена локальная ошибка:', error.name);
        console.error(error);
      } else {
        throw error; // проброс
      }
    }
  } catch (error) {
    console.log('Обнаружена глобальная ошибка:', error.name);
    console.error(error);
  }
}
testErrorScope(localError);
testErrorScope(globalError);
