// 나누어 떨어지는 숫자 배열


function solution(arr, divisor) {
    let answer = arr.filter(x => x % divisor === 0 )
    console.log(answer);
    return answer.length > 0 ? answer.sort((a, b) => a - b) : [-1]
}


console.log(solution([5,9,7,10], 5));    // [5, 10]
console.log(solution([2,36,1,3], 1));    // [1, 2, 3, 36]
console.log(solution([3,2,6], 10));

// console.log(a.map(x => x%2===0 ? 'co' : 'coco'));
//
// let b = [1,2,3,4,5];
// console.log(b.filter(x => x%2===0));