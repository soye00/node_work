// 문자열 내 p 와 y의 개수
/*
대문자와 소문자가 섞여있는 문자열 s
s에서 p 의 개수와 y 의 개수를 비교 -> 개수가 같으면 true 다르면 false 리턴
-> p y 개수가 = 0 이면 true 리턴
개수 비교 시 대문자 소문자 구별 X

pPoooyY => p 2개 y 2개 => true
Pyy => p 1 y 2 => fase
sdkj => true

 */

function solution(s){
    const regp = /p/gi;
    const regy = /y/gi;
    let a = s.match(regp);
    let b = s.match(regy);

    // 순서!!!! 순서!!!! 순서 중요해 !!!
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;


    if(a.length !== b.length) return false;
    else return true;
}


console.log(solution("pPoooyY"));
console.log(solution("Pyy"));
console.log(solution("sdfkjjd"));
console.log(solution("sdfkjjdy"));
console.log(solution("sdfkjjp"));
console.log(solution("sxxxxxxx"));