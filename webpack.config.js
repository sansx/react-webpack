var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var extractCSS = new ExtractTextPlugin('css/[name]-[md5:contenthash:base64:5].css');
var extractStylus = new ExtractTextPlugin('css/[name]-[md5:contenthash:base64:5].css');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");



module.exports = {
    entry:{
        'index':"./src/index.js"
    },
    output:{
        path:path.resolve(__dirname,'dist/'),
        filename:'./js/[name].js',
        globalObject: 'this',
        publicPath:"./"
    },
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [require.resolve('babel-loader'), require.resolve('pug-as-jsx-loader')]
              },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(eot|svg|ttf|woff|woff2|flf)$/,
                loader: 'file-loader'
            },
            { 
                test: /\.(css|styl)$/, 
                // loaders: ['style-loader', 'css-loader', 'stylus-loader'], 
                loader: extractStylus.extract(['css-loader', 'postcss-loader', 'stylus-loader'])
            },
            {
                loader: require.resolve('file-loader'),
                // Exclude `js` files to keep "css" loader working as it injects
                // it's runtime that would otherwise processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.js$/, /\.html$/, /\.json$/,/\.styl$/,/\.tsx?$/, /\.pug$/,],
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            {
                test:/\.(jpg|png|gif|jpeg|svg)$/,
                use:{
                    loader:"file-loader", //"url-loader"
                    options:{
                        limit:1000,
                        name:"static/[name].[ext]", //?[hash:base64:6]
                    }
                }
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        extractStylus
    ],
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    devServer:{
        historyApiFallback: true,
        overlay: true,
        open:true,
        // index:'down.html',
        // hot:true,
        noInfo: true,
        stats: 'minimal',
        // hotOnly: true,
        contentBase: path.join(__dirname, "src"),
        // watchContentBase: true,
        // watchOptions: {
        //     poll: true
        //   },
        disableHostCheck: true,
        watchContentBase: true,
        publicPath:"/"
    },
};


if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin("./dist")
    ])


}