import L from 'leaflet'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp'

const loadJsonp = url => {
	const script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = url

	const head = document.querySelector('head')
	head.appendChild(script)
}

const map_container = document.createElement('div')
map_container.id = 'map'
document.body.appendChild(map_container)

const map_view = L.map('map').setView([ 33.858631, -118.279602 ], 7)
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map_view)


const quakes$ =
	Observable.create(observer => {
		window.eqfeed_callback = response =>
			response.features.forEach(x => observer.next(x))
		loadJsonp(QUAKE_URL)
	})

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
