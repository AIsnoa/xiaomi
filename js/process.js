// let commander = require('commander')
// commander.option('--port <v>', 'set your port')
// console.log(commander.parse(commander.args))
// console.log(process.args)
// process.env.qqqq = 'aaaa'
// console.log(process.argv)
// let fs = require('fs')
//     // console.log(fs)
// fs.stat('../js', (err, data) => {
//     console.log(data.isDirectory())
// })
let http = require('http')
let port = 8080
let server = http.createServer((request, response) => {

    console.log(request.method)
    console.log(request.url)
    response.end('haha')
})
server.on('error', (err) => {
    if (err.errno == 'EADDRINUSE') {
        server.listen(++port)
    }
})
server.listen(8080, () => {
    console.log('server start in port : ' + port)
})