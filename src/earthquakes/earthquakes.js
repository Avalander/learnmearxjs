import L from 'leaflet'

import { Observable, from, interval } from 'rxjs'
import { map, flatMap, retry, distinct } from 'rxjs/operators'


const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp'

/*
const loadJsonp = url => {
	const script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = url

	const head = document.querySelector('head')
	head.appendChild(script)
}

const quakes$ =
	Observable.create(observer => {
		window.eqfeed_callback = response => {
			observer.next(response)
			observer.complete()
		}
		loadJsonp(QUAKE_URL)
	}).pipe(
		flatMap(({ features }) => from(features))
	)
*/

const loadJSONP = ({ url, callback_name }) => {
	const script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = url

	window[callback_name] = data =>
		window[callback_name].data = data
	
	return Observable.create(observer => {
		const handler = event => {
			const status = event.type === 'error' ? 400 : 200
			const response = window[callback_name].data

			if (status === 200) {
				observer.next({
					status,
					responseType: 'jsonp',
					response,
					originalEvent: event,
				})
				observer.complete()
			}
			else {
				observer.error({
					type: 'error',
					status,
					originalEvent: event,
				})
			}
		}

		script.onload = script.onreadystatechanged = script.onerror = handler

		const head = document.querySelector('head')
		head.insertBefore(script, head.firstChild)
	})
}

const map_container = document.createElement('div')
map_container.id = 'map'
document.body.appendChild(map_container)

const map_view = L.map('map').setView([ 33.858631, -118.279602 ], 7)
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map_view)


const quakes$ =
	interval(5000)
		.pipe(
			flatMap(() =>
				loadJSONP({
					url: QUAKE_URL,
					callback_name: 'eqfeed_callback'
				})
				.pipe(
					retry(3)
				)
			),
			flatMap(({ response }) => from(response.features)),
			distinct(quake => quake.properties.code),
		)

quakes$
	.pipe(
		map(({ geometry, properties }) => ({
			coords: geometry.coordinates,
			size: properties.mag * 10000,
		}))
	)
	.subscribe(
		({ coords, size }) =>
			L.circle([ coords[1], coords[0]], size).addTo(map_view)
	)
