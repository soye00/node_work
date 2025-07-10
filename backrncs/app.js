const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');


const app = express();
const cors = require('cors');

app.use(cors(
    // {
    //     origin: 'http://localhost:5173',
    //     credentials: true, // 쿠키값 허용 하겠다
    // }
))
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'a0123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
    },
    name: "session-cookie",
}))

app.use(express.static(path.join(__dirname, 'public')));



console.log('Express server started');

require('dotenv').config();

const mongo = require('./schemas');
mongo();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(3030, ()=>{
    console.log('server started on port 3030');
})



