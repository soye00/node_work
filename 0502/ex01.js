const http = require('http');
require('dotenv').config();
// dotenv 안 변수를 가지고와서 process.env 객체 프로퍼티 추가

console.log(process.env.PWD); // 기본 제공
console.log(process.env.password); // dotenv config() 함수 호출해야 추가됨

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.end('hello0000');
    // res: 응답

}).listen(8005,() =>{
    console.log('8005포트로 실행 되었습니다.');
});