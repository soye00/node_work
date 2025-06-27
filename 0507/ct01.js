/*
정수 제곱근 판별
양의 정수 n 에 대해, n 이 어떤 양의 정수 x 의 제곱인지 아닌지 판단
n이 양의 정수 x 의 제곱이라면 x + 1 return
n이 양의 정수 x 의 제곱이 아니라면 -1 을 리턴

121 ->
 */

// console.log(Math.sqrt(121));
// const b = Math.sqrt(121);
//
// console.log(Math.sqrt(3));
// const a = Math.sqrt(3);
//
// console.log(Number.isInteger(a)); // f
// console.log(Number.isInteger(b)); // t

//
// function solution(n) {
//     if(Number.isInteger(Math.sqrt(n)))return (Math.sqrt(n)+1)**2;
//     else return -1;
// }
// 0.03ms

function solution(n){
    return Number.isInteger(Math.sqrt(n)) ? (Math.sqrt(n)+1)**2 : -1;
}
//0.03ms

console.log(solution(121));
console.log(solution(3));
console.log(solution(45));
console.log(solution(81));