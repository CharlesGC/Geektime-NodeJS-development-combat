const net = require('net');
const { encode } = require('punycode');
const socket = new net.Socket({})

socket.connect({
    host: '127.0.0.1',
    port: 4000
})


const lessonids = [
    '136797',
    '136798',
    '136799',
    '136800',
    '136801',
    '136802',
    '136803',
    '136804',
    '136805',
    '136806',
    '136807',
    '136808',
    '136809',
    '136810',
    '136811',
    '136812',
    '136813',
    '136814',
    '136815'
]

let buffer 
// buffer.writeInt32BE(
//    lessonids[Math.floor(Math.random() * lessonids.length)]
// )

let seq = 0

function encode1() { 
    buffer = Buffer.alloc(6)
    buffer.writeInt16BE(seq++)
    buffer.writeInt32BE(
    lessonids[Math.floor(Math.random() * lessonids.length)], 2
    )
    seq++ 
    return buffer
}

socket.on('data', (buffer) => { 
    const seqBuffer = buffer.slice(0, 2)
    const titleBuffer = buffer.slice(2)
    console.log(seqBuffer.readInt16BE(), titleBuffer.toString());
    socket.write(encode1())
})


// 沾包的情况未处理
for (let d = 0; d < 100; d++) {
    socket.write(encode1())
}

// setInterval(() => {
//     socket.write(encode1())
// }, 50);