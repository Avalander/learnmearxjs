import makeStar$ from './starfield'


const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const starfield$ = makeStar$({ width: canvas.width, height: canvas.height, context })