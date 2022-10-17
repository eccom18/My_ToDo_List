export default function timer() {
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  document.querySelector('.header_wrap-date').innerHTML = `${day}.${
    month + 1
  }.${year}`
}
timer()
