import { interval } from 'rxjs'
import { scan } from 'rxjs/operators'


const FREQUENCY = 1500

export const makeEnemies$ = ({ width }) =>
	interval(FREQUENCY).pipe(
		scan(enemies => {
			enemies.push({
				x: randInt(0, width),
				y: -30,
				speed_x: choose(-1, 1),
				chance_of_change: 0,
			})
			return enemies
		}, []),
	)

export const makePaintEnemies = (context, width) => enemies => {
	enemies
		.map(updateEnemy(width))
		.forEach(enemy => {
			drawTriangle({ context, x: enemy.x, y: enemy.y, width: 20, color: '#00ff00', direction: 'down' })
		})
}

const updateEnemy = width => enemy => {
	enemy.y += 5
	enemy.chance_of_change = min(enemy.chance_of_change + 0.025, 0.5)
	if (Math.random() < enemy.chance_of_change) {
		enemy.speed_x = -1 * enemy.speed_x
		enemy.chance_of_change = 0
	}
	enemy.x += 5 * enemy.speed_x

	if (enemy.x < 20) enemy.x = 20
	if (enemy.x > width - 20) enemy.x = width - 20

	return enemy
}

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

const randInt = (from, to) => Math.floor(Math.random() * (to - from)) + from

const choose = (...options) => options[randInt(0, options.length)]

const min = (a, b) => a < b ? a : b
