const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

// checks if it is production bundling or development bundling 
const isEnvProduction = process.argv.includes("production")

// our root file
const entrypoint = './src/index.js'

const productionSettings = {
	mode: "production",
	entry: entrypoint,
	output: {
        // output directory will be the root directory of django
        path: path.resolve(__dirname, '../'),
        // this is the bundled code we wrote
        filename: 'static/js/[name].js',
        // this is the bundled library code
	    chunkFilename: 'static/js/[name].chunk.js'
	},
    optimization: {
		minimize: true,
		splitChunks: {
		  chunks: 'all',
		  name: true,
		},
		runtimeChunk: false,
	  },
	devServer: {
		historyApiFallback: true,
		stats: 'normal',
	  },
	module: {
		rules: [
			{
				// for bundling transpiled javascript
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.css$/i,
				use: [
				  // IMPORTANT => don't forget `injectType`  option  
				  // in some cases some styles can be missing due to 
				  // inline styling. 
				  { loader: 'style-loader', options: { injectType: 'styleTag' } },
				  "css-loader"
				],
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			// this is where webpack read our app for bundling
			template: "./src/index.html",
			// this is emitted bundle html file
			// django will use this as template after bundling
            filename:"./templates/index.html"
		}),
	]
};

const devSettings = {
	mode: "development",
    entry: entrypoint,
	output: {
		path: path.resolve(__dirname, './build'),
		publicPath: "/",
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js/[name].chunk.js',
	},
	devtool: 'inline',
	devServer: {
		historyApiFallback: true,
		contentBase: './dist',
		stats: 'minimal',
	  },
	module: {
		rules: [
			{	// using transpiled javascript
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-proposal-object-rest-spread"],
						// for fast development environment
						// enable caching transpilation
						cacheDirectory: true
					},
				}
			},

			{
				test: /\.css$/i,
				use: [
				  // IMPORTANT => don't forget `injectType`  option  
				  // in some cases some styles can be missing due to 
				  // inline styling. 
				  { loader: 'style-loader', options: { injectType: 'styleTag' } },
				  "css-loader",
				  'postcss-loader'
				  //{ loader: 'sass-loader' },
				],
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		})
	]
};



module.exports = isEnvProduction ? productionSettings : devSettings;