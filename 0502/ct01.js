// 문자열을 정수로 바꾸기
/*

문자열 s 를 숫자로 변환한 결과를 반환하는 함수
맨 앞에 부호가 올 수 있음
부호가 있으면 "-1234" -> -1234 로 출력
 */


function solution(s) {
   return parseInt(s)
}

console.log(solution("1234"));
console.log(solution("-1234"));
console.log(solution("+1234"));

//
// let a = "1234"
// let aa = "-1234"
//
// console.log(parseInt(a));
// console.log(parseInt(aa));