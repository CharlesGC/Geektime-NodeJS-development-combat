const playerAction = process.argv[process.argv.length - 1]

const game = require('./lib')

// const result = game(playerAction)
// console.log(result);
let count = 0
console.log('游戏开始 请出招');
process.stdin.on('data', e => { 
    
    const playerAction = e.toString().trim()

    const result = game(playerAction)

    if (result == -1) {
        count++
    }
    if (count == 3) {
        console.log('我不玩了');
        
        process.exit()
    }
})
