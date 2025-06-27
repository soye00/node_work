const express = require("express");
const path = require("path");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const cors = require("cors");
const nunjucks = require("nunjucks");
const { title } = require("process");
const multer = require('multer');
const fs = require('fs');


try{
  fs.readdirSync('uploads');
}catch(e){
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}


require("dotenv").config();

// console.log(process.env.AA);
// console.log(process.env.BB);
// const dotenv = require('dotenv');
// dotenv.config();

const app = express();


// app.use((req,res,next)=>{
//   console.log('그다음 미들웨어로 진행');
//   next();
// },(req,res,next)=>{
//   console.log('next 미들웨어');
//   try{
//     as:dksfj;lskjfl;
//   }catch{
//     console.log(e);
//     next(e);
//   }
//   next();
// },(req,res,next)=>{
//   console.log('다음 미들웨어')
//   next();
// })


// cors 에러 해결 미들웨어 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

// 미들웨어 확장 : 미들웨어 사용 다른 방법 
app.use((req,res,next)=>{
  if(process.env.NODE_ENV === 'production')
  morgan('combined')(req,res,next);
  else morgan('dev')(req,res,next);
});

// 모두 허용 => app.use(cors())

app.use(morgan("dev"));

// 로그남기기
app.use(morgan("dev"));
// public 에 있는거 요청했을경우 응답해주기
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json()); // req.body 확인
app.use(express.urlencoded({ extended: false })); // req.query 확인
app.use(cookieParser(process.env.COOKIE_SECRET));
// cookieparser 미들웨어 등록하고 그 다음에 => expressSession
app.use(expressSession({
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
  },
  name: "session-cookie",
})
);

app.set("port", 4000);


app.set('view engine','html');
nunjucks.configure('views',{
  express:app,
  watch:true
});


const upload = multer({
  storage: multer.diskStorage({ // 파일은 디스크에 저장
    destination(req,res,done){
      done(null,'uploads/'); // 파일 업로드 되면 uploads 경로에 저장
    },
    // 파일명은 원래 파일명 + 현재시간 + 확장자로 설정 
    filename(req,file,done){
      const ext = path.extname(file.originalname);
      console.log(ext);
      done(null, path.basename(file.originalname,ext)+ Date.now()+ext);
    },
  }),
  limits: {fileSize: 100*1024*1024},
})



app.post("/upload",upload.single('image'),(req,res,next)=>{
  console.log(req.file, req.body);
  res.send('저장성공');
});

app.post("/uploads", upload.array('many'),(req,res,next)=>{
  console.log('여러개 올림');
  console.log(req.file, req.body);
  res.send('저장성공');
});


app.post("/login",(req,res,next)=> {
  console.log(req.body);
  const {email,password} = req.body;
  if(email === "aaa@gmail.com" && password === "1234"){
    req.session.user = {email}
    req.send('로그인성공')
    
  } else{
    res.send("로그인 실패 email password 확인하세요");
  }
  
})

app.get("/mypage",(req,res,next)=>{
  if(req.session.user){
    res.send(req.session.user)
  }else{
    res.send('로그인 안되어있음')
  }
})

app.get("/logout",(req,res,next)=>{
  req.session.destroy((err)=>{
    if(err){
      return res.status(500).send('세션삭제실패');
    }
    res.clearCookie('session-cookie');
    res.send('로그아웃되었습니다.');
  })
})


app.post("/setSession",(req,res,next)=>{
  req.session.userName = "홍길동";
  req.session.loggedIn = true;

  res.send("세션 설정 완료");
})

app.get("/getSession",(req,res,next)=>{
  console.log("req.session = ", req.session);
  console.log("req.session.userName = ", req.session.userName);
  console.log("req.session.loggedIn = ", req.session.loggedIn);
  res.send("세션 가져오기");
})

app.get("/destroySession",(req,res,next)=>{
  req.session.destroy((err)=>{
    if(err){
      return res.status(500).send("세션삭제 실패");
    }
    res.clearCookie("session-cookie");
    res.send("세션삭제 완료");
  })
})


// 쿠키는 백엔드쪽에서 만들어서 프론트한테 전달
// 프론트는 cookies 저장소에다가 넣어놓고 주소 호출한테 자동으로 전달
app.get("/setCookie", (req, res, next) => {
  console.log(new Date(Date.now));
  res.cookie("haha", "hoho",{
    expires: new Date(Date.now()+1000*60), // 유효시간 설정 
  });
  res.cookie("signhaha","hoho", { signed:true } );
  res.send("쿠키설정");
});

app.get('/getCookie',(req,res,next)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send("쿠키확인")
})




app.get("/", (req, res, next) => {
  console.log(req.body);
  console.log(req.query);
  console.log("/경로 요청");
  res.locals.member = [{
    name:'홍길동',
    age:'20'
  },
  {
    name:'홍길동',
    age:'20'
  },
  {
    name:'홍길동',
    age:'20'
  }]

  res.locals.data = "새로운 데이터";
  // res.send("성공");
  res.render('index',{title:"제목"});
});


app.get("/multipart",(req,res,next)=>{
  res.render('multipart')

})




app.get("/html", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((err, req, res, next) => {
  console.log('err 미들웨어 동작');
  console.log(err);
  res.send(err.toString());
});

app.listen(app.get("port"), () => {
  console.log(`서버 ${app.get("port")}시작`);
});
