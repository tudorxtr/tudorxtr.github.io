const openBtn = document.querySelector('#open')
const closeBtn = document.querySelector('#close')
const body = document.querySelector('body')
const container = document.querySelector('.container')

openBtn.addEventListener('click', () => {
    body.classList.add('stop-scrolling')
    container.classList.add('show-nav')
})

closeBtn.addEventListener('click', () => {
    body.classList.remove('stop-scrolling')
    container.classList.remove('show-nav')
})