import { interval, of } from 'rxjs'


const SVG_NS = "http://www.w3.org/2000/svg";

const background_group = document.querySelector('#background')

const background$ = of({ type: 'rect', x: 0, y: 0, width: 600, height: 400, fill: '#98e436' })
background$.subscribe(
	({ type, ...attrs }) => {
		const element = document.createElementNS(SVG_NS, type)
		Object.keys(attrs)
			.forEach(key =>
				element.setAttribute(key, attrs[key])
			)
		background_group.appendChild(element)
	}
)
