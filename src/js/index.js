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
const $PROGRCOL = document.querySelector('todo_column-listProgr')
let del
let remove
let cardArr = JSON.parse(localStorage.getItem('card')) || []
let progressCard = JSON.parse(localStorage.getItem('card')) || []

let createCard = (el) => {
  let newCard = `
    <div class="todo_card">
      <div class="todo_card-title">${el.title}</div>
      <div class="todo_card-description">${el.descr}</div>
      <div class="todo_card-executor">
        <span class="execuor_name">${el.author}</span>
        <i class="fa-solid fa-arrow-right remove"></i>
        <span class="card_delete"
        ><i class="fa-sharp fa-solid fa-trash"></i
      >
      </span>
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

//пушим созданный массив в локал
let render = () => {
  let cardToJson = JSON.stringify(cardArr)
  localStorage.setItem('card', cardToJson)
}

//распарсим массив
let getRender = () => {
  if (cardArr) {
    sortArr(cardArr)
  } else {
    $COLUMNLIST.innerHTML = ''
  }
}

//добавление карточки
for (let i = 0; i < $POPUPOPEN.length; i++) {
  $POPUPOPEN[i].addEventListener('click', (e) => {
    $POPUP.classList.toggle('open')
    $BODY.classList.toggle('lock')
  })
}
//перебираем массив и делаем карточку
let sortArr = (cardArr) => {
  $COLUMNLIST.innerHTML = ''
  cardArr.forEach((el) => {
    createCard(el)
  })
}

// устанавливает дата-атрибуты

function datasetCard() {
  del = document.querySelectorAll('.card_delete')
  for (let i = 0; i < del.length; i++) {
    del[i].addEventListener('click', (e) => {
      cardArr.splice(i, 1)
      render()
      restart()
    })
  }
  // remove = document.querySelectorAll('.remove')
  // for (let k = 0; k < remove.length; k++) {
  //   remove[k].addEventListener('click', (event) => {
  //     progressCard.push(cardArr.slice(k, 1))
  //     progressCard.forEach((el) => {
  //       let gth = `
  //     <div class="todo_card">
  //       <div class="todo_card-title">${el.title}</div>
  //       <div class="todo_card-description">${el.descr}</div>
  //       <div class="todo_card-executor">
  //         <span class="execuor_name">${el.author}</span>
  //         <i class="fa-solid fa-arrow-right remove"></i>
  //         <span class="card_delete"
  //         ><i class="fa-sharp fa-solid fa-trash"></i
  //       >
  //       </span>
  //       </div>
  //     </div>
  //     `
  //       // $PROGRCOL.innerHTML += gth
  //     })
  //   })
  //   console.log(el)
  // }
}

// верстка карточки по клику
$CREATEBTN.addEventListener('click', (e) => {
  e.preventDefault()
  firstArr()
  render()
  getRender()
  datasetCard()
  $NEWTOTAL.textContent = cardArr.length
  $TITLEINP.value = ''
  $DESCRIPTIONINP.value = ''
  $AUTHOR.value = ''
})

//вывод карточек после рестарта

let restart = () => {
  if (cardArr) {
    sortArr(cardArr)
  } else {
    $COLUMNLIST.innerHTML = ''
  }
  $NEWTOTAL.textContent = cardArr.length
  datasetCard()
}
restart()
