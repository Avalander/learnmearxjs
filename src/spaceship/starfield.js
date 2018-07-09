import { range, interval } from 'rxjs'
import { map, flatMap, toArray } from 'rxjs/operators'


const SPEED = 40
const STAR_COUNT = 250

export default ({ width, height, context }) => {
	const paintStars = stars => {
		context.fillStyle = '#000000'
		context.fillRect(0, 0, width, height)
		context.fillStyle = '#ffffff'
		stars.forEach(({ x, y, size }) =>
			context.fillRect(x, y, size, size)
		)
	}

	return range(1, STAR_COUNT)
		.pipe(
			map(() => ({
				x: randInt(0, width),
				y: randInt(0, height),
				size: randInt(1, 4),
			})),
			toArray(),
			flatMap(starArray =>
				interval(SPEED).pipe(
					map(() => {
						starArray.forEach(star => {
							if (star.y >= height) {
								star.y = 0
								star.x = randInt(0, width)
							}
							star.y += star.size
						})
						return starArray
					})
				)
			)
		)
		.subscribe(paintStars)		
}

const randInt = (from, to) => Math.floor(Math.random() * (to - from)) + from
