import { combineLatest } from 'rxjs'

import { makeStarfield$, makePaintStars } from './starfield'
import { makeHero$, makePaintSpaceship } from './hero'


const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const paintStars = makePaintStars({ context, width: canvas.width, height: canvas.height })
const paintSpaceship = makePaintSpaceship(context)
const renderScene = ({ stars, spaceship }) => {
	paintStars(stars)
	paintSpaceship(spaceship)
}

const starfield$ = makeStarfield$({ width: canvas.width, height: canvas.height })
const hero$ = makeHero$({ width: canvas.width, height: canvas.height, canvas })
const combineActors = (stars, spaceship) => ({ stars, spaceship })

const game$ = combineLatest(starfield$, hero$, combineActors)
game$.subscribe(renderScene)