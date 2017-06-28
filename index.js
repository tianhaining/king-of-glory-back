var express = require('express')
var app = express()
var router = require('./router.js')
var bodyParser = require('body-parser')//body-parser-node.js中间件，用于处理JSON,Raw,Text和URL编码的数据
var config = require('./config.js')
var history = require('connect-history-api-fallback')


//允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(history({
    index: '/index.html'
}))


//静态服务器
app.use('/', express.static(__dirname + '/dist'));

//获得post数据
app.use(bodyParser.json())

app.use('/api', router)

app.listen(config.port, () => {
    console.log(`listening ${config.port}`)
})