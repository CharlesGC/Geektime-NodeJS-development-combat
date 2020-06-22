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
    res.writeHead(200)
    res.end()
    return
})
app.get('/game', function (req, res) { 
    const parseUrl = url.parse(req.url, true)
    const playerAction = parseUrl.query.action

    if (playerAction == 'reset'){
        playWon = 0;
        playLastAction = null;
        sameCount = 0;
        res.writeHead(500);
        res.end('重来吧！');
        return
    }

    if (playWon >= 3 || sameCount == 9) { 
        res.writeHead(500)
        res.end('我再也不和你玩了')
        return
    }

    if (playLastAction && playerAction == playLastAction) {
        sameCount++
    } else { 
        sameCount = 0;
    }

    playLastAction = playerAction

    if (sameCount >=3) { 
        res.writeHead(400)
        res.end('你耍赖')
        sameCount = 9
        return
    }

    const gameResult = game(playerAction)
    
    res.writeHead(200)

    if (gameResult === 0) {
        res.end('平局')
    } else if (gameResult === 1) {
        playWon++
        res.end('您赢了')
    } else { 
        res.end('你输了')
    }
})
app.get('/', function (req, res) { 
    fs.createReadStream(__dirname + '/index.html').pipe(res)
    res.writeHead(200)
})

app.listen(8000)

// http.createServer(function (req, res) { 
//     const parseUrl = url.parse(req.url, true)
//     if (parseUrl.pathname === '/game') {
        
//     }
    
// }).listen(3000)