setImmediate(() =>{
    console.log('immediate');
})
process.nextTick(()=>{
    console.log('process.nextTick');
})
setTimeout(() =>{
    console.log('setTimeout');
},0)

Promise.resolve({name:'홍길동'}).then((data)=>{
    console.log('Promise'+data.name);
})

// reject -> catch
Promise.reject({name:'리젝트'}).catch((data)=>{
    console.log('promise reject'+data.name);
})
