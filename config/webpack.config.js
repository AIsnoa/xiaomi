let {CleanWebpackPlugin} = require('clean-webpack-plugin')
let html = require('html-webpack-plugin')
let path = require('path')
let webpack = require('webpack')
const MinCss = require('mini-css-extract-plugin')
let MyPlugin = require('../src/util/myplugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename: 'index.[hash:6].js',
        path:path.resolve(__dirname,'../dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: [MinCss.loader,'css-loader']
            },
            {
                test: /\.(jpg|png|jpeg|ico|webp|gif)$/i,
                use: {
                    loader:'url-loader',
                    options:{
                        limit: 40*1024,
                        name:'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.js$/i,
                use: 'myloader',
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new MyPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        }),
        new CleanWebpackPlugin({

        }),
        new html({
            template:'./public/index.html'
        }),
        new MinCss({
            filename:'css/[name].css'
        })
    ],
    devtool: 'eval-cheap-module-source-map',
    resolve:{
        alias:{
            '@':path.resolve(__dirname,'./src')
        }
    },
    resolveLoader: {
        modules: ['node_modules','src/util']
    }
}