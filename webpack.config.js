const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const folders = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),

}

module.exports = {
	entry: {
		'hello-world': path.resolve(folders.src, 'hello-world', 'hello-world.js'),
		'handle-errors': path.resolve(folders.src, 'handle-errors', 'handle-errors.js'),
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
			template: path.join(folders.src, 'hello-world', 'index.html'),
			filename: 'hello-world.html',
			chunks: [ 'hello-world' ],
		}),
		new HtmlWebpackPlugin({
			template: path.join(folders.src, 'handle-errors', 'index.html'),
			filename: 'handle-errors.html',
			chunks: [ 'handle-errors' ],
		}),
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
