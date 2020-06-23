// const http = require('http')
const url = require('url')
const fs = require('fs')
const game = require('./game')

const express = require('express')
const koa = require('koa')
const mount = require('koa-mount')

let playWon = 0
let playLastAction = null
let sameCount = 0

// const app = express();
const app = new koa()

app.use(
    mount('/favicon.ico', function (ctx) { 
        ctx.status = 200
    })
)

// app.get('/favicon.ico', function (req, res) {
//     res.status(200)
//     return
// })

const gameKoa = new koa()
gameKoa.use(
    async function (ctx, next) { 
        if (playWon >= 3) { 
            ctx.status = 500
            ctx.body = '我再也不和你玩了'
            // res.writeHead(500)
            // res.end('我再也不和你玩了')
            return
        }
        await next()
        if (ctx.playerWon) {
            playWon++
        }
    }
)

gameKoa.use(
    async function (ctx, next) { 
        const parseUrl = url.parse(ctx.url, true)
        const playerAction = parseUrl.query.action

        if (playerAction == 'reset'){
            playWon = 0;
            playLastAction = null;
            sameCount = 0;
            ctx.status = 500;
            ctx.body = '重来吧！';
            return
        }

        if (sameCount == 9) {
            ctx.status = 500
            ctx.body = '我不和你玩了'
        }

        if (playLastAction && playerAction == playLastAction) {
            sameCount++
            if (sameCount >= 3) {
                ctx.status = 500
                ctx.body = '你耍赖'
                return
            }
        } else { 
            sameCount = 0;
        }

        playLastAction = playerAction
        ctx.playerAction = playerAction
       await next() 
    },
)

gameKoa.use(
    async function (ctx, next) {
        const playerAction = ctx.playerAction
        if (sameCount >= 3) { 
            ctx.status = 500
            ctx.body = '你耍赖'
            // res.writeHead(400)
            // res.end('')
            sameCount = 9
            return
        }

        const gameResult = game(playerAction)
        
        ctx.status = 200

        if (gameResult === 0) {
            ctx.body = '平局'
        } else if (gameResult === 1) {
            ctx.playerWon = true
            ctx.body = '您赢了'
        } else { 
            ctx.body = '你输了'
        }
    }
)

app.use(mount('/game', gameKoa))
// app.get('/game',)
// app.get('/', function (req, res) { 
//     res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
//     // fs.createReadStream(__dirname + '/index.html').pipe(res)
//     // res.writeHead(200)
// })

app.use(
    mount('/', function (ctx) { 
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    })
)

app.listen(8000)

// http.createServer(function (req, res) { 
//     const parseUrl = url.parse(req.url, true)
//     if (parseUrl.pathname === '/game') {
//     }
// }).listen(3000)