const eventloop = {
    quene: [],
    loop() { 
        while (this.quene.length) {
            let callback = this.quene.shift()
            callback()
        }
        setTimeout(() => {
            this.loop()
        }, 500);
    },

    add(callback) { 
        this.quene.push(callback)
    }
}

eventloop.loop()

setTimeout(() => {
    eventloop.add(function () {
        console.log(1);
    })
}, 500);

setTimeout(() => {
    eventloop.add(function () {
        console.log(2);
    })
}, 1000);