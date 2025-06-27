const a = 0;
console.log(a || 3); //  f -> 3
// ?? 널 병합 연산자
console.log(a ?? 3); // null unde X => 0 출력, 0 != null, undefined

// ?. 옵셔널 체이닝
const c = null;
// console.log(c.d); // > error => 강제종료
console.log(c?.d);  // > undefined

const d = null;
try{
    d.a;
}catch(e){
    console.error(e);
}


