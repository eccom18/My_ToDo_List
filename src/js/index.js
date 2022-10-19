'use strict'
import timer from './header'
timer()
//открытие попап
const $POPUP = document.querySelector('#form_section')
const $BODY = document.querySelector('body')
const $POPUPOPEN = document.querySelectorAll('.popUp')
const $TITLEINP = document.querySelector('.title_input')
const $DESCRIPTIONINP = document.querySelector('.description_textarea')
const $AUTHOR = document.querySelector('.executor_input')
const $COLUMNLIST = document.querySelector('.todo_column-list')
const $CREATEBTN = document.querySelector('.create')
const $NEWTOTAL = document.querySelector('.new_total')

let cardArr = []

for (let i = 0; i < $POPUPOPEN.length; i++) {
  $POPUPOPEN[i].addEventListener('click', (e) => {
    $POPUP.classList.toggle('open')
    $BODY.classList.toggle('lock')
    e.preventDefault()
  })
}

// верстка карточки

$CREATEBTN.addEventListener('click', (e) => {
  e.preventDefault()
  firstArr()
  render()
  getRender()
  // del()

  $NEWTOTAL.textContent = cardArr.length
  $TITLEINP.value = ''
  $DESCRIPTIONINP.value = ''
  $AUTHOR.value = ''
})

//создаём новый обьект и пушим его в массив
let firstArr = () => {
  function CreateObj(title, descr, author) {
    this.title = $TITLEINP.value
    this.descr = $DESCRIPTIONINP.value
    this.author = $AUTHOR.value
  }
  cardArr.push(new CreateObj())
}

//пушим созданный массив в локал
let render = () => {
  let cardToJson = JSON.stringify(cardArr)
  localStorage.setItem('card', cardToJson)
}

//парсим массив
let getRender = () => {
  let from = localStorage.getItem('card')
  let dataFrom = JSON.parse(from)
  if (dataFrom) {
    sortArr(dataFrom)
  } else {
    $COLUMNLIST.innerHTML = ''
  }
}

let restart = () => {
  $COLUMNLIST.innerHTML = ''
  let fromRest = localStorage.getItem('card')
  let restFrom = JSON.parse(fromRest)
  let createCard1 = (el1) => {
    let newCard1 = `
      <div class="todo_card">
        <div class="todo_card-title">${el1.title}</div>
        <div class="todo_card-description">${el1.descr}</div>
        <div class="todo_card-executor">
          <span class="execuor_name">${el1.author}</span>
          <span class="delete"
          ><i class="fa-sharp fa-solid fa-trash card_delete"></i
        ></span>
        </div>
      </div>
      `
    $COLUMNLIST.innerHTML += newCard1
  }
  let restSort = (restFrom) => {
    restFrom.forEach((el1) => {
      createCard1(el1)
      cardArr.push(el1)
      $NEWTOTAL.textContent = cardArr.length
    })
  }
  if (restFrom) {
    restSort(restFrom)
  } else {
    $COLUMNLIST.innerHTML = ''
  }
}
restart()

//перебираем массив и делаем карточку
let sortArr = (dataFrom) => {
  $COLUMNLIST.innerHTML = ''
  dataFrom.forEach((el) => {
    createCard(el)
  })
}

let createCard = (el) => {
  let newCard = `
    <div class="todo_card">
      <div class="todo_card-title">${el.title}</div>
      <div class="todo_card-description">${el.descr}</div>
      <div class="todo_card-executor">
        <span class="execuor_name">${el.author}</span>
        <span class="card_delete"
        ><i class="fa-sharp fa-solid fa-trash"></i
      ></span>
      </div>
    </div>
    `
  $COLUMNLIST.innerHTML += newCard
}

// выводим тотал

// let del = (el) => {
//   const $DEL = document.querySelectorAll('.card_delete')
//   for (let i = 0; i < $DEL.length; i++) {
//     console.log($DEL[i])
//     $DEL[i].addEventListener('click', (e) => {
//       localStorage.clear()
//       console.log(e.target)
//     })
//   }
// }
