import { from, of } from 'rxjs'
import { catchError, map, retry } from 'rxjs/operators'


const content = document.querySelector('#catch')

const getJSON = arr =>
	from(arr).pipe(
		map(JSON.parse)
	)

getJSON([
	'{"name": "Twilight Sparkle", "type": "alicorn"}',
	'{"name": "Fluttershy", "type: "pegasus"}',
	'{"name": "Applejack", "type": "earth pony"}'
]).pipe(
	map(x => JSON.stringify(x)),
	catchError(error => of('There was an error parsing your JSON.')),
).subscribe(
	value => content.innerHTML += `<p>Parsed value: ${value}</p>`,
	error => content.innerHTML += `<p>${error}</p>`
)


const retry_content = document.querySelector('#retry')

const randomJSON = () =>
	(Math.random() < 0.8
		? [
			'{"name": "Twilight Sparkle", "type": "alicorn"}',
			'{"name": "Fluttershy", "type": "pegasus"}',
			'{"name": "Applejack", "type": "earth pony"}'
		]
		: [
			'{"name": "Twilight Sparkle", "type": "alicorn"}',
			'{"name": "Fluttershy", "type: "pegasus"}',
			'{"name": "Applejack", "type": "earth pony"}'
		]
	)

getJSON(randomJSON())
	.pipe(
		retry(5),
		map(JSON.stringify)
	)
	.subscribe(
		value => retry_content.innerHTML += `<p>Parsed JSON: ${value}</p>`,
		err => retry_content.innerHTML += `<p>${err}</p>`,
	)
