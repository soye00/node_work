const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const webpush = require('web-push');

const app = express();

console.log('Express server started');

require('dotenv').config();
const cors = require('cors');

const indexRouter = require('./routes/index');

app.use("/", indexRouter);

app.listen(3030, ()=>{
    console.log('server started on port 3030');
})



