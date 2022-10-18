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

  $NEWTOTAL.textContent = cardArr.length
  $TITLEINP.value = ''
  $DESCRIPTIONINP.value = ''
  $AUTHOR.value = ''
  $NEWTOTAL.textContent = cardArr.length
})

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
    console.log('что то не так')
  }
}

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
        <span class="delete"
        ><i class="fa-sharp fa-solid fa-trash"></i
      ></span>
      </div>
    </div>
    `
  $COLUMNLIST.innerHTML += newCard
}

//создаём новый обьект и пушим его в массив
let firstArr = () => {
  function CreateObj(title, descr, author) {
    this.title = $TITLEINP.value
    this.descr = $DESCRIPTIONINP.value
    this.author = $AUTHOR.value
  }
  cardArr.push(new CreateObj())
}
// выводим тотал
const $NEWTOTAL = document.querySelector('.new_total')
