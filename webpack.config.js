const path = require('path')
const webpack = require('webpack')

console.log(path.join(__dirname, 'build', 'box-maker'))

module.exports = {
    entry: {
        main: "./src/main"
    },
    output: {
        path: path.join(__dirname, 'build/box-maker'),
        filename: "[name].js"
    },
    module: {
        loaders: [
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.cjsx$/, loader: "coffee-jsx" },
			{ test: /\.coffee$/, loader: "coffee-jsx" },
			{ test: /\.styl$/, loader: "style!css!stylus" },
			{ test: /\.html$/, loader: "file?name=[name].[ext]" },
			{ test: /\.svg$/, loader: "file?name=[name].[ext]" },
			{ test: /\.png$/, loader: "file?name=[name].[ext]" },
			{ test: /\.ttf$/, loader: "file?name=[name].[ext]" },
			{ test: /\.eot$/, loader: "file?name=[name].[ext]" },
			{ test: /\.woff$/, loader: "file?name=[name].[ext]" },
			{ test: /\.woff2$/, loader: "file?name=[name].[ext]" }
        ]
    },
    resolve: {
		root: __dirname,
        extensions: ['', '.js', '.json', '.cson', '.cjsx', '.coffee', '.styl']
    },
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
		})
	]
};
