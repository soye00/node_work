const bb = require('./bb.js').aa;
console.log(bb);


// node 기본 라이브러리 X
// npm i dotenv
const dotenv = require('dotenv').config();
console.log(dotenv);
console.log(process.env.aa);
console.log(process.env.bb);