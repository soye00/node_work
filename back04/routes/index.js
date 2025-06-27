const express = require('express');
const multer = require("multer"); //파일업로드
const fs = require("fs");
const path = require("path");
const { title } = require('process');


// uploads 폴더 없으면 생성
try {
  // 디렉토리 uploads 가 없으면 에러
  fs.readdirSync("uploads");
} catch (e) {
  console.log("폴더가 없어서 uploads 폴더 생성");
  fs.mkdirSync("uploads");
}


const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      console.log(ext);
      console.log(path.basename(file.originalname, ext) + Date.now() + ext);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.get("/", (req, res, next) => {
  console.log("기본적인 설정 종료");
  console.log(req.app.get('port'));
  console.log(req.app.get('static'));
  res.locals.myname="홍길동";
  const users = [
    {name:"일길동",age:20},
    {name:"이길동",age:30},
    {name:"삼길동",age:40},
]
  res.render("index", { title: "TITLE제목",users });
});

router.get("/aa/:id",(req,res,next)=>{
    console.log(req.app.set('static',"전역변수 설정"));
    res.render("aa",{title: "TITLE제목"});
})

router.post("/upload", upload.single("image"), (req, res, next) => {
  console.log("업로드됨");
  res.json({
    msg: "upload success",
    filename: req.file.originalname,
    path: req.file.path,
  });
});

module.exports = router;