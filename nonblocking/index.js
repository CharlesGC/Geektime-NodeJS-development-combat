// const glob = require('glob')

// let result1 = null
// console.time('glob1');
// result1 = glob.sync(__dirname + '/**/*')
// console.timeEnd('glob1')
// console.log(1+12)
// console.log(result1);

// let result = null
// console.time('glob')
// glob(__dirname + '/**/*', function (err, res) {
//     result = res
//     console.log(result);
// })
// console.timeEnd('glob')
// console.log(1+1)
function interview(callback) {
    setTimeout(() => {
        if (Math.random() < 0.8) {
            callback('sucess')
        } else { 
            callback(new Error('fail'))
        }
    }, 500);
}

// try {
interview(function (res) {
    if (res instanceof Error) {
        return console.log('bad');
    }
    console.log('smile');
})
// } catch (error) {
//     console.log(error);
// }