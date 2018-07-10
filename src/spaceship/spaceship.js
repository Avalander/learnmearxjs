import { combineLatest } from 'rxjs'
import { sampleTime } from 'rxjs/operators'

import { makeDrawTriangle } from './render'
import { makeStarfield$, makePaintStars } from './starfield'
import { makeHero$, makePaintSpaceship } from './hero'
import { makeHeroShots$, makePaintHeroShots } from './hero-shots'
import { makeEnemies$, makePaintEnemies } from './enemy'


const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const drawTriangle = makeDrawTriangle(context)
const paintStars = makePaintStars({ context, width: canvas.width, height: canvas.height })
const paintSpaceship = makePaintSpaceship(context)
const paintEnemies = makePaintEnemies(drawTriangle, canvas.width)
const paintHeroShots = makePaintHeroShots(drawTriangle)
const renderScene = ([ stars, spaceship, enemies, hero_shots ]) => {
	paintStars(stars)
	paintSpaceship(spaceship)
	paintEnemies(enemies)
	paintHeroShots(hero_shots)
}

const starfield$ = makeStarfield$({ width: canvas.width, height: canvas.height })
const hero$ = makeHero$({ width: canvas.width, height: canvas.height, canvas })
const enemies$ = makeEnemies$({ width: canvas.width })
const hero_shots$ = makeHeroShots$({ canvas, hero$ })

const game$ = combineLatest(starfield$, hero$, enemies$, hero_shots$)
	.pipe(
		sampleTime(40),
	)
game$.subscribe(renderScene)