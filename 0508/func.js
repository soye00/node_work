const obj = require('./var');

const {odd,even} = obj;

console.log(obj); // > undefined

// obj(); // '함수 보냄' 출력

console.log(odd);
console.log(even);