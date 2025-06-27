const path = require('path');

console.log(path.join(__dirname,"b","c","d"));
console.log(path.extname("ex01.js"));
console.log(path.basename("ex01.js"));
console.log(path.dirname("ex01.js"));
console.log(path.parse("ex01.js"));

const {ext,name} = path.parse("ex01.js");
console.log(ext);
console.log(name);
const fileName = `${name}-${Date.now()}${ext}`;
console.log(path.join(__dirname,'images', fileName));