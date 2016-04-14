var webpack = require('webpack');
var config = require('./webpack.config.server');
var _ = require('lodash');

var config = module.exports = _.assign(_.clone(config), {
    plugins: (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]),
  devtool: 'source-map',
  output: _.assign(_.clone(config.output), {
    pathinfo: true
  }),

});
