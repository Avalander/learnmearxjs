import { init } from 'snabbdom'
import props from 'snabbdom/modules/props'
import attributes from 'snabbdom/modules/attributes'

import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { svg } from './svg-helpers'

import background from './background'
import { makeSnake$, paintSnake } from './snake'


const patch = init([
	props,
	attributes,
])

const container = document.querySelector('#content')
let vnode = svg({ attrs: { viewBox: '0 0 600 300', width: 600, height: 300 }})
vnode = patch(container, vnode)

const background$ = background({ width: 600, height: 300 })
const snake$ = makeSnake$({ top: 0, bottom: 300, left: 0, right: 600 })
	.pipe(
		map(paintSnake),
	)

const game$ = combineLatest(background$, snake$)

game$.subscribe(actors => {
	const node = svg({ attrs: { viewBox: '0 0 600 300', width: 600, height: 300 }}, actors)
	vnode = patch(vnode, node)
})
