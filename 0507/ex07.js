/*
프로미스
성공한 경우 resolve
실패한 경우 reject

 */

const test = true;
new Promise((resolve, reject) => {
    if(test) reject('실패');
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})