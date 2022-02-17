import path from 'path';
import url from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const directoryName = path.dirname(url.fileURLToPath(import.meta.url));

const backendPort = 'PORT' in process.env ? Number(process.env.PORT) : 3000;

export default {
	entry: path.join(directoryName, 'src', 'index.js'),
	output: {
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Pipeline tool'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: path.join(directoryName, 'node_modules'),
				use: 'babel-loader'
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.svg$/,
				use: '@svgr/webpack'
			},
			{
				test: /\.(png|jpg|gif)$/,
				type: 'asset/resource'
			}
		]
	},
	performance: {
		hints: false
	},
	devtool: 'inline-source-map',
	devServer: {
		static: path.join(directoryName, 'dist'),
		historyApiFallback: true,
		proxy: {
			'/s/**': `http://localhost:${backendPort}`,
			'/pipeline': `http://localhost:${backendPort}`
		}
	}
};
