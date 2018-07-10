export const makeDrawTriangle = context => ({ x, y, width, color, direction }) => {
	const point = direction === 'up' ? y - width : y + width
	context.fillStyle = color
	context.beginPath()
	context.moveTo(x - width, y)
	context.lineTo(x, point)
	context.lineTo(x + width, y)
	context.lineTo(x - width, y)
	context.fill()
}