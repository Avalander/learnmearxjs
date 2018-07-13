import { interval, fromEvent, combineLatest } from 'rxjs'
import {
	distinctUntilChanged,
	filter,
	map,
	sampleTime,
	scan,
	startWith,
} from 'rxjs/operators'

import { g, rect } from './svg-helpers'


const SPEED = 100
const width = 10
const height = 10
const fill = '#32b184'
const stroke = '#217558'

export const makeSnake$ = ({ top, bottom, left, right }) =>
	combineLatest(direction$, interval(SPEED))
		.pipe(
			sampleTime(SPEED),
			map(([ direction ]) => direction),
			scan(updateSnake, initSnake()),
		)

export const paintSnake = snake =>
	g(snake.map(({ x, y }) =>
		rect({ attrs: { x, y, width, height, fill, stroke, 'stroke-width': 2 }})
	))

const updateSnake = (snake, direction) => {
	for (let i = snake.length - 1; i > 0; i--) {
		snake[i].x = snake[i - 1].x
		snake[i].y = snake[i - 1].y
	}
	snake[0].x += direction.x * width
	snake[0].y += direction.y * height
	return snake
}

const key_to_direction = {
	'ArrowDown': { x: 0, y: 1 },
	'ArrowUp': { x: 0, y: -1 },
	'ArrowRight': { x: 1, y: 0 },
	'ArrowLeft': { x: -1, y: 0 },
}

const direction$ = fromEvent(window, 'keyup')
	.pipe(
		filter(({ key }) => [ 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp' ].includes(key)),
		map(ev => {
			ev.preventDefault()
			return ev
		}),
		map(({ key }) => key_to_direction[key]),
		startWith(key_to_direction['ArrowRight']),
		distinctUntilChanged(),
	)

const initSnake = () =>
	[
		{ x: 30, y: 10 },
		{ x: 20, y: 10 },
		{ x: 10, y: 10 },
	]