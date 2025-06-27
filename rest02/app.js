const pool = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan'); // (req,res,next=>{}) 미들웨어 모양으로 돌아옴


app.use(morgan('dev')); // morgan 미들웨어 등록
// 클라이언트가 뭐 했는지.. 남기는.. morgan ... 요청과 응답에 대한 정보 기록

// dev >> GET / 200 77.235 ms - 224
// combined  >> ::1 - - [20/May/2025:02:20:54 +0000] "GET / HTTP/1.1" 200 224 "-" "PostmanRuntime/7.44.0"
// common >> ::1 - - [20/May/2025:02:21:41 +0000] "GET / HTTP/1.1" 200 224
//

app.use('/', express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log('모든 요청은 여기 들렸다가 진행된다');
    next();
})


// CRUD
app.get('/', async (req, res) => {
    // console.log("req.body");
    // console.log(req.body);
    // console.log("req.query");
    // console.log(req.query);
    // console.log(req.query.name);

    const conn = await pool.getConnection(); // 연결 객체 가져오기
    const result = await conn.execute('select * from users'); // sql 구문 실행
    conn.release(); // 연결 객체 반환
    res.json(result[0]);
});

app.post('/', async (req, res) => {
    const conn = await pool.getConnection(); // 연결 객체 가져오기
    const result = await conn.execute(`insert into users(id,password) values('${req.body.name}','${req.body.age}')`); // sql 구문 실행
    conn.release(); // 연결 객체 반환
    res.send(result);
});

app.put('/', (req, res) => {
    res.send('Hello Put!');
});

app.delete('/',(req, res) => {
    throw new Error('강제에러 발생');
    res.send('Hello Delete!');
})

app.get('/html',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'));
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('에러발생');
})

app.listen(8080, () => {
    console.log('Server started on port 8080');
});