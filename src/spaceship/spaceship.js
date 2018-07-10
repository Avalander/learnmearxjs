import { combineLatest } from 'rxjs'

import { makeStarfield$, makePaintStars } from './starfield'
import { makeHero$, makePaintSpaceship } from './hero'
import { makeEnemies$, makePaintEnemies } from './enemy'


const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const paintStars = makePaintStars({ context, width: canvas.width, height: canvas.height })
const paintSpaceship = makePaintSpaceship(context)
const paintEnemies = makePaintEnemies(context, canvas.width)
const renderScene = ([ stars, spaceship, enemies ]) => {
	paintStars(stars)
	paintSpaceship(spaceship)
	paintEnemies(enemies)
}

const starfield$ = makeStarfield$({ width: canvas.width, height: canvas.height })
const hero$ = makeHero$({ width: canvas.width, height: canvas.height, canvas })
const enemies$ = makeEnemies$({ width: canvas.width })

const game$ = combineLatest(starfield$, hero$, enemies$)
game$.subscribe(renderScene)