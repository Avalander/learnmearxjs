import { fromEvent } from 'rxjs'
import { map, startWith } from 'rxjs/operators'


export const makeHero$ = ({ width, height, canvas }) => {
	const HERO_Y = height - 30
	const mouse_move$ = fromEvent(canvas, 'mousemove')

	return mouse_move$
		.pipe(
			map(event => ({
				x: event.clientX,
				y: HERO_Y,
			})),
			startWith({
				x: width / 2,
				y: HERO_Y,
			}),
		)	
}

export const makePaintSpaceship = context => ({ x, y }) =>
	drawTriangle({ context, x, y, width: 20, color: '#ff0000', direction: 'up' })

const drawTriangle = ({ context, x, y, width, color, direction }) => {
	const point = direction === 'up' ? y - width : y + width
	context.fillStyle = color
	context.beginPath()
	context.moveTo(x - width, y)
	context.lineTo(x, point)
	context.lineTo(x + width, y)
	context.lineTo(x - width, y)
	context.fill()
}
