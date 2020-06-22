// const http = require('http')
const url = require('url')
const fs = require('fs')
const game = require('./game')

const express = require('express')

let playWon = 0
let playLastAction = null
let sameCount = 0

const app = express();

app.get('/favicon.ico', function (req, res) {
    res.status(200)
    return
})
app.get('/game',
    function (req, res, next) { 
        if (playWon >= 3 || sameCount == 9) { 
            res.status(500)
            res.send('我再也不和你玩了')
            // res.writeHead(500)
            // res.end('我再也不和你玩了')
            return
        }
        next()
        if (res.playerWon) {
            playWon++
        }
    },
    function (req, res, next) { 
        const parseUrl = url.parse(req.url, true)
        const playerAction = parseUrl.query.action

        if (playerAction == 'reset'){
            playWon = 0;
            playLastAction = null;
            sameCount = 0;
            res.status(500);
            res.send('重来吧！');
            return
        }

        if (playLastAction && playerAction == playLastAction) {
            sameCount++
        } else { 
            sameCount = 0;
        }

        playLastAction = playerAction
        res.playerAction = playerAction
        next() 
    },
    function (req, res) {
        const playerAction = res.playerAction
        if (sameCount >= 3) { 
            res.status(400)
            res.send('你耍赖')
            // res.writeHead(400)
            // res.end('')
            sameCount = 9
            return
        }

        const gameResult = game(playerAction)
        
        res.status(200)

        if (gameResult === 0) {
            res.send('平局')
        } else if (gameResult === 1) {
            res.playerWon = true
            res.send('您赢了')
        } else { 
            res.send('你输了')
        }
    })
app.get('/', function (req, res) { 
    res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
    // fs.createReadStream(__dirname + '/index.html').pipe(res)
    // res.writeHead(200)
})

app.listen(8000)

// http.createServer(function (req, res) { 
//     const parseUrl = url.parse(req.url, true)
//     if (parseUrl.pathname === '/game') {
//     }
// }).listen(3000)