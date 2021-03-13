let path = require('path')
let {merge} = require('webpack-merge')
let base = require('./webpack.config.js')
let obj = merge(base,{
    mode:'development',
    devServer:{
        port:9001,
        open:true,
        // compress: true,
        // contentBase: path.resolve(__dirname,'../images'),
        // http:true,
        // proxy:{
        //     'api1': 'http://www.baidu.com',
        //     'api2':{
        //         target:'http://www.taobao.com',
        //         pathRewrite:{
        //             '^api2':''
        //         }
        //     }
        // },
        // before:function(app){
        //     app.get('/app/a',function(req,resp){
        //         resp.json({code:100})
        //     })
        // }
    }
})
module.exports = obj