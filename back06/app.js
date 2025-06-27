var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require("express-session");
var logger = require('morgan');



require("dotenv").config();  // .env
const cors = require('cors');
const nunjucks = require("nunjucks");

const payRouter = require('./routes/pay');
const cleanerRouter = require('./routes/cleaner');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const resRouter = require('./routes/reservation');
const loginRouter = require('./routes/login');
const backApiRouter = require('./routes/backApi/backAdmin');
const webpush = require('web-push');

webpush.setVapidDetails(
    'https://port-0-pwa-manaowvf213a09cd.sel4.cloudtype.app',
    'BJxlq4fyngGNbsKP7ekeYqAIzUeA7FPcq7dBxLCUrK-J8y1pxbllsZSXocqhR2JscxcdgO-O7A-6Acac35zEKHg',
    'YFJJmSU6_mqIMcuSqIDbsnTLbdAUxUYJ7azUmdZNx6o'
)


var app = express();

app.use(cors(
    {
      origin: 'http://localhost:5173',
      credentials: true, // 쿠키값 허용
    }
))
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit:'50mb', extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret:'adkjsljkdf',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
  },
  name: "session-cookie",
}))
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});


// 모든 적용 ? -> res.locals.
app.use((req,res,next) => {
    res.locals.user = req.session.user;
    next();
})

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/reservation', resRouter);
app.use('/pay', payRouter);
app.use('/cleaner', cleanerRouter )
app.use('/login', loginRouter);
app.use('/back', backApiRouter);

module.exports = app;
