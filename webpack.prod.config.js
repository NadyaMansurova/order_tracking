var path = require('path'),
    webpack = require('webpack');


var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: __dirname + '/frontend/assets/build',
    entry: {
        'layout.prod': ['layout']
    },
    output: {
        path: __dirname + '/frontend/prod',
        publicPath: "/frontend/prod/",
        filename: '[name].min.js',
        chunkFilename: "[chunkhash].js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'baggage?[file].html&[file].css',
                exclude: /node_modules/
            }
        ],
        loaders: [
            { test: /\.less/,    loader: "style!css!less" },

            {
                test: /\.html$/,
                loader: "raw"
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=img/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=0&interlaced=false'
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/orders.html', // Load a custom template
            inject: 'head',
            title: 'Orders page',
            chunks: ['layout.prod']
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        alias: {
            'vendors-frontend': __dirname + '/frontend/assets/build/vendors',
            'layout':  __dirname + '/frontend/assets/build/js/layout',
            'orders': __dirname + '/frontend/assets/build/js/orders/OrdersIndex.js',
            'less': __dirname + '/frontend/assets/less'
        }
    }
};