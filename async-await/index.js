const result = async function () { 

    try {
        var content = await new Promise((resolve, reject) => { 
            setTimeout(() => {
                reject(new Error('9'))
            }, 500);
        })
    } catch (error) {
        console.log(error.message);
    }
    // throw new Error(4)

    console.log(content);
    return '1'
    
}() 

setTimeout(() => {
    console.log(result);
}, 800);




// console.log(function () { 
//     return new Promise(resolve => { 
//         resolve(4)
//     })
// }());
