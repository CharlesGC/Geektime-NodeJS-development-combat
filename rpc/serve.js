const net = require('net')

const server = net.createServer((socket) => { 
    socket.on('data', function (buffer) { 
        console.log(buffer);
        
        const seqBuffer = buffer.slice(0,2)
        const lessonid = buffer.readInt32BE(2)

        setTimeout(() => {
           const buffer =  Buffer.concat([
                seqBuffer,
                Buffer.from(data[lessonid])
            ])
            socket.write(
                buffer
            )
        }, 10 + Math.random() * 1000)
    })
})

server.listen(4000)

const data = {
    136797: "01 | 课程介绍",
    136798: '02 | 内容综述',
    136799: "03 | Node js 是什么",
    136800: "04 | Node js 可以用来做什么",
    136801: "05 | 课程实战项目介绍",
    136802: "06 | 什么是技术预研？",
    136803: "07 | Node js 开发环境安装",
    136804: "08 | 第一个Node.js程序：石头剪刀布游戏",
    136805: "09 | 模块： Commonjs 规范",
    136806: "10 | 模块： 使用模块规范改造石头剪子布游戏",
    136807: "11 | 模块： npm",
    136808: "12 | 模块： Nodejs内置模块",
    136809: "13 | 异步： 非阻塞I/O",
    136810: "14 | 异步： 异步编程之callback",
    136811: "15 | 异步： 事件循环",
    136812: "16 | 异步： 异步编程之promise",
    136813: "17 | 异步： 异步编程之async/await",
    136814: "18 | HTTP：什么是HTTP服务器",
    136815: "19 | HTTP：简单实现一个HTTP服务器",
}