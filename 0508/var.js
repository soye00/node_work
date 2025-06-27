const odd = '홀수 입니다';
const even = '짝수 입니다';
const aa = () =>{
    console.log('aa');
}

console.log('출력하고 리턴');

// common js
module.exports = {
    odd,
    even,
    aa
}

// // 덮어씌우기
// module.exports = () =>{
//     console.log('함수 보냄');
// };