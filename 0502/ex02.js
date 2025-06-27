function a(){
    let sum = 0;
    for(let i = 0; i<10000000000; i++){
        sum+=i;
    }
    console.log(sum);
}

console.log('오래걸리는거 시작 논블로킹');
// a();
setTimeout(a,0);
setTimeout(a,0);
setTimeout(a,0);

console.log('오래걸리는거 끝 논블로킹')