const pool = require("./db"); //db 연결 -> pool 에 담기

const {supabase} = require('./supadb');
const express = require("express"); // npm i express 라이브러리 : http 모듈 확장한 프레임워크
const path = require("path"); // path : 경로 관리 모듈
const morgan = require("morgan"); // morgan 라이브러리 : 기록 남기는 모듈
const cookieParser = require("cookie-parser");  // application 안 cookie -> 자동으로 요청할 때 날아감 
const cors = require("cors"); // cors 미들웨어 장착 
const e = require("express");


const app = express(); // app express 객체 생성

app.use(cors());

// app.use(morgan("dev")); // 미들웨어 등록
// dev - 개발단계 combined 실제운영 배포에서 사용

app.use("/", express.static(path.join(__dirname, "public")));
// express.static : public 폴더에 해당하는 파일이 있으면 클라이언트에 제공
// "/" : 루트 경로로 부터 ex) "/images" images 경로로 부터 => 클라이언트가 접속 방법 설정
// path.join : 절대경로
// req.body 파라메타를 받아주는 => {id: "aaa@naver.com"}

app.use(express.json());
// express.json() : req.query 받아주는 => aa=10

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookieParser 사용

app.use((req, res, next) => {
    // console.log(req.body);
    // console.log(req.query);

    console.log("모든 요청은 여기 들렸다가 진행된다.");
    next(); // next -> 그 다음 미들웨어로 진행 
});


app.get('/supauser', async (req,res,next)=>{
    const {data,error} = await supabase.from('userss').select();
    console.log(data);
    console.log(data[0].name);
    console.log(error);

    res.json({message :"잘했네", data})
})



// 🍪 cookie

app.get('/setCoo',(req,res,next)=>{
    console.log('setCoo test');
    res.cookie('haha','hoho',{
        expires: new Date(Date.now() +1000*60),
        // 유효시간 : 1000 1 초 => 현재 시간에서 1분동안 유효
        // 없으면 session -> 닫히기 전까지 유효
        httpOnly: true,
        secure:true,
        signed:true
        // 암호회해서 보내기 (hoho : 암호화 전 = )평문 -> 암호화 된 dksljfksdjlfkj로   

    });
    res.send('setCoo여기옴');
});

app.get('/getCoo',(req,res,next)=>{
    console.log(req.cookies);
    console.log(req.signedCookies); // 암호화된 쿠키 출력
    res.send('저기옴');
});




// 💚 get = select

app.get(
    "/",
    async (req, res, next) => {

        const conn = await pool.getConnection(); // 연결 객체 가져오기
        const result = await conn.execute("select * from users"); // sql 구문 실행
        conn.release(); // 연결 객체 반환
        next();
        res.status(200).json(result[0]);
        // res.status(200).json({aa:10, bb:20});  //{aa:10, bb:20} 을 보여줘라
    },
    (req, res, next) => {
        console.log("일로오나");
    }
);

// 💛 post = insert

app.post("/", async (req, res) => {
    const conn = await pool.getConnection(); // 연결 객체 가져오기
    const result = await conn.execute(`insert into users 
                                     (id,password)
                                     values
                                     ('${req.body.name}','${req.body.age}')`); // sql 구문 실행
    conn.release(); // 연결 객체 반환
    res.send(result);
});

// 🧡update = put
// update 테이블명 set id= ? password= ? idx=?

app.put("/", async (req, res) => {
    // db 연결 객체 가져오기
    // const conn = await pool.getConnection();
    // const result = await conn.execute(`update users set id = ? , password = ? where idx = ? `);
    // conn.release();
    // res.send(result);
    console.log(req.body);
    const conn = await pool.getConnection();
    const sql = `update users set id=?, password=? WHERE idx=?`;
    const result = await conn.execute(sql,[req.body.id, req.body.password, req.body.idx,]);

    conn.release(); // 연결 객체 반환
    res.send(result);

});

// 💙 delete

app.delete("/", (req, res) => {
    throw new Error("강제에러 발생");
    res.send("hello delete");
});


app.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

// 💜 에러처리 미들웨어 : 모든 에러 이쪽에서 처리

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("에러가발생하였습니다.");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});