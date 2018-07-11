const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const folders = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),
}

const htmlFile = name =>
	new HtmlWebpackPlugin({
		template: path.join(folders.src, name, 'index.html'),
		filename: `${name}.html`,
		chunks: [ name ],
	})

module.exports = {
	entry: {
		'hello-world': path.resolve(folders.src, 'hello-world', 'hello-world.js'),
		'handle-errors': path.resolve(folders.src, 'handle-errors', 'handle-errors.js'),
		'earthquakes': path.resolve(folders.src, 'earthquakes', 'earthquakes.js'),
		'snake-clone': path.resolve(folders.src, 'snake-clone', 'main.js'),
		'spaceship': path.resolve(folders.src, 'spaceship', 'spaceship.js'),
	},
	output: {
		path: folders.dist,
		filename: '[name].bundle.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [[ 'env', {
						targets: {
							browsers: [ 'last 2 versions' ],
						}
					}]],
					plugins: [
						[ 'transform-object-rest-spread', { useBuiltIns: true }]
					]
				}
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(folders.src, 'index.html'),
			filename: 'index.html',
			chunks: [],
		}),
		htmlFile('hello-world'),
		htmlFile('handle-errors'),
		htmlFile('earthquakes'),
		htmlFile('snake-clone'),
		htmlFile('spaceship'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.SourceMapDevToolPlugin(),
	],
	resolve: {
		modules: [
			folders.src,
			'node_modules',
		],
	},
	devServer: {
		contentBase: folders.dist,
		compress: true,
		hot: true,
		stats: 'minimal',
	}
}
