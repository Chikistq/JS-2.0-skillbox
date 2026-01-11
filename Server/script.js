  const validate = new JustValidate('#film-form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      color: 'red',
      top: '-19px',
      position: 'relative',
      fontSize: '12px',
      left: '10px'
    },
  })

  validate
    .addField('#title', [
      {
        rule: 'required',
        errorMessage: 'Введите название фильма',
      },
      {
        rule: 'minLength',
        value: 3,
      },
    ])
    .addField('#genre', [
      {
        rule: 'required',
        errorMessage: 'Введите название жанра',
      },
    ])
    .addField('#releaseYear', [
      {
        rule: 'required',
        errorMessage: 'Введите год фильма',
      },
      {
        rule: 'number',
      },
    ])
    .onSuccess(handleFormSubmit)

function handleFormSubmit(e) {
  e.preventDefault();

  const form = document.querySelector('#film-form')
  const title = document.getElementById('title').value
  const genre = document.getElementById('genre').value
  const releaseYear = document.getElementById('releaseYear').value
  const isWatched = document.getElementById('isWatched').checked

  const film = {
    title: title,
    genre: genre,
    releaseYear: releaseYear,
    isWatched: isWatched,
  };
  addFilm(film)
  form.reset()
}

async function addFilm(film) {
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  // films.push(film);
  // localStorage.setItem("films", JSON.stringify(films));

  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "kribedko@yandex.ru",
    },
    body: JSON.stringify(film),
  });
  renderTable();
}

async function deleteFilm (id) {
  const response = await fetch(`https://sb-film.skillbox.cc/films/${id}`, {
    method: 'DELETE',
    headers: {
      email: "kribedko@yandex.ru",
    },
  })
}

async function deleteAll () {
  const response = await fetch(`https://sb-film.skillbox.cc/films`, {
    method: 'DELETE',
    headers: {
      email: "kribedko@yandex.ru",
    },
  })
}

const inputTitleEl = document.querySelector('#sortTitle')
const inputGenreEl = document.querySelector('#sortGenre')
const inputYearEl = document.querySelector('#sort-releaseYear')
const inputWatchEl = document.querySelector('#sortWatch')

async function renderTable() {

  const title = inputTitleEl.value
  const genre = inputGenreEl.value
  const releaseYear  = inputYearEl.value
  const isWatched = inputWatchEl.value

  let url = `https://sb-film.skillbox.cc/films`

  if (title || genre || releaseYear || isWatched) {
    url = `https://sb-film.skillbox.cc/films?title=${title}&genre=${genre}&releaseYear=${releaseYear}&isWatched=${isWatched}`
    // url = `https://sb-film.skillbox.cc/films?title=${title}&title=${title}&genre=${genre}&releaseYear=${releaseYear}&isWatched=${isWatched}`
  }

  // const filmsResponse = await fetch(`https://sb-film.skillbox.cc/films?title=${title}&title=${title}&genre=${genre}&releaseYear=${releaseYear}&isWatched=${isWatched}`, {
  //   headers: {
  //     email: "kribedko@yandex.ru",
  //   },
  // });

  const filmsResponse = await fetch(url, {
    headers: {
      email: "kribedko@yandex.ru",
    },
  });

  const films = await filmsResponse.json()
  const filmTableBody = document.getElementById("film-tbody");

  // Clear table body first
  filmTableBody.innerHTML = "";

  // Then add new rows

  films.forEach((film, index) => {
    const row = document.createElement("tr");
    row.setAttribute('data-id', film.id)
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td>
         <button class="deleteBtn">Удалить</button>
      </td>
    `;
    filmTableBody.appendChild(row);
  });

  const delBtn = document.querySelectorAll('.deleteBtn')
  delBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      async function onDel() {
        const currentRow = +e.currentTarget.parentNode.parentNode.dataset.id
        await deleteFilm(currentRow)
        await renderTable()
      }
      onDel()
    })
  })
}

//
// document
//   .getElementById("film-form")
//   .addEventListener("submit", handleFormSubmit);

// Display films on load
renderTable();


const delAll = document.querySelector('.deletAll')
  delAll.addEventListener('click', e => {
    e.preventDefault()
    async function onDelAll() {
     await deleteAll()
     await renderTable()
    }
    onDelAll()
})


const sortInput = document.querySelectorAll('.sort-input')
sortInput.forEach(input => {
    input.addEventListener('input', () => {
      async function on() {
        await renderTable()
      }
      on()
    })
})


const sortSelect = document.querySelector('#sortWatch')
  sortSelect.addEventListener('change', () => {
    async function on() {
      await renderTable()
    }
    on()
  })



