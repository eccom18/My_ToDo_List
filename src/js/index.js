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
const $NEWCOLUMNLIST = document.querySelector('.new_column')
const $CREATEBTN = document.querySelector('.create')
const $NEWTOTAL = document.querySelector('.new_total')
const $PROGRCOL = document.querySelector('.progr_column')
const $PROGRTOTAL = document.querySelector('.progress_total')
const $DONECOL = document.querySelector('.done_column')
const $DONETOTAL = document.querySelector('.done_total')

let del
let remove
let delete_prog
let removeLeft
let removeRight
let removeLeftDone
let delete_done
let cardArr = JSON.parse(localStorage.getItem('card')) || []
let progressArr = JSON.parse(localStorage.getItem('prog')) || []
let doneArr = JSON.parse(localStorage.getItem('done')) || []
document.querySelector('.delete_all_new').addEventListener('click', (e) => {
  cardArr = []
  localPush()
  restart()
})
document.querySelector('.delete_all_prog').addEventListener('click', (e) => {
  progressArr = []
  localProg()
  restart()
})
document.querySelector('.delete_all_done').addEventListener('click', (e) => {
  doneArr = []
  localDone()
  restart()
})

let total = () => {
  $NEWTOTAL.textContent = cardArr.length
  $PROGRTOTAL.textContent = progressArr.length
  $DONETOTAL.textContent = doneArr.length
}
let clear = () => {
  $TITLEINP.value = ''
  $DESCRIPTIONINP.value = ''
  $AUTHOR.value = ''
}

let createCard = (el) => {
  let newCard = `
    <div class="todo_card">
      <div class="todo_card-title">${el.title}</div>
      <div class="todo_card-description">${el.descr}</div>
      <div class="todo_card-executor">
        <span class="execuor_name">${el.author}</span>
        <i class="fa-solid fa-arrow-right remove-prog"></i>
        <span class="card_delete"
        ><i class="fa-sharp fa-solid fa-trash"></i
      >
      </span>
      </div>
    </div>
    `
  $NEWCOLUMNLIST.innerHTML += newCard
}

let ProgressCard = (el1) => {
  let progCard = `
  <div class="todo_card">
    <div class="todo_card-title">${el1.title}</div>
    <div class="todo_card-description">${el1.descr}</div>
    <div class="todo_card-executor">
      <span class="execuor_name">${el1.author}</span>
      <i class="fa-solid fa-arrow-left remove-left"></i>
      <i class="fa-solid fa-arrow-right remove-right"></i>
      <span class="delete_prog"
      ><i class="fa-sharp fa-solid fa-trash"></i
    >
    </span>
    </div>
  </div>
  `
  $PROGRCOL.innerHTML += progCard
}

let doneCard = (el2) => {
  let lastCard = `
  <div class="todo_card">
    <div class="todo_card-title">${el2.title}</div>
    <div class="todo_card-description">${el2.descr}</div>
    <div class="todo_card-executor">
      <span class="execuor_name">${el2.author}</span>
      <i class="fa-solid fa-arrow-left remove-left_done"></i>
      <span class="delete_done"
      ><i class="fa-sharp fa-solid fa-trash"></i
    >
    </span>
    </div>
  </div>
  `
  $DONECOL.innerHTML += lastCard
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
let localPush = () => {
  let cardToJson = JSON.stringify(cardArr)
  localStorage.setItem('card', cardToJson)
}
let localProg = () => {
  let cardToJson = JSON.stringify(progressArr)
  localStorage.setItem('prog', cardToJson)
}
let localDone = () => {
  let cardToJson = JSON.stringify(doneArr)
  localStorage.setItem('done', cardToJson)
}

//рендерим карточку
let getRender = () => {
  if (cardArr) {
    sortArr(cardArr)
  } else {
    $NEWCOLUMNLIST.innerHTML = ''
  }
}

//попап
for (let i = 0; i < $POPUPOPEN.length; i++) {
  $POPUPOPEN[i].addEventListener('click', (e) => {
    $POPUP.classList.toggle('open')
    $BODY.classList.toggle('lock')
  })
}
//перебираем массив и вызываем
let sortArr = (cardArr) => {
  $NEWCOLUMNLIST.innerHTML = ''
  cardArr.forEach((el) => {
    createCard(el)
  })
}
let sortProg = (progressArr) => {
  $PROGRCOL.innerHTML = ''
  progressArr.forEach((el1) => {
    ProgressCard(el1)
  })
}
let sortDone = (doneArr) => {
  $DONECOL.innerHTML = ''
  doneArr.forEach((el2) => {
    doneCard(el2)
  })
}

// удаляет карточку по клику

function datasetCard() {
  let del = document.querySelectorAll('.card_delete')
  for (let i = 0; i < del.length; i++) {
    del[i].addEventListener('click', (e) => {
      cardArr.splice(i, 1)
      localPush()
      restart()
    })
  }
  let remove = document.querySelectorAll('.remove-prog')
  for (let k = 0; k < remove.length; k++) {
    remove[k].addEventListener('click', (event) => {
      progressArr.push(cardArr[k])
      sortProg(progressArr)
      cardArr.splice(k, 1)
      localProg()
      localPush()
      restart()
    })
  }
}

function progMove() {
  let delete_prog = document.querySelectorAll('.delete_prog')
  for (let i = 0; i < delete_prog.length; i++) {
    delete_prog[i].addEventListener('click', (e) => {
      progressArr.splice(i, 1)
      localProg()
      restart()
    })
  }
  let removeLeft = document.querySelectorAll('.remove-left')
  for (let j = 0; j < removeLeft.length; j++) {
    removeLeft[j].addEventListener('click', (e) => {
      cardArr.push(progressArr[j])
      sortArr(cardArr)
      progressArr.splice(j, 1)
      localPush()
      localProg()
      restart()
    })
  }
  let removeRight = document.querySelectorAll('.remove-right')
  for (let k = 0; k < removeRight.length; k++) {
    removeRight[k].addEventListener('click', (e) => {
      doneArr.push(progressArr[k])
      sortDone(doneArr)
      progressArr.splice(k, 1)
      localDone()
      localProg()
      restart()
    })
  }
}

function doneMove() {
  let delete_done = document.querySelectorAll('.delete_done')
  for (let i = 0; i < delete_done.length; i++) {
    delete_done[i].addEventListener('click', (e) => {
      doneArr.splice(i, 1)
      localDone()
      restart()
    })
  }
  let removeLeftDone = document.querySelectorAll('.remove-left_done')
  for (let k = 0; k < removeLeftDone.length; k++) {
    removeLeftDone[k].addEventListener('click', (e) => {
      progressArr.push(doneArr[k])
      sortProg(progressArr)
      doneArr.splice(k, 1)
      localDone()
      localProg()
      restart()
    })
  }
}

// верстка карточки по клику
$CREATEBTN.addEventListener('click', (e) => {
  e.preventDefault()
  firstArr()
  localPush()
  getRender()
  datasetCard()
  progMove()
  doneMove()
  $NEWTOTAL.textContent = cardArr.length
  clear()
})

//вывод карточек после рестарта

let restart = () => {
  if (cardArr) {
    sortArr(cardArr)
    sortProg(progressArr)
    sortDone(doneArr)
  } else {
    $NEWCOLUMNLIST.innerHTML = ''
  }
  total()
  doneMove()
  datasetCard()
  progMove()
}
restart()
