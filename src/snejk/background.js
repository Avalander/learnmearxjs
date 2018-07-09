import { of } from 'rxjs'
import { range } from 'ramda'

import { rect, g } from './svg-helpers'


export default ({ width, height }) => of(createGrass({ width, height }))

const grass = {
	main: '#98e436',
	shade: '#59cb41',
	blend: '#59cb41',
}

const randInt = to =>
	Math.floor(Math.random() * to)

const createSpeckles = (shade, width, height, spread) =>
	range(0, width * height / spread)
		.map(() => randInt(2) + 1)
		.map(size => rect({ attrs: {
			fill: shade,
			x: randInt(width),
			y: randInt(height),
			width: size,
			height: size,
		}}))

const createGrass = ({ width, height }) =>
	g([
		rect({ attrs: { x: 0, y: 0, width, height, fill: grass.main }}),
		...createSpeckles(grass.shade, width, height, 50),
		...createSpeckles(grass.blend, width, height, 20),
	])
