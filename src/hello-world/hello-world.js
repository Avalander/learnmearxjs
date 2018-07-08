import { fromEvent, interval } from 'rxjs'
import { map, scan } from 'rxjs/operators'


const button = document.querySelector('#click')
const counter = document.querySelector('#counter')
const elapsed_time = document.querySelector('#time')

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

interval(1000)
	.subscribe(t => elapsed_time.innerHTML = t)