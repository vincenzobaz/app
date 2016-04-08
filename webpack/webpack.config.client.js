var path = require('path');
var webpack = require('webpack');


module.exports = {
    context: __dirname,
    entry: [
        'regenerator/runtime',
        '../app/client/scripts/main'
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'client.bundle.js',
        publicPath: '/assets/',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
        root: path.join(__dirname, '../app'),
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
            },
            {
                test: /\.css$/,
                loader: ['style', 'css', 'resolve-url']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'babel?' + '{presets: ["es2015", "react"]}' + '!ts-loader',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel?' + '{presets: ["es2015", "react"]}',
                exclude: /node_modules|lib/,
            },


        ],
    },
    plugins: [
        new webpack.PrefetchPlugin("react"),
        new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    ]
};
