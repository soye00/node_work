// const aa = require('./test');
// console.log(aa);

// 설치된 라이브러리 가져오기 : 폴더명에 ./ 사용 X , express 는 노드모듈 안 폴더 에 존재 ㅅ
const express = require('express');
const path = require('path');

const app = express();


const obj = {};

// app.set('port',포트)로 서버가 실행될 포트를 설정
app.set('port',process.env.PORT || 3000);
// app.set('test','100');


app.use((req,res,next)=>{
    console.log('여기에 들렸다 갑니다');
    next(); // next 만나면
    // 미들웨어 : 요청과 응답을 조작해
})

/*
CRUD -> get 조회 post 삽입 patch,put 수정 delete 삭제
RESTFUL -> RESTFUL API 
 */

app.get('/html',(req,res)=>{
    console.log(__dirname); // 현재 경로 출력
    res.sendFile(path.join(__dirname, './html/index.html'));
    //res.sendFile 파일 보내기
    // ex '/img' -> 이미지 파일 보내기
})


// app.get(주소, 라우터)
// req는 요청에 관한 정보가 들어있는 객체
// res는 응답에 관한 정보가 들어있는 객체
app.get('/',(req,res,next)=>{
    // console.log(app.get('test'));
    req.test = 'aaa테스트'
    obj.aa = 'aa변수임'; //입력
    // res.send('hello world');
    console.log(__dirname);
   next(); // next 만나면 다음 실행
}, (req,res)=>{
    console.log(obj.aa);
    console.log(req.method);
    console.log(req.test);
    // res.send('hello get');
    throw new Error('error');
    // 강제에러발생 => err 미들웨어(매개변수가 4개인 err,req,res,next)로 이동
});

app.post('/',(req,res)=>{
    console.log(obj.aa); // 출력
    res.send('hello post');
});


app.use((err,req,res, next)=>{
    console.log(err);
    res.status(500).json({'error':'error가 강제로 발생하였습니다.'});
});

app.listen(app.get('port'), () => {
    console.log('server is running on port 3000');
});


/*
변수 가져오기, 변수 설정하기
app.get(), app.set()

미들웨어 설정하기
app.use()
미들웨어
req, res, next
에러 미들웨어 ( 매개변수 4개)
err, req, res, next

restFUL api
app.get(), app.post(), app.patch(), app.delet()

req 요청객체
클라이언트에서 req.params.aa req.body.name 보내면 사용가능
res : 응답객체
send : 문자열 보내기
sendFile : 파일 보내기
json json : 객체 보내기
 */