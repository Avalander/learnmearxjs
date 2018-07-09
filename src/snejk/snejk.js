import { partial } from 'ramda'

import { init } from 'snabbdom'
import props from 'snabbdom/modules/props'
import attributes from 'snabbdom/modules/attributes'
import h from 'snabbdom/h'


const patch = init([
	props,
	attributes,
])

const svg = partial(h, ['svg'])
const rect = partial(h, ['rect'])

const container = document.querySelector('#content')

const node = svg({ attrs: { viewBox: '0 0 600 300', width: 600, height: 300 }}, [
	rect({ attrs: { x: 0, y: 0, width: 600, height: 300, fill: '#c9d8d4'}}),
	rect({ attrs: { x: 10, y: 10, width: 50, height: 50, fill: '#32b184' }}),
])

patch(container, node)
