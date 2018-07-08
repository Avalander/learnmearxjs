import { fromEvent } from 'rxjs'
import { map, scan } from 'rxjs/operators'


const button = document.querySelector('#click')
const counter = document.querySelector('#counter')

fromEvent(button, 'click')
	.pipe(
		map(() => 1),
		scan((prev, x) => prev + x, 0),
		map(x => {
			console.log(`Current count: ${x}`)
			return x
		}),
	)
	.subscribe(count => counter.innerHTML = count)