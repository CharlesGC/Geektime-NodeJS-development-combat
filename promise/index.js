(function () { 
    let promise1 = new Promise(function (resolve, reject) { 
        setTimeout(() => {
            reject(new Error())
        }, 500);
    })
    console.log(promise1);
    
    setTimeout(() => { 
        console.log(promise1);
    }, 800)
})()