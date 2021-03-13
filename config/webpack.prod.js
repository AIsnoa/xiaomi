let path = require('path')
let {merge} = require('webpack-merge')
let base = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssMininizerPlugin = require('css-minimizer-webpack-plugin')
let obj = merge(base,{
    mode:'production',
    optimization:{
        minimizer:[
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin(),
        ]
    }
})
module.exports = obj