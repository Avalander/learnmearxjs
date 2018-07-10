import { fromEvent, merge, combineLatest } from 'rxjs'
import { distinctUntilKeyChanged, filter, sampleTime, scan, startWith, timestamp } from 'rxjs/operators'


const PROJECTILE_SPEED = 5

export const makeHeroShots$ = ({ canvas, hero$ }) =>
	combineLatest(makePlayerFiring$({ canvas }), hero$, combineShotsAndHero)
		.pipe(
			distinctUntilKeyChanged('timestamp'),
			scan(createShot, []),
		)

export const makePlayerFiring$ = ({ canvas }) =>
	merge(
		fromEvent(canvas, 'click'),
		fromEvent(document, 'keydown')
			.pipe(
				filter(({ keyCode }) => keyCode === 32)
			),
	)
	.pipe(
		startWith({}),
		sampleTime(200),
		timestamp(),
	)

export const makePaintHeroShots = drawTriangle => shots => {
	shots.forEach(shot => {
		shot.y -= PROJECTILE_SPEED
		drawTriangle({ x: shot.x, y: shot.y, width: 5, color: '#ffff00', direction: 'up' })
	})
}

const combineShotsAndHero = ({ timestamp }, { x, y }) => ({ x, y, timestamp })

const createShot = (shots, { x, y }) => {
	shots.push({ x, y: y - 10 })
	return shots
}
