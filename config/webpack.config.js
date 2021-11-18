const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		index: './src/main.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Tank',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/assets", to: "./assets" }
			]
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		assetModuleFilename: 'assets/[name][ext]',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: 'raw-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /pixi\.js$/,
				loader: "expose-loader",
				options: {
					exposes: ['$', 'PIXI'],
				},
			}
		]
	}
};