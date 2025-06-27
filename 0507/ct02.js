// 하샤드 수
/*
양의 정수 x 가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 함
ex 18 -> 1+8 = 9 18%9=0 => 하샤드 수 => true
ex 11 -> 1+1 = 2  11%2 != 0 => 하샤드 수 X => false

 */
//
function solution(x) {
    const a = x.toString().split('').map(i => parseInt(i));
    const b = a.reduce((a, b) => a + b,0);
    return x % b === 0
}

// console.log(solution(10));
// console.log(solution(12))
// console.log(solution(11));
// console.log(solution(13));
console.log(solution(144));


// const a = 10;
// // const arr = [a];
// // console.log(arr);
// const arr = a.toString().split('');
// console.log(arr);
// console.log(parseInt(arr.join('')));
// console.log(Number(arr[0]));

