// 설치 라이브러리 
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
require('dotenv').config();
const cors = require('cors');

const {sequelize, User} = require('./models'); // index.js 는 생략 가능

const app = express();

app.set('port',process.env.PORT||3001);
app.set('view engine','html');

nunjucks.configure('views',{
    express:app,
    watch:true
})

// sync 동기화 
sequelize.sync({force:false})
.then(()=>{
    console.log('db 연결 성공');
}).catch((err)=>{
    console.error(err);
});

(async function test() {
    const result = await User.findAll({});
    // console.log(result);
    
})();


// User.create({
//     name:"asdf",
//     age:20,
//     married:0,
//     comment:"asdfs라는 사람이야",
// });

app.use(morgan("dev"));
app.use(express.json(), express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
    },
    name: "session-cookie",
  })
);
app.set("port", 4001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(cors());


/* 미들웨어 장착 끝 */

const resRouter = require("./routes/ResRouter.js")
const gisaRouter = require("./routes/GisaRouter.js")

app.use("/res", resRouter);
app.use("/gisa",gisaRouter);



app.use((req,res,next)=>{
  console.log('해당하는 라우터가 없다');
  const error = new Error('해당하는 페이지가 없습니다.');
  next(error); // 에러 미들웨어로 가라
})

app.use((err, req, res, next) => {
  console.log("에러 미들웨어 동작");
  console.error(err);
  console.error(err.message);
  res.send(err.toString()+"<a href='/'>첫페이지로</a>");
});

app.listen(app.get("port"), () => {
  console.log(`서버 ${app.get("port")}시작`);
});