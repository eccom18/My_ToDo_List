'use strict'
import timer from './header'
timer()

const $POPUP = document.querySelector('#form_section')
const $BODY = document.querySelector('body')
const showPopUp = () => {
  $POPUP.classList.toggle('open')
  $BODY.classList.toggle('lock')
}
document
  .querySelector('.fa-circle-xmark', '.cancel', '.fa-plus')
  .addEventListener('click', showPopUp)
document.querySelector('.cancel').addEventListener('click', showPopUp)
document.querySelector('.fa-plus').addEventListener('click', showPopUp)
