const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello world!');
})
server.listen(8005,()=>{
    console.log('server started on port 8005')
})