import { init } from 'snabbdom'
import props from 'snabbdom/modules/props'
import attributes from 'snabbdom/modules/attributes'

import { svg, rect, g } from './svg-helpers'

import background from './background'


const patch = init([
	props,
	attributes,
])

const container = document.querySelector('#content')

background({ width: 600, height: 300 }).subscribe(
	group => {
		const node = svg({ attrs: { viewBox: '0 0 600 300', width: 600, height: 300 }}, [
			group,
			g([
				rect({ attrs: { x: 10, y: 10, width: 9, height: 9, fill: '#32b184', stroke: '#217558', 'stroke-width': 2 }}),
				rect({ attrs: { x: 20, y: 10, width: 9, height: 9, fill: '#32b184', stroke: '#217558', 'stroke-width': 2 }}),
				rect({ attrs: { x: 30, y: 10, width: 9, height: 9, fill: '#32b184', stroke: '#217558', 'stroke-width': 2 }}),
			])
		])
		patch(container, node)
	}
)
