// 두 정수 사이의 합




function solution(a, b){
    let answer = [];
    if(a < b){
        for(let i = a; i <= b; i++) answer.push(i);
        console.log(answer);
    }
    if(a > b){
        for(let i = b; i <= a; i++) answer.push(i);
        console.log(answer);
    }
    if(a === b) answer.push(a); console.log(answer);
    return answer.reduce((a,b) => a + b,0);
}

console.log(solution(3,5));
console.log(solution(3,3));
console.log(solution(5,3));


// let a = [1,2,3,4,5];
// console.log(a.reduce((a, b) => a + b,0));
