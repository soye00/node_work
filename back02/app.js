require("dotenv").config();
const webpush = require('web-push');

webpush.setVapidDetails(
        'mailto:aaa@naver.com',
        'BMmKoGrWCQP7pnUGgYREvgZt4wHVChew725lZWgIURqqPk5TS52xx3O22bgtEPOH1tCWGuOzSyI-VTppVG-RbhY',  
        'yHgg1j9u78ikLQQU9wwIXei5_V_NTxzsC0sCE926HVk'
)

// 미들웨어 : (req,res,next) =>{} 의 형태 
const cors = require("cors"); // 크롬브라우저 cors err 방지 
// const pool = require("./db");
const express = require("express"); 
const path = require("path"); 
const morgan = require("morgan"); 
const cookieParser = require("cookie-parser");

const mymid = require("./mymiddle"); 
const { title } = require("process");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(mymid);

//서버 시작 누르기 되면 배열 값 삭제 새로고침
// 배열이기 때문에 서버 재시작 하면 프론트 정보 사라짐
// db에 넣어야 함 
const ss = [];

app.post('/subscribe',(req,res,next)=> {
    console.log(req.body);
    console.log(req.body.sub);
    console.log(req.body.sub.endpoint);
    console.log(req.body.sub.keys.p256dh);
    console.log(req.body.sub.keys.auth);
    console.log(req.body.city);


    ss.push({sub:req.body});
    console.log(ss);
    res.send('구독 성공');
});

app.get("/send",async (req,res,next)=>{
    try{
        const payload = JSON.stringify({
            title:"new 알림",
            body: "알림알림알림알림",
            url:"https://front02-eight.vercel.app/"
        });
        const notifications = ss.map(item => {
            console.log('item=',item);
            return webpush.sendNotification(item.sub, payload);            
        })

        console.log('notifications=',notifications);
        await Promise.all(notifications);

        res.json({message:'푸시알람 전송성공'});
    }catch(e){
        console.log(e);
        res.json({message:'푸시알람 전송실패'});
    }
    
});


app.use((req,res,next)=>{
    console.log('무조건 실행');
    next();
})

app.get('/',(req,res,next)=>{
    console.log('/호출');
    res.send("클라이언트에게 보내기")
})

app.listen(8080,()=>{
    console.log("서버 8080 시작");
})
